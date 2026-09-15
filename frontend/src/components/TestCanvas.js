'use client';

import { Stage, Layer, Rect } from 'react-konva';

export default function TestCanvas() {
  return (
    <Stage width={500} height={400}>
      <Layer>
        <Rect x={50} y={50} width={150} height={100} fill="blue" />
      </Layer>
    </Stage>
  );
}