'use client';

import { Stage, Layer, Rect, Circle, Text, Transformer } from 'react-konva';
import { useRef, useEffect } from 'react';
import useEditorStore from '../store/useEditorStore';

export default function EditorCanvas() {
  const elements = useEditorStore((s) => s.elements);
  const selectedId = useEditorStore((s) => s.selectedId);
  const selectElement = useEditorStore((s) => s.selectElement);
  const updateElement = useEditorStore((s) => s.updateElement);

  const trRef = useRef();
  const stageRef = useRef();

  useEffect(() => {
    const stage = stageRef.current;
    const node = selectedId ? stage.findOne('#' + selectedId) : null;
    if (node) {
      trRef.current.nodes([node]);
    } else {
      trRef.current.nodes([]);
    }
  }, [selectedId, elements]);

  const handleDragEnd = (id, e) => {
    updateElement(id, { x: e.target.x(), y: e.target.y() });
  };

  const handleTransformEnd = (id, e) => {
  const node = e.target;
  const el = elements.find((item) => item.id === id);
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  if (el.type === 'circle') {
    const newRadius = Math.max(5, el.radius * ((scaleX + scaleY) / 2));
    node.scaleX(1);
    node.scaleY(1);
    updateElement(id, {
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
      radius: newRadius,
    });
  } else if (el.type === 'rect') {
    const newWidth = Math.max(5, el.width * scaleX);
    const newHeight = Math.max(5, el.height * scaleY);
    node.scaleX(1);
    node.scaleY(1);
    updateElement(id, {
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
      width: newWidth,
      height: newHeight,
    });
  } else {
    // text
    const newFontSize = Math.max(6, Math.round(el.fontSize * scaleY));
    node.scaleX(1);
    node.scaleY(1);
    updateElement(id, {
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
      fontSize: newFontSize,
    });
  }
};

  return (
    <Stage
      width={900}
      height={600}
      ref={stageRef}
      onMouseDown={(e) => {
        if (e.target === e.target.getStage()) selectElement(null);
      }}
      style={{ background: '#fff', border: '1px solid #ccc' }}
    >
      <Layer>
        {elements.map((el) => {
          const common = {
            id: el.id,
            x: el.x,
            y: el.y,
            rotation: el.rotation || 0,
            fill: el.fill,
            draggable: true,
            onClick: () => selectElement(el.id),
            onTap: () => selectElement(el.id),
            onDragEnd: (e) => handleDragEnd(el.id, e),
            onTransformEnd: (e) => handleTransformEnd(el.id, e),
          };

          if (el.type === 'rect') return <Rect key={el.id} {...common} width={el.width} height={el.height} />;
          if (el.type === 'circle') return <Circle key={el.id} {...common} radius={el.radius} />;
          if (el.type === 'text') return <Text key={el.id} {...common} text={el.text} fontSize={el.fontSize} />;
          return null;
        })}
        <Transformer ref={trRef} />
      </Layer>
    </Stage>
  );
}