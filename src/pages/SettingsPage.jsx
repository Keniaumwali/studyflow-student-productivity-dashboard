
import useLocalStorage from "../hooks/useLocalStorage";
import { Target, Bell, Settings } from "lucide-react";
import useDocumentTitle from "../hooks/useDocumentTitle";

function SettingsPage() {
    useDocumentTitle("Settings");
  const [dailyGoal, setDailyGoal] = useLocalStorage(
    "studyflow-daily-goal",
    4
  );

  const [reminders, setReminders] = useLocalStorage(
    "studyflow-reminders",
    true
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section>
        <p className="text-sm font-medium text-teal-600">
          PERSONALIZE YOUR EXPERIENCE
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Customize your study goals and preferences.
        </p>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Settings className="text-teal-600" size={23} />
          <h2 className="text-xl font-bold text-slate-900">
            Study Preferences
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-teal-50 p-3 text-teal-600">
              <Target size={24} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">
                Daily Study Goal
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Set how many hours you want to study each day.
              </p>

              <div className="mt-5 flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={dailyGoal}
                  onChange={(event) =>
                    setDailyGoal(Number(event.target.value))
                  }
                  className="w-full accent-teal-500"
                />

                <span className="min-w-20 rounded-lg bg-teal-50 px-4 py-2 text-center font-bold text-teal-700">
                  {dailyGoal} hrs
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Bell size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Study Reminders
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Enable or disable study reminders.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={reminders}
              onClick={() => setReminders((previous) => !previous)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                reminders ? "bg-teal-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  reminders ? "left-6" : "left-1"
                }`}
              />
            </button>
          </div>

          <p className="mt-4 text-sm font-medium text-slate-500">
            Reminders are currently {reminders ? "enabled" : "disabled"}.
          </p>
        </div>
      </section>

      <div className="rounded-xl border border-teal-100 bg-teal-50 p-4">
        <p className="text-sm text-teal-800">
          Your preferences are automatically saved in your browser.
        </p>
      </div>
    </div>
  );
}

export default SettingsPage;
