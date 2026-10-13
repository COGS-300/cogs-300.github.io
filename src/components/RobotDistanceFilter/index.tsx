
import React, {useEffect, useId, useMemo, useState} from 'react';
import '../../css/jsxgraph.css';

// Causal weighted moving average
function weightedMovingAverage(values, windowSize, bias) {
  return values.map((_, i) => {
    const start = Math.max(0, i - windowSize + 1);
    const count = i - start + 1;

    let sum = 0;
    let totalWeight = 0;

    for (let j = start; j <= i; j++) {
      // Equal weights when bias = 0.
      // Only newest reading when bias = 1.
      const weight =
        (1 - bias) / count + (j === i ? bias : 0);

      sum += values[j] * weight;
      totalWeight += weight;
    }

    return sum / totalWeight;
  });
}

export default function RobotDistanceGraph() {
  const boardId = 'robot-' + useId().replace(/:/g, '');

  // Robot parameters
  const [noise, setNoise] = useState(0.2);
  const [speed, setSpeed] = useState(0.3);
  const [kp, setKp] = useState(0.3);
  const [target, setTarget] = useState(0.5);

  // Filter parameters
  const [showFiltered, setShowFiltered] = useState(true);
  const [windowSize, setWindowSize] = useState(10);
  const [bias, setBias] = useState(0);

  const d0 = 5;
  const dt = 0.1;
  const T = 20;

  const samples = useMemo(() => {
    const times = Array.from(
      {length: Math.round(T / dt) + 1},
      (_, i) => i * dt
    );
    const random = times.map(() => 2 * Math.random() - 1);
    return {times, random};
  }, []);

  useEffect(() => {
    let cancelled = false;
    let board;
    let JXG;

    async function draw() {
      const module = await import('jsxgraph');
      if (cancelled) return;

      JXG = module.default;

      board = JXG.JSXGraph.initBoard(boardId, {
        boundingbox: [-1, 6.5, 21, -0.7],
        axis: true,
        showCopyright: false,
        showNavigation: false
      });

      const {times, random} = samples;

      function measure(distance, i) {
        return Math.max(0, distance + noise * random[i]);
      }

      // 1. Stationary robot
      const stationary = times.map((t, i) =>
        measure(d0, i)
      );

      // 2. Constant-speed robot
      const linear = times.map((t, i) =>
        measure(Math.max(0, d0 - speed * t), i)
      );

      // 3. P-controller robot
      const proportional = times.map((t, i) => {
        const distance =
          target + (d0 - target) * Math.exp(-kp * t);
        return measure(distance, i);
      });

      function plot(values, color, filtered = false) {
        board.create('curve', [times, values], {
          strokeColor: color,
          strokeWidth: filtered ? 3 : 1.2,
          strokeOpacity: filtered ? 1 : 0.35,
          dash: filtered ? 0 : 2,
          fixed: true
        });
      }

      // Plot noisy raw signals
      plot(stationary, '#2563eb');
      plot(linear, '#e67e22');
      plot(proportional, '#16a34a');

      // Overlay filtered signals
      if (showFiltered) {
        plot(
          weightedMovingAverage(stationary, windowSize, bias),
          '#2563eb',
          true
        );

        plot(
          weightedMovingAverage(linear, windowSize, bias),
          '#e67e22',
          true
        );

        plot(
          weightedMovingAverage(proportional, windowSize, bias),
          '#16a34a',
          true
        );
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
    boardId, samples, noise, speed, kp, target,
    showFiltered, windowSize, bias
  ]);

  function slider(label, value, setter, min, max, step, unit = '') {
    return (
      <div style={{marginBottom: '12px'}}>
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
          style={{width: '100%', maxWidth: '400px'}}
        />
      </div>
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

    <p style={{marginTop: '12px'}}>
      <span style={{color: '#2563eb'}}>■</span> Stationary
      {'  '}
      <span style={{color: '#e67e22'}}>■</span> Constant speed
      {'  '}
      <span style={{color: '#16a34a'}}>■</span> P-controller
    </p>


    {/* Side-by-side controls */}
    <div className="robot-controls">

      {/* Left column */}
      <div>
        <h4>Robot parameters</h4>

        {slider('Noise amplitude', noise, setNoise,
          0, 1, 0.05, 'm')}

        {slider('Constant speed', speed, setSpeed,
          0, 1, 0.05, 'm/s')}

        {slider('P-controller gain', kp, setKp,
          0.05, 1.5, 0.05, '1/s')}

        {slider('Target distance', target, setTarget,
          0, 3, 0.1, 'm')}
      </div>

      {/* Right column */}
      <div>
        <h4>Moving average filter</h4>

        <label style={{
          display: 'block',
          marginBottom: '15px'
        }}>
          <input
            type="checkbox"
            checked={showFiltered}
            onChange={e =>
              setShowFiltered(e.target.checked)
            }
          />
          {' '}Show filtered signals
        </label>

        {slider('Window size', windowSize, setWindowSize,
          1, 50, 1, 'samples')}

        {slider('Recent measurement weight',
          Math.round(bias * 100),
          value => setBias(value / 100),
          0, 100, 5, '%')}

        <p style={{
          fontSize: '0.85em',
          opacity: 0.75
        }}>
          Window duration: {(windowSize * dt).toFixed(1)} s.
          Larger windows smooth the signal but increase lag.
        </p>
      </div>

    </div>
  </div>
);

}
