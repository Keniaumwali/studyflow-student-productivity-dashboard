
function EmptyState({ title, message, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
      {Icon && (
        <Icon
          size={42}
          className="mx-auto text-slate-300"
        />
      )}

      <h3 className="mt-4 font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;
