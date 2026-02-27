import { useFlowStore } from "../store/flowStore";

export default function NodeSidebar() {
  const {
    nodes,
    selectedNode,
    updateNode,
    addEdge,
    updateEdge,
    removeEdge,
    setStartNode, // ✅ NEW
  } = useFlowStore();

  const node = nodes.find((n) => n.id === selectedNode);

  if (!node) {
    return <div className="sidebar">Select node</div>;
  }

  // cannot connect node to itself
  const otherNodes = nodes.filter((n) => n.id !== node.id);

  return (
    <div className="sidebar">
      <h3>Edit Node</h3>

      {/* =======================
          DESCRIPTION
      ======================= */}
      <label htmlFor="node-description">Description</label>
      <textarea
        id="node-description"
        placeholder="Enter node description..."
        value={node.description}
        onChange={(e) =>
          updateNode({
            ...node,
            description: e.target.value,
          })
        }
      />

      {/* =======================
          PROMPT
      ======================= */}
      <label htmlFor="node-prompt">Prompt</label>
      <textarea
        id="node-prompt"
        placeholder="Enter prompt text..."
        value={node.prompt}
        onChange={(e) =>
          updateNode({
            ...node,
            prompt: e.target.value,
          })
        }
      />

      {/* =======================
          START NODE (FIXED ✅)
      ======================= */}
      <button onClick={() => setStartNode(node.id)}>
        Set Start Node
      </button>

      <hr />

      {/* =======================
          EDGE MANAGEMENT
      ======================= */}
      <h3>Outgoing Edges</h3>

      {node.edges.map((edge, index) => {
        const selectId = `edge-target-${index}`;
        const conditionId = `edge-condition-${index}`;

        return (
          <div key={index} className="edge-editor">
            {/* Target Node */}
            <label htmlFor={selectId}>Target Node</label>
            <select
              id={selectId}
              value={edge.to_node_id}
              onChange={(e) =>
                updateEdge(
                  node.id,
                  index,
                  edge.condition,
                  e.target.value
                )
              }
            >
              {otherNodes.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.description || "Node"}
                </option>
              ))}
            </select>

            {/* Condition */}
            <label htmlFor={conditionId}>Condition</label>
            <input
              id={conditionId}
              type="text"
              placeholder="Condition text"
              value={edge.condition}
              onChange={(e) =>
                updateEdge(
                  node.id,
                  index,
                  e.target.value,
                  edge.to_node_id
                )
              }
            />

            {/* Remove Edge */}
            <button onClick={() => removeEdge(node.id, index)}>
              Remove Edge
            </button>

            <hr />
          </div>
        );
      })}

      {/* ADD EDGE */}
      <button
        disabled={!otherNodes.length}
        onClick={() =>
          addEdge(node.id, otherNodes[0]?.id)
        }
      >
        + Add Edge
      </button>
    </div>
  );
}