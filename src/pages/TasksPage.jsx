
import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Search,
  ListTodo,
  SlidersHorizontal,
} from "lucide-react";

import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import EmptyState from "../components/EmptyState";

import useDocumentTitle from "../hooks/useDocumentTitle";
import useDebounce from "../hooks/useDebounce";

function TasksPage({ tasks, setTasks }) {
  useDocumentTitle("Tasks");

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");

  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  function handleSaveTask(taskData) {
    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...taskData }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData,
        completed: false,
      };

      setTasks((previousTasks) => [
        ...previousTasks,
        newTask,
      ]);
    }

    setShowForm(false);
    setEditingTask(null);
  }

  function handleEditTask(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function handleDeleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmed) {
      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );
    }
  }

  function handleToggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  const filteredTasks = tasks
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
    )
    .filter((task) =>
      categoryFilter === "All"
        ? true
        : task.category === categoryFilter
    )
    .filter((task) => {
      if (statusFilter === "Completed") {
        return task.completed;
      }

      if (statusFilter === "Pending") {
        return !task.completed;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      return (
        (a.dueDate || "9999-12-31").localeCompare(
          b.dueDate || "9999-12-31"
        )
      );
    });

  const categories = [
    "All",
    "Programming",
    "Database",
    "Networking",
    "Research",
    "Mathematics",
    "Other",
  ];

  const pendingCount = tasks.filter(
    (task) => !task.completed
  ).length;

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  function closeForm() {
    setShowForm(false);
    setEditingTask(null);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-teal-600">
            STAY ORGANIZED
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Tasks
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your study tasks and track your progress.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-600"
        >
          <Plus size={20} />
          Add New Task
        </button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Tasks</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {tasks.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Pending Tasks</p>
          <h2 className="mt-2 text-3xl font-bold text-amber-600">
            {pendingCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Completed Tasks</p>
          <h2 className="mt-2 text-3xl font-bold text-teal-600">
            {completedCount}
          </h2>
        </div>
      </section>

      {showForm && (
        <TaskForm
          key={editingTask ? editingTask.id : "new-task"}
          initialTask={editingTask}
          onSave={handleSaveTask}
          onCancel={closeForm}
        />
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal size={19} className="text-teal-600" />
          <h2 className="font-semibold text-slate-800">
            Search and Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search tasks..."
              aria-label="Search tasks by title"
              className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-3 outline-none focus:border-teal-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
            aria-label="Filter by category"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All"
                  ? "All Categories"
                  : category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            aria-label="Filter by status"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
            aria-label="Sort tasks"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-500"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="title">Sort A–Z</option>
          </select>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <ListTodo size={21} className="text-teal-600" />
            Your Tasks
          </h2>

          <span className="text-sm text-slate-500">
            {filteredTasks.length} results
          </span>
        </div>

        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            message="Start organizing your studies by adding your first task."
            icon={ListTodo}
          />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            title="No matching tasks"
            message="Try changing your search or filters."
            icon={Search}
          />
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default TasksPage;
