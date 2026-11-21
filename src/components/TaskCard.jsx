
import {
  CalendarDays,
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
} from "lucide-react";

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const priorityStyles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center">

      {/* Task Information */}
      <div className="flex min-w-0 flex-1 items-start gap-3">

        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={
            task.completed
              ? "Mark task as pending"
              : "Mark task as completed"
          }
          className="mt-1 shrink-0 text-teal-600"
        >
          {task.completed ? (
            <CheckCircle2 size={23} />
          ) : (
            <Circle size={23} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={`break-words font-semibold ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-800"
            }`}
          >
            {task.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {task.category}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                priorityStyles[task.priority]
              }`}
            >
              {task.priority}
            </span>

            <span className="flex items-center gap-1 text-xs text-slate-500">
              <CalendarDays size={14} />
              {new Date(
                `${task.dueDate}T00:00:00`
              ).toLocaleDateString()}
            </span>

            <span className="text-xs font-medium text-slate-500">
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* Task Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:justify-end">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
        >
          <Pencil size={15} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          className="rounded-lg bg-red-50 p-2.5 text-red-600 hover:bg-red-100"
        >
          <Trash2 size={17} />
        </button>
      </div>

    </div>
  );
}

export default TaskCard;
