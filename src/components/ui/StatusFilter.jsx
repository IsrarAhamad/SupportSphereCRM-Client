const StatusFilter = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
    >
      <option value="">All Status</option>
      <option value="Open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="Closed">Closed</option>
    </select>
  );
};

export default StatusFilter;