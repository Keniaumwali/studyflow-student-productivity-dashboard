
function SummaryCard({ title, value, description, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className="rounded-xl bg-teal-50 p-3 text-teal-600">
          <Icon size={22} />
        </div>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

      {children}
    </div>
  );
}

export default SummaryCard;
