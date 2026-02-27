import { create } from "zustand";
import { v4 as uuid } from "uuid";
import type { FlowNode } from "../types/flow";

interface FlowState {
  nodes: FlowNode[];
  selectedNode?: string;

  history: FlowNode[][];
  future: FlowNode[][];

  addNode: () => void;
  deleteNode: (id: string) => void;
  updateNode: (node: FlowNode) => void;
  selectNode: (id?: string) => void;

  /* ✅ START NODE CONTROL */
  setStartNode: (id: string) => void;

  addEdge: (from: string, to: string) => void;

  updateEdge: (
    from: string,
    index: number,
    condition: string,
    to: string
  ) => void;

  removeEdge: (from: string, index: number) => void;

  undo: () => void;
  redo: () => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  history: [],
  future: [],

  /* -------------------------
     ADD NODE
  ------------------------- */
  addNode: () => {
    const newNode: FlowNode = {
      id: uuid(),
      description: "New node",
      prompt: "",
      edges: [],
      position: { x: 150, y: 150 },
      isStart: false,
    };

    set((state) => ({
      history: [...state.history, state.nodes],
      nodes: [...state.nodes, newNode],
      future: [],
    }));
  },

  /* -------------------------
     DELETE NODE
  ------------------------- */
  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      selectedNode: undefined,
    })),

  /* -------------------------
     UPDATE NODE
  ------------------------- */
  updateNode: (node) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === node.id ? node : n
      ),
    })),

  selectNode: (id) => set({ selectedNode: id }),

  /* -------------------------
     ⭐ SET START NODE (ONLY ONE)
  ------------------------- */
  setStartNode: (id) =>
    set((state) => ({
      nodes: state.nodes.map((n) => ({
        ...n,
        isStart: n.id === id,
      })),
    })),

  /* -------------------------
     ADD EDGE
  ------------------------- */
  addEdge: (from, to) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === from
          ? {
              ...n,
              edges: [
                ...n.edges,
                {
                  to_node_id: to,
                  condition: "condition",
                },
              ],
            }
          : n
      ),
    })),

  /* -------------------------
     UPDATE EDGE
  ------------------------- */
  updateEdge: (from, index, condition, to) =>
    set((state) => ({
      nodes: state.nodes.map((n) => {
        if (n.id !== from) return n;

        const updatedEdges = [...n.edges];

        updatedEdges[index] = {
          to_node_id: to,
          condition,
        };

        return {
          ...n,
          edges: updatedEdges,
        };
      }),
    })),

  /* -------------------------
     REMOVE EDGE
  ------------------------- */
  removeEdge: (from, index) =>
    set((state) => ({
      nodes: state.nodes.map((n) => {
        if (n.id !== from) return n;

        return {
          ...n,
          edges: n.edges.filter((_, i) => i !== index),
        };
      }),
    })),

  /* -------------------------
     UNDO
  ------------------------- */
  undo: () => {
    const { history, nodes } = get();
    if (!history.length) return;

    const prev = history[history.length - 1];

    set({
      nodes: prev,
      history: history.slice(0, -1),
      future: [nodes],
    });
  },

  /* -------------------------
     REDO
  ------------------------- */
  redo: () => {
    const { future, nodes } = get();
    if (!future.length) return;

    const next = future[0];

    set({
      nodes: next,
      future: [],
      history: [...get().history, nodes],
    });
  },
}));