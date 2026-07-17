import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "../../services/api.js";

import TicketInfo from "../../components/ticket/TicketInfo.jsx";
import TicketStatus from "../../components/ticket/TicketStatus.jsx";
import NotesSection from "../../components/ticket/NotesSection.jsx";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTicket = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/tickets/${ticketId}`);

      setTicket(data.ticket);
      setNotes(data.notes || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  const handleStatusUpdate = (newStatus) => {
    setTicket((prev) => ({
      ...prev,
      status: newStatus,
    }));
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        Loading Ticket...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        Ticket not found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Ticket Info */}
        {/* Ticket Info */}
        <div className="space-y-2">
          <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Support Ticket
          </span>

          <h1 className="break-all text-2xl font-bold text-slate-900 sm:text-3xl">
            {ticket.ticketId}
          </h1>

          <p className="text-sm text-slate-500 sm:text-base">
            View customer details, ticket status, notes and update progress.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-slate-600">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </div>

            <div>
              <span className="font-medium">Status:</span> {ticket.status}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}

        <div className="space-y-6 lg:col-span-2">
          <TicketInfo ticket={ticket} />

          <NotesSection
            ticketId={ticket.ticketId}
            notes={notes}
            refreshTicket={fetchTicket}
          />
        </div>

        {/* Right */}

        <div>
          <TicketStatus ticket={ticket} onStatusUpdate={handleStatusUpdate} />
        </div>
      </div>
    </motion.div>
  );
};

export default TicketDetails;
