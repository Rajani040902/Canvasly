'use client';

import useEditorStore from '../store/useEditorStore';

export default function Toolbar() {
  const addRect = useEditorStore((s) => s.addRect);
  const addCircle = useEditorStore((s) => s.addCircle);
  const addText = useEditorStore((s) => s.addText);
  const deleteSelected = useEditorStore((s) => s.deleteSelected);

  return (
    <div className="toolbar">
      <button onClick={addRect}>+ Rectangle</button>
      <button onClick={addCircle}>+ Circle</button>
      <button onClick={addText}>+ Text</button>
      <button onClick={deleteSelected}>Delete</button>
    </div>
  );
}