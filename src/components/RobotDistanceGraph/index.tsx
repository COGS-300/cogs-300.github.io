
import React, {useEffect, useId, useMemo, useState} from 'react';
import '../../css/jsxgraph.css';

export default function RobotDistanceGraph() {
  const boardId = 'robot-' + useId().replace(/:/g, '');

  const [noise, setNoise] = useState(0.2);
  const [speed, setSpeed] = useState(0.3);
  const [kp, setKp] = useState(0.3);
  const [target, setTarget] = useState(0.5);

  const d0 = 5;
  const dt = 0.1;
  const T = 20;

  // Generate fixed noise so slider changes don't
  // generate a completely new random sequence.
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

    // Dynamic import: only load JSXGraph in the browser.
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

      // Stationary robot
      const stationary = times.map((t, i) =>
        measure(d0, i)
      );

      // Constant-speed robot
      const linear = times.map((t, i) =>
        measure(Math.max(0, d0 - speed * t), i)
      );

      // P-controlled robot
      const proportional = times.map((t, i) => {
        const distance =
          target + (d0 - target) * Math.exp(-kp * t);
        return measure(distance, i);
      });

      const plot = (values, color) => {
        board.create('curve', [times, values], {
          strokeColor: color,
          strokeWidth: 2,
          fixed: true
        });
      };

      plot(stationary, '#2563eb');
      plot(linear, '#e67e22');
      plot(proportional, '#16a34a');
    }

    draw();

    // Cleanup when sliders change or component unmounts.
    return () => {
      cancelled = true;
      if (board && JXG) {
        JXG.JSXGraph.freeBoard(board);
      }
    };
  }, [boardId, samples, noise, speed, kp, target]);

  const slider = (label, value, setter, min, max, step, unit) => (
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

      {slider('Noise amplitude', noise, setNoise,
        0, 1, 0.05, 'm')}

      {slider('Constant speed', speed, setSpeed,
        0, 1, 0.05, 'm/s')}

      {slider('P-controller gain', kp, setKp,
        0.05, 1.5, 0.05, '1/s')}

      {slider('Target distance', target, setTarget,
        0, 3, 0.1, 'm')}
    </div>
  );
}
