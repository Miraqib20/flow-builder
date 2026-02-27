import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Connection,
  type NodeChange,
} from "reactflow";
import "reactflow/dist/style.css";

import { useFlowStore } from "../store/flowStore";

export default function FlowCanvas() {
  const { nodes, selectNode, updateNode, addEdge } =
    useFlowStore();

  /* --------------------------
     Convert Store → ReactFlow Nodes
  --------------------------- */
  const rfNodes = nodes.map((n) => ({
    id: n.id,
    position: n.position,

    data: {
      // ✅ Show readable label instead of UUID
      label: n.isStart
        ? `🟢 START: ${n.description || "Node"}`
        : n.description || "Node",
    },

    // ✅ Highlight start node visually
    style: n.isStart
      ? {
          border: "2px solid #22c55e",
          background: "#ecfdf5",
          fontWeight: 600,
        }
      : {},
  }));

  /* --------------------------
     Convert Edges
  --------------------------- */
  const rfEdges = nodes.flatMap((n) =>
    n.edges.map((e) => ({
      id: `${n.id}-${e.to_node_id}`,
      source: n.id,
      target: e.to_node_id,
      label: e.condition,
      animated: true,
    }))
  );

  /* --------------------------
     Handle Node Drag
  --------------------------- */
  const onNodesChange = (changes: NodeChange[]) => {
    changes.forEach((change) => {
      if (change.type === "position" && change.position) {
        const node = nodes.find((n) => n.id === change.id);
        if (!node) return;

        updateNode({
          ...node,
          position: change.position,
        });
      }
    });
  };

  /* --------------------------
     Handle Edge Connection
  --------------------------- */
  const onConnect = (connection: Connection) => {
    if (connection.source && connection.target) {
      addEdge(connection.source, connection.target);
    }
  };

  return (
    <div className="flow-canvas">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onNodeClick={(_, node) => selectNode(node.id)}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}