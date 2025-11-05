import { useQuery } from "@tanstack/react-query";
import api from "../api/apiClient";

export default function TaskListPage() {
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const { data: tasks, isLoading } = useQuery(["tasks"], fetchTasks);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <a href={`/tasks/${t.id}`}>{t.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
