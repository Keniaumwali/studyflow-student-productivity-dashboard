
import { useState } from "react";
import { X, Save } from "lucide-react";

function TaskForm({ initialTask, onSave, onCancel }) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [category, setCategory] = useState(
    initialTask?.category || "Programming"
  );
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || "");
  const [priority, setPriority] = useState(
    initialTask?.priority || "Medium"
  );
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    onSave({
      title: title.trim(),
      category,
      dueDate,
      priority,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          {initialTask ? "Edit Task" : "Add New Task"}
        </h2>

        <button
          type="button"
          onClick={onCancel}
          aria-label="Close task form"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mb-4">
        <label
          htmlFor="task-title"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Task Title *
        </label>

        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
          placeholder="Enter your task title"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="task-category"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Category
        </label>

        <select
          id="task-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-500"
        >
          <option value="Programming">Programming</option>
          <option value="Database">Database</option>
          <option value="Networking">Networking</option>
          <option value="Research">Research</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="task-date"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Due Date
        </label>

        <input
          id="task-date"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="task-priority"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Priority
        </label>

        <select
          id="task-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-500"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-600"
        >
          <Save size={17} />
          {initialTask ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
