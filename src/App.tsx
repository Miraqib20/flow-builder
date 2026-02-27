import { useEffect } from "react";
import FlowCanvas from "./components/FlowCanvas";
import NodeSidebar from "./components/NodeSidebar";
import JSONPreview from "./components/JSONPreview";
import { useFlowStore } from "./store/flowStore";

export default function App() {
  const { addNode, undo, redo } = useFlowStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        const { selectedNode, deleteNode } =
          useFlowStore.getState();
        if (selectedNode) deleteNode(selectedNode);
      }
    };

    window.addEventListener("keydown", handler);
    return () =>
      window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="app">
      <header>
        <button onClick={addNode}>Add Node</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </header>

      <div className="layout">
        <FlowCanvas />
        <NodeSidebar />
        <JSONPreview />
      </div>
    </div>
  );
}