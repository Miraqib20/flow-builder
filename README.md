# 🚀 Visual Flow Builder

A modern **Visual Flow Builder** built using **React + TypeScript**, allowing users to visually create workflows by connecting nodes with conditional transitions.

This project mimics lightweight workflow automation tools such as **Zapier**, **n8n**, and chatbot flow builders.

---

## 🌐 Live Demo
https://flow-builder-six-opal.vercel.app
---

## 📖 Overview

The application provides an interactive canvas where users can design flows visually and export them as structured JSON.

Users can:
  Create_workflow_nodes
  Connect nodes using conditional edges
  Define transitions between steps
  Mark a start node
  Edit node properties
  View live JSON output
  Validate workflows in real-time

The goal was to build an intuitive flow editor with clean architecture and strong validation logic.

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **React Flow** — visual graph editor
- **Zustand** — state management
- **Vite** — development & build tool
- **CSS** — custom styling

---

## ✨ Features

🧩 Canvas Editor
  Add new nodes dynamically
  Drag and reposition nodes
  Connect nodes visually
  Edge labels display transition conditions
  Highlighted **Start Node**
  Delete key removes selected node

---

⚙️ Node Sidebar
When a node is selected:

- Edit node description
- Edit prompt text
- Set start node
- Add outgoing edges
- Select target node
- Modify edge condition
- Remove edges anytime

---

📄Live_JSON_Preview
  Real-timeJSON generation
  Automatic updates during editing
  Inline validation messages
  Export-ready schema output

---

## ✅ Validations Implemented

- ✔ Starting node must exist
- ✔ Only one start node allowed
- ✔ Node description required
- ✔ Disconnected node detection
- ✔ Live validation feedback

Graph traversal (DFS) is used to ensure workflow correctness.

---

## 📦 JSON Schema

```ts
interface Edge {
  to_node_id: string;
  condition: string;
}

interface Node {
  id: string;
  description?: string;
  prompt: string;
  edges: Edge[];
}
📂 Project Structure
src/
│
├── components/
│   ├── FlowCanvas.tsx
│   ├── NodeSidebar.tsx
│   └── JSONPreview.tsx
│
├── store/
│   └── flowStore.ts
│
├── utils/
│   └── validation.ts
│
├── types/
│   └── flow.ts
│
├── App.tsx
└── main.tsx
⚙️ Getting Started
1️⃣ Clone Repository
git clone <your-repository-link>
cd flow-builder
2️⃣ Install Dependencies
npm install
3️⃣ Run Development Server
npm run dev

Open:

http://localhost:5173
🧠 Design Decisions

React Flow used for efficient node-edge visualization.

Zustand chosen for lightweight global state handling.

Unique node IDs generated using UUID.

Validation logic centralized for maintainability.

Graph traversal algorithm ensures flow connectivity.


👨‍💻 Author

Mir Aqib Mushtaq
FullStacl Developer

