import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

import api from "../../services/api.js";
import TicketTable from "../../components/ui/TicketTable.jsx";
import SearchBar from "../../components/ui/SearchBar.jsx";
import StatusFilter from "../../components/ui/StatusFilter.jsx";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      console.log("Search:", search);
      console.log("Status:", status);

      const { data } = await api.get("/tickets", {
        params: {
          search,
          status,
        },
      });

      console.log(data);

      setTickets(data.tickets || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTickets();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, status]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl lg:text-4xl">
            Tickets
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Manage and track customer support tickets.
          </p>
        </div>

        <Link
          to="/tickets/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 sm:w-auto sm:px-5 sm:py-3 sm:text-base"
        >
          <Plus size={18} />
          New Ticket
        </Link>
      </div>

      {/* Search + Filter */}

      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

        <StatusFilter
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      {/* Table */}

      {loading ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          Loading tickets...
        </div>
      ) : (
        <TicketTable tickets={tickets} />
      )}
    </motion.div>
  );
};

export default Tickets;
