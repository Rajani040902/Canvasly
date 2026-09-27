import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

const useEditorStore = create((set, get) => ({
  elements: [],
  selectedId: null,
  canvasId: null,
   name: 'Untitled Canvas',

 loadFromServer(doc) {
  set({ canvasId: doc._id, elements: doc.elements || [], name: doc.name || 'Untitled Canvas' });
},

logout() {
  localStorage.removeItem('token');
  set({ elements: [], selectedId: null, canvasId: null, name: 'Untitled Canvas' });
},

  toPayload() {
  const { elements, name } = get();
  return { name, elements };
},

setName(newName) {
  set({ name: newName });
},

  setSavedId(id) {
    set({ canvasId: id });
  },

    resetCanvas() {
  set({ elements: [], selectedId: null, canvasId: null, name: 'Untitled Canvas' });
},

  addRect() {
    const el = { id: uuid(), type: 'rect', x: 100, y: 100, width: 150, height: 100, rotation: 0, fill: '#3D5AFE' };
    set((state) => ({ elements: [...state.elements, el] }));
  },

  addCircle() {
    const el = { id: uuid(), type: 'circle', x: 200, y: 150, radius: 60, rotation: 0, fill: '#F2994A' };
    set((state) => ({ elements: [...state.elements, el] }));
  },

  addText() {
    const el = { id: uuid(), type: 'text', x: 150, y: 200, text: 'Edit me', fontSize: 24, fill: '#111' };
    set((state) => ({ elements: [...state.elements, el] }));
  },

  selectElement(id) {
    set({ selectedId: id });
  },

  updateElement(id, changes) {
    set((state) => ({
      elements: state.elements.map((el) => (el.id === id ? { ...el, ...changes } : el)),
    }));
  },

  deleteSelected() {
    const { selectedId } = get();
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== selectedId),
      selectedId: null,
    }));
  },
}));

export default useEditorStore;