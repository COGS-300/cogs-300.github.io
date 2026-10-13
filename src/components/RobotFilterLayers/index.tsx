
import React, {useEffect, useId, useMemo, useState} from 'react';
import '../../css/jsxgraph.css';

// Apply a causal sliding-window filter.
// Each window includes the current and previous samples.
function applyFilter(values, windowSize, type) {
  return values.map((_, i) => {
    const start = Math.max(0, i - windowSize + 1);
    const window = values.slice(start, i + 1);

    switch (type) {
      case 'min':
        return Math.min(...window);

      case 'max':
        return Math.max(...window);

      case 'avg':
        return window.reduce((a, b) => a + b, 0)
          / window.length;

      default:
        return values[i];
    }
  });
}

export default function RobotLayeredFilters() {
  const boardId = 'filters-' + useId().replace(/:/g, '');

  // Sensor parameters
  const [noise, setNoise] = useState(0.2);
  const [outliers, setOutliers] = useState(1.0);

  // Filter parameters
  const [minWindow, setMinWindow] = useState(3);
  const [maxWindow, setMaxWindow] = useState(3);
  const [avgWindow, setAvgWindow] = useState(10);

  // Visibility controls
  const [showRaw, setShowRaw] = useState(true);
  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);
  const [showAvg, setShowAvg] = useState(true);

  const dt = 0.1;
  const T = 20;

  // Fixed samples to prevent random changes
  // when adjusting the sliders.
  const samples = useMemo(() => {
    const times = Array.from(
      {length: Math.round(T / dt) + 1},
      (_, i) => i * dt
    );

    const random = times.map(() =>
      2 * Math.random() - 1
    );

    // Occasional positive and negative outliers
    const spikes = times.map(() => {
      const r = Math.random();

      if (r < 0.025) return 1;
      if (r < 0.05) return -1;
      return 0;
    });

    return {times, random, spikes};
  }, []);

  useEffect(() => {
    let cancelled = false;
    let board;
    let JXG;

    async function draw() {
      const module = await import('jsxgraph');
      if (cancelled) return;

      JXG = module.default ?? module;

      board = JXG.JSXGraph.initBoard(boardId, {
        boundingbox: [-1, 7, 21, -0.7],
        axis: true,
        showCopyright: false,
        showNavigation: false
      });

      const {times, random, spikes} = samples;

      // Robot approaches a wall using P-control.
      const d0 = 5;
      const target = 0.5;
      const kp = 0.22;

      // Raw ultrasonic measurements
      const raw = times.map((t, i) => {
        const trueDistance =
          target + (d0 - target) * Math.exp(-kp * t);

        return Math.max(
          0,
          trueDistance
            + noise * random[i]
            + outliers * spikes[i]
        );
      });

      // Stage 1: Minimum filter
      const minimum = applyFilter(
        raw, minWindow, 'min'
      );

      // Stage 2: Maximum filter on minimum output
      const maximum = applyFilter(
        minimum, maxWindow, 'max'
      );

      // Stage 3: Average filter on maximum output
      const average = applyFilter(
        maximum, avgWindow, 'avg'
      );

      function plot(values, color, width, dash = 0) {
        board.create('curve', [times, values], {
          strokeColor: color,
          strokeWidth: width,
          dash,
          fixed: true
        });
      }

      if (showRaw) {
        plot(raw, '#9ca3af', 1.2);
      }

      if (showMin) {
        plot(minimum, '#dc2626', 1.8);
      }

      if (showMax) {
        plot(maximum, '#2563eb', 2);
      }

      if (showAvg) {
        plot(average, '#16a34a', 3);
      }
    }

    draw();

    return () => {
      cancelled = true;
      if (board && JXG) {
        JXG.JSXGraph.freeBoard(board);
      }
    };
  }, [
    boardId, samples,
    noise, outliers,
    minWindow, maxWindow, avgWindow,
    showRaw, showMin, showMax, showAvg
  ]);

  function slider(label, value, setter, min, max, step, unit) {
    return (
      <div style={{marginBottom: '14px'}}>
        <label style={{display: 'block'}}>
          {label}: <strong>{value} {unit}</strong>
        </label>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => setter(Number(e.target.value))}
          style={{width: '100%'}}
        />
      </div>
    );
  }

  function visibility(label, value, setter, color) {
    return (
      <label style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        marginRight: '18px',
        marginBottom: '8px',
        color
      }}>
        <input
          type="checkbox"
          checked={value}
          onChange={e => setter(e.target.checked)}
        />
        {label}
      </label>
    );
  }

  return (
    <div>
      <div
        id={boardId}
        className="jxgbox"
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '6px'
        }}
      />

      {/* Select which filtering stages to display */}
      <div style={{marginTop: '15px', marginBottom: '20px'}}>
        {visibility('Raw', showRaw, setShowRaw, '#9ca3af')}
        {visibility('Minimum', showMin, setShowMin, '#dc2626')}
        {visibility('Maximum', showMax, setShowMax, '#2563eb')}
        {visibility('Average', showAvg, setShowAvg, '#16a34a')}
      </div>

      <div className="robot-controls">

        {/* Left column: Sensor controls */}
        <div>
          <h4>Sensor measurements</h4>

          {slider('Noise amplitude', noise, setNoise,
            0, 1, 0.05, 'm')}

          {slider('Outlier amplitude', outliers, setOutliers,
            0, 3, 0.1, 'm')}
        </div>

        {/* Right column: Filter controls */}
        <div>
          <h4>Ordered filtering</h4>

          {slider('1. Minimum window', minWindow, setMinWindow,
            1, 30, 1, 'samples')}

          {slider('2. Maximum window', maxWindow, setMaxWindow,
            1, 30, 1, 'samples')}

          {slider('3. Average window', avgWindow, setAvgWindow,
            1, 50, 1, 'samples')}

          <p style={{fontSize: '0.85em', opacity: 0.75}}>
            Sample interval: {dt} s.
            <br />
            Window size 1 disables that filtering stage.
          </p>
        </div>

      </div>
    </div>
  );
}
