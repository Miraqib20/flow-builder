import { useFlowStore } from "../store/flowStore";
import { validateFlow } from "../utils/validation";

export default function JSONPreview() {
  const { nodes } = useFlowStore();

  const errors = validateFlow(nodes);

  return (
    <div className="json">
      <h3>Live JSON</h3>

      {/* Validation Errors */}
      {errors.map((error, index) => (
        <p className="errors" key={index}>
          {error}
        </p>
      ))}

      {/* JSON Output */}
      <pre>{JSON.stringify(nodes, null, 2)}</pre>
    </div>
  );
}