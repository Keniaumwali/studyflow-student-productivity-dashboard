# StudyFlow – Student Productivity Dashboard

StudyFlow is a responsive student productivity web application built with React 19 and Vite. It helps students organize academic tasks, manage study sessions, monitor progress, and customize their study preferences.

## Features

### 1. Dashboard
- Displays total, completed, and pending tasks.
- Shows task completion progress.
- Displays upcoming tasks.
- Provides a quick overview of study activities.

### 2. Task Management
- Add, edit, and delete tasks.
- Mark tasks as completed or pending.
- Search tasks by title using debounced search.
- Filter tasks by category and completion status.
- Sort tasks by due date or alphabetical order.
- Display appropriate empty states when no tasks or search results exist.

### 3. Focus Timer
- 25-minute Study session.
- 5-minute Break session.
- Start, pause, and reset controls.
- Updates the countdown every second.
- Resets the timer when switching between Study and Break sessions.
- Cleans up the timer interval when the component unmounts.

### 4. Settings
- Customize daily study goals.
- Enable or disable study reminders.
- Automatically save preferences using localStorage.

### 5. Data Persistence
- Tasks are saved in localStorage.
- Settings are saved in localStorage.
- Data remains available after refreshing the browser.

## Technologies Used

- React 19
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Lucide React
- Browser localStorage

## Custom React Hooks

StudyFlow uses four custom hooks:

| Hook | Purpose |
|---|---|
| `useLocalStorage` | Stores and retrieves application data from localStorage. |
| `useToggle` | Manages boolean states such as starting and pausing the timer. |
| `useDocumentTitle` | Updates the browser tab title for each page. |
| `useDebounce` | Delays search updates to avoid filtering on every keystroke. |

## Component Structure

```text
studyflow/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── EmptyState.jsx
│   │   ├── FocusTimer.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskForm.jsx
│   ├── data/
│   │   └── initialTasks.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useToggle.js
│   │   ├── useDocumentTitle.js
│   │   └── useDebounce.js
│   ├── layouts/
│   │   └── SiteLayout.jsx
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── TasksPage.jsx
│   │   └── SettingsPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Application Routes

| Route | Description |
|---|---|
| `/` | Dashboard |
| `/tasks` | Task management |
| `/focus` | Focus timer |
| `/settings` | Application settings |
| `*` | 404 Not Found page |

## Performance Considerations

The Focus Timer keeps its frequently changing countdown state inside the `TimerSession` component rather than the parent `FocusTimer` component.

The application was tested using browser Developer Tools and `console.count()`.

During the test:
- `FocusTimer` rendered 2 times.
- `TimerSession` rendered 46 times.

This demonstrated that the timer updates independently without causing its parent component to re-render every second.

The timer also uses:
- `useEffect` cleanup to clear its interval.
- `useRef` to store the interval ID.
- `key={session}` to reset the timer component when switching between Study and Break sessions.

React Compiler is part of the React optimization ecosystem and can automatically optimize components when properly configured. It is not enabled in the current Vite configuration. Manual memoization with `React.memo` or `useMemo` was not necessary for this implementation because the frequently changing timer state is already isolated inside `TimerSession`.

## Installation and Setup

### Prerequisites
- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Keniaumwali/studyflow-student-productivity-dashboard.git
```

### 2. Navigate to the project folder

```bash
cd studyflow-student-productivity-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### 5. Build for production

```bash
npm run build
```

## Learning Outcomes

Through this project, I practiced:

- Building reusable React components.
- Managing shared and local state.
- Passing data and callbacks through props.
- Implementing controlled forms and validation.
- Using React Hooks, including custom hooks.
- Managing side effects with `useEffect`.
- Using `useRef` for references and timer intervals.
- Implementing client-side routing.
- Persisting application data with localStorage.
- Building responsive interfaces with Tailwind CSS.
- Observing and understanding component rendering behavior.

## Project Links

- **GitHub Repository:** https://github.com/Keniaumwali/studyflow-student-productivity-dashboard
- **Live Application:** To be added after deployment.
- **Project Walkthrough Video:** To be added after recording.

## Author

Umwali Keza Kenia

Student Productivity Dashboard – StudyFlow
