
import React, {useEffect, useId, useMemo, useState} from 'react';
import '../../css/jsxgraph.css';

export default function RobotPMotionGraph() {
  const boardId = 'pmotion-' + useId().replace(/:/g, '');

  // Simulation parameters
  const [noise, setNoise] = useState(0.2);
  const [drift, setDrift] = useState(10);
  const [kp, setKp] = useState(0.3);
  const [target, setTarget] = useState(0.5);

  const d0 = 5;      // Initial distance (m)
  const dt = 0.1;    // Time step (s)
  const T = 20;      // Duration (s)

  // Fixed noise samples
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

      JXG = module.default ?? module;

      board = JXG.JSXGraph.initBoard(boardId, {
        boundingbox: [-1, 6.5, 21, -0.7],
        axis: true,
        showCopyright: false,
        showNavigation: false
      });

      const {times, random} = samples;

      const ultrasonic = [];
      const encoder = [];
      const objective = [];

      let trueDistance = d0;
      let encoderDistance = d0;

      for (let i = 0; i < times.length; i++) {

        // 1. Ultrasonic sensor measures true distance
        // with random noise.
        const ultrasonicMeasurement = Math.max(
          0,
          trueDistance + noise * random[i]
        );

        // 2. Encoder estimates distance from wheel travel.
        // The estimate has no random noise but accumulates
        // a systematic scale error.
        const encoderMeasurement = encoderDistance;

        // 3. Objective distance is constant.
        ultrasonic.push(ultrasonicMeasurement);
        encoder.push(encoderMeasurement);
        objective.push(target);

        // P-controller motion model:
        // v = Kp * (trueDistance - target)
        //
        // Exact displacement during this time step
        // for an ideal proportional controller.
        const displacement =
          (trueDistance - target) *
          (1 - Math.exp(-kp * dt));

        // Robot approaches target distance.
        trueDistance -= displacement;

        // Encoder integrates wheel displacement,
        // but with systematic error.
        encoderDistance -=
          displacement * (1 + drift / 100);
      }

      function plot(values, color, width = 2, dash = 0) {
        board.create('curve', [times, values], {
          strokeColor: color,
          strokeWidth: width,
          dash,
          fixed: true
        });
      }

      // Draw all three signals
      plot(ultrasonic, '#2563eb', 1.5);
      plot(encoder, '#16a34a', 2.5);
      plot(objective, '#dc2626', 2, 2);
    }

    draw();

    return () => {
      cancelled = true;
      if (board && JXG) {
        JXG.JSXGraph.freeBoard(board);
      }
    };
  }, [boardId, samples, noise, drift, kp, target]);

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

      <div style={{
        display: 'flex',
        gap: '18px',
        flexWrap: 'wrap',
        marginTop: '12px',
        marginBottom: '20px'
      }}>
        <span style={{color: '#2563eb'}}>
          ■ Ultrasonic
        </span>
        <span style={{color: '#16a34a'}}>
          ■ Encoder
        </span>
        <span style={{color: '#dc2626'}}>
          ■ Objective
        </span>
      </div>

      <div className="robot-controls">

        {/* Left column */}
        <div>
          <h4>Robot motion</h4>

          {slider('P-controller gain', kp, setKp,
            0.05, 1.5, 0.05, '1/s')}

          {slider('Objective distance', target, setTarget,
            0, 3, 0.1, 'm')}
        </div>

        {/* Right column */}
        <div>
          <h4>Sensor parameters</h4>

          {slider('Ultrasonic noise', noise, setNoise,
            0, 1, 0.05, 'm')}

          {slider('Encoder drift', drift, setDrift,
            -30, 30, 1, '%')}
        </div>

      </div>
    </div>
  );
}
