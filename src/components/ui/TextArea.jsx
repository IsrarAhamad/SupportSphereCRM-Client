const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
  required = false,
  error,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`w-full resize-none rounded-xl border px-4 py-3 outline-none transition
        ${
          error
            ? "border-red-500"
            : "border-slate-300 focus:border-indigo-500"
        }`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;