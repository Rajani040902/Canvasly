'use client';

import useEditorStore from '../store/useEditorStore';

export default function PropertiesPanel() {
  const elements = useEditorStore((s) => s.elements);
  const selectedId = useEditorStore((s) => s.selectedId);
  const updateElement = useEditorStore((s) => s.updateElement);

  const el = elements.find((e) => e.id === selectedId);
  if (!el) return <div style={{ padding: 10 }}>Select a shape to edit it</div>;

  const set = (field) => (e) => updateElement(el.id, { [field]: Number(e.target.value) || e.target.value });

    return (
    <div className="properties-panel">
      <h3>{el.type}</h3>
      <div className="field"><label>X</label><input type="number" value={Math.round(el.x)} onChange={set('x')} /></div>
      <div className="field"><label>Y</label><input type="number" value={Math.round(el.y)} onChange={set('y')} /></div>
      {el.type === 'rect' && (
        <>
          <div className="field"><label>Width</label><input type="number" value={Math.round(el.width)} onChange={set('width')} /></div>
          <div className="field"><label>Height</label><input type="number" value={Math.round(el.height)} onChange={set('height')} /></div>
        </>
      )}
      {el.type === 'circle' && (
        <div className="field"><label>Radius</label><input type="number" value={Math.round(el.radius)} onChange={set('radius')} /></div>
      )}
      {el.type === 'text' && (
        <>
          <div className="field"><label>Text</label><input type="text" value={el.text} onChange={set('text')} /></div>
          <div className="field"><label>Font size</label><input type="number" value={el.fontSize} onChange={set('fontSize')} /></div>
        </>
      )}
      <div className="field"><label>Rotation</label><input type="number" value={Math.round(el.rotation || 0)} onChange={set('rotation')} /></div>
      <div className="field"><label>Color</label><input type="color" value={el.fill} onChange={set('fill')} /></div>
    </div>
  );
}  