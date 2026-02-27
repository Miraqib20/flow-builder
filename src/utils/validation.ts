import type { FlowNode } from "../types/flow";

/* --------------------------------
   MAIN FLOW VALIDATION
-------------------------------- */
export function validateFlow(nodes: FlowNode[]): string[] {
  const errors: string[] = [];

  /* ---------- START NODE CHECK ---------- */
  const startNodes = nodes.filter((n) => n.isStart);

  if (startNodes.length === 0) {
    errors.push("Starting node must exist");
    return errors; // stop further checks
  }

  if (startNodes.length > 1) {
    errors.push("Only one starting node allowed");
  }

  /* ---------- DISCONNECTED NODE CHECK ⭐ ---------- */
  const disconnected = findDisconnectedNodes(nodes);

  if (disconnected.length > 0) {
    errors.push(
      `${disconnected.length} disconnected node(s) detected`
    );
  }

  return errors;
}

/* --------------------------------
   GRAPH TRAVERSAL (DFS)
-------------------------------- */
function findDisconnectedNodes(nodes: FlowNode[]) {
  const start = nodes.find((n) => n.isStart);
  if (!start) return [];

  const visited = new Set<string>();

  function dfs(nodeId: string) {
    if (visited.has(nodeId)) return;

    visited.add(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    node.edges.forEach((edge) =>
      dfs(edge.to_node_id)
    );
  }

  dfs(start.id);

  return nodes.filter((n) => !visited.has(n.id));
}