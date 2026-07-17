import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api.js";
import StatusBadge from "../ui/StatusBadge.jsx";
import Button from "../ui/Button.jsx";

const TicketStatus = ({ ticket, onStatusUpdate }) => {
  const [status, setStatus] = useState(ticket.status);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const { data } = await api.put(`/tickets/${ticket.ticketId}`, {
        status,
      });

      toast.success(data.message || "Status updated");

      onStatusUpdate(status);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update status"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Ticket Status
      </h2>

      <div className="space-y-5">

        <div>
          <p className="mb-2 text-sm text-slate-500">
            Current Status
          </p>

          <StatusBadge status={ticket.status} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Change Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <Button
          loading={loading}
          onClick={handleUpdate}
        >
          Update Status
        </Button>

      </div>
    </div>
  );
};

export default TicketStatus;