
import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
} from "lucide-react";

import useToggle from "../hooks/useToggle";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useLocalStorage from "../hooks/useLocalStorage";

function TimerSession({ session, duration }) {
  const [seconds, setSeconds] = useState(duration);

  const [isRunning, toggleRunning, setIsRunning] =
    useToggle(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }

        return previousSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
    }
  }, [seconds, setIsRunning]);

  function resetTimer() {
    setIsRunning(false);
    setSeconds(duration);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }

  return (
    <>
      <div className="my-10">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
          {session} time remaining
        </p>

        <div className="mt-4 text-7xl font-bold tracking-tight text-slate-900 md:text-8xl">
          {formatTime(seconds)}
        </div>

        <p className="mt-4 text-sm text-slate-500">
          {isRunning
            ? "Timer is running. Keep going!"
            : "Ready when you are."}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={toggleRunning}
          disabled={seconds === 0}
          className="flex items-center gap-2 rounded-xl bg-teal-500 px-7 py-4 font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          type="button"
          onClick={resetTimer}
          className="flex items-center gap-2 rounded-xl bg-slate-100 px-7 py-4 font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>
    </>
  );
}

function FocusTimer() {
  useDocumentTitle("Focus Timer");

  const [session, setSession] = useState("Study");

  const [studyDuration] = useLocalStorage(
    "studyflow-study-duration",
    25
  );

  const sessionDurations = {
    Study: studyDuration * 60,
    Break: 5 * 60,
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
        <Timer size={32} />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-slate-900">
        Focus Timer
      </h2>

      <p className="mt-2 text-slate-500">
        Stay focused and make every study session count.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        {["Study", "Break"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSession(item)}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
              session === item
                ? "bg-teal-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {item} Session
          </button>
        ))}
      </div>

      <TimerSession
        key={`${session}-${studyDuration}`}
        session={session}
        duration={sessionDurations[session]}
      />
    </div>
  );
}

export default FocusTimer;
