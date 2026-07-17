const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
  required = false,
  disabled = false,
  icon = null,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full rounded-xl border py-3 outline-none transition-all duration-200
          ${
            icon ? "pl-12 pr-4" : "px-4"
          }
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-indigo-500"
          }
          ${
            disabled
              ? "cursor-not-allowed bg-slate-100"
              : "bg-white"
          }`}
        />

      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;