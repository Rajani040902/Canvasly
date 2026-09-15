'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Toolbar from '../components/Toolbar';
import PropertiesPanel from '../components/PropertiesPanel';
import useEditorStore from '../store/useEditorStore';
import { canvasApi } from '../lib/api';

const EditorCanvas = dynamic(
  () => import('../components/EditorCanvas'),
  { ssr: false }
);

export default function DashboardPage() {
  const [view, setView] = useState('list');
  const [canvases, setCanvases] = useState([]);

  const canvasId = useEditorStore((s) => s.canvasId);
  const toPayload = useEditorStore((s) => s.toPayload);
  const setSavedId = useEditorStore((s) => s.setSavedId);
  const loadFromServer = useEditorStore((s) => s.loadFromServer);
  const resetCanvas = useEditorStore((s) => s.resetCanvas);

  const refreshList = async () => {
    const res = await client_list();
    setCanvases(res);
  };

  const client_list = async () => {
    const axiosRes = await fetch('http://localhost:5000/api/canvases');
    const json = await axiosRes.json();
    return json.data;
  };

  useEffect(() => {
    if (view === 'list') refreshList();
  }, [view]);

  const handleSave = async () => {
    const payload = toPayload();

    try {
      if (canvasId) {
        await canvasApi.update(canvasId, payload);
      } else {
        const created = await canvasApi.create(payload);
        setSavedId(created._id);
      }

      alert('Saved!');
      setView('list');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Save failed — check console');
    }
  };

  const handleOpen = async (id) => {
    const doc = await canvasApi.get(id);
    loadFromServer(doc);
    setView('editor');
  };

  const handleNew = () => {
    resetCanvas();
    setView('editor');
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this canvas?')) return;

    await canvasApi.remove(id);
    refreshList();
  };

  // =========================
  // CANVAS LIST PAGE
  // =========================
  if (view === 'list') {
    return (
      <main className="list-page">

        <div
          className="topbar"
          style={{
            padding: 0,
            border: 'none',
            marginBottom: 8
          }}
        >
          <h1>Canvasly</h1>

          <button
            className="btn"
            onClick={handleNew}
          >
            + New Canvas
          </button>
        </div>

        <div className="canvas-grid">

          {canvases.map((c) => (
            <div
              className="canvas-card"
              key={c._id}
            >
              <h3>{c.name || 'Untitled'}</h3>

              <p>
                Updated{' '}
                {new Date(c.updatedAt).toLocaleString()}
              </p>

              <div className="actions">

                <button
                  className="btn btn-secondary"
                  onClick={() => handleOpen(c._id)}
                >
                  Open
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>

      </main>
    );
  }

  // =========================
  // EDITOR PAGE
  // =========================
  return (
    <main>

      <div className="topbar">

        <h1>Canvasly</h1>

        <button
          className="btn btn-secondary"
          onClick={() => setView('list')}
        >
          &larr; Back
        </button>

      </div>

      <Toolbar />

      <div style={{ padding: '8px 16px' }}>
        <button
          className="btn"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      <div className="editor-layout">

        <div className="canvas-area">
          <EditorCanvas />
        </div>

        <PropertiesPanel />

      </div>

    </main>
  );
}
