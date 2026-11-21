
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import SummaryCard from "../components/SummaryCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

function DashboardPage({ tasks }) {
    useDocumentTitle("Dashboard");
  // Derived values from the shared tasks array
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completionRate = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const upcomingTasks = tasks
    .filter((task) => !task.completed)
    .sort(
      (a, b) =>
        new Date(a.dueDate) - new Date(b.dueDate)
    )
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* Welcome Section */}
      <section>
        <p className="text-sm font-medium text-teal-600">
          YOUR STUDY SPACE
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Welcome back!
        </h1>

        <p className="mt-2 text-slate-500">
          Stay organized, keep learning and achieve your goals.
        </p>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Tasks"
          value={totalTasks}
          description="All your study tasks"
          icon={ListTodo}
        />

        <SummaryCard
          title="Completed"
          value={completedTasks}
          description="Tasks you have finished"
          icon={CheckCircle2}
        />

        <SummaryCard
          title="Pending"
          value={pendingTasks}
          description="Tasks waiting for you"
          icon={Clock}
        />

        <SummaryCard
          title="Progress"
          value={`${completionRate}%`}
          description="Your completion rate"
          icon={TrendingUp}
        >
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-teal-500 transition-all"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </SummaryCard>

      </section>

      {/* Progress Section */}
      <section className="rounded-2xl bg-slate-950 p-6 text-white md:p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-teal-400">
              <TrendingUp size={20} />
              <span className="text-sm font-semibold">
                YOUR PROGRESS
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold">
              Keep up the great work!
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              You have completed {completedTasks} out of {totalTasks} tasks.
            </p>
          </div>

          <div className="text-4xl font-bold text-teal-400">
            {completionRate}%
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-teal-400 transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </section>

      {/* Upcoming Tasks */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Upcoming Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Here is what you need to work on next.
            </p>
          </div>

          <Link
            to="/tasks"
            className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700"
          >
            View all
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-6 space-y-4">

          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {task.category}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      task.priority === "High"
                        ? "bg-red-50 text-red-600"
                        : task.priority === "Medium"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-slate-100 text-slate-600"
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
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-slate-500">
              No pending tasks. Great job!
            </p>
          )}

        </div>
      </section>

    </div>
  );
}

export default DashboardPage;
