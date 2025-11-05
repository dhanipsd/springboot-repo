import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../api/apiClient";
import { useState } from "react";

export default function TaskEditorPage() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { data: task } = useQuery(["task", id], async () => {
    const res = await api.get(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  });

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const mutation = useMutation((updated) =>
    api.put(`/tasks/${id}`, updated, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  const handleSave = () => mutation.mutate({ title, description });

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Task</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
