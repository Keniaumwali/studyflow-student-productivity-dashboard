
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  Settings,
  BookOpen,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Focus",
    path: "/focus",
    icon: Timer,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">

      {/* Sidebar */}
      <aside className="w-full bg-slate-950 text-white md:min-h-screen md:w-64 md:shrink-0">

        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-6">
          <div className="rounded-xl bg-teal-500 p-2">
            <BookOpen size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">StudyFlow</h1>
            <p className="text-xs text-slate-400">
              Your study companion
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex gap-2 overflow-x-auto p-4 md:flex-col">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-500 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="hidden border-t border-slate-800 p-5 md:block">
          <p className="text-xs text-slate-400">
            Stay focused. Keep growing.
          </p>
        </div>

      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        {children}
      </main>

    </div>
  );
}

export default SiteLayout;
