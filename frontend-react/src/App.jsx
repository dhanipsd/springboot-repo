import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskListPage from "./pages/TaskListPage";
import TaskEditorPage from "./pages/TaskEditorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/tasks" element={<TaskListPage />} />
      <Route path="/tasks/:id" element={<TaskEditorPage />} />
    </Routes>
  );
}

export default App;
