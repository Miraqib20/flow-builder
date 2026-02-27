export interface EdgeData {
  to_node_id: string;
  condition: string;
}

export interface FlowNode {
  id: string;
  description: string;
  prompt: string;
  edges: EdgeData[];
  isStart?: boolean;

  position: {
    x: number;
    y: number;
  };
}