import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ticket, CircleCheckBig, Clock3, AlertCircle } from "lucide-react";

import api from "../../services/api";
import StatCard from "../../components/ui/StatCard";
import TicketTable from "../../components/ui/TicketTable";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const { data } = await api.get("/tickets");

      setTickets(data.tickets || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const total = tickets.length;

  const open = tickets.filter((ticket) => ticket.status === "Open").length;

  const progress = tickets.filter(
    (ticket) => ticket.status === "In Progress",
  ).length;

  const closed = tickets.filter((ticket) => ticket.status === "Closed").length;

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl lg:text-4xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500 sm:mt-2 sm:text-base">
          Welcome back! Here's an overview of your support tickets.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tickets"
          value={total}
          icon={Ticket}
          color="text-indigo-600"
          bgColor="bg-indigo-100"
        />

        <StatCard
          title="Open"
          value={open}
          icon={AlertCircle}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />

        <StatCard
          title="In Progress"
          value={progress}
          icon={Clock3}
          color="text-amber-600"
          bgColor="bg-amber-100"
        />

        <StatCard
          title="Closed"
          value={closed}
          icon={CircleCheckBig}
          color="text-emerald-600"
          bgColor="bg-emerald-100"
        />
      </div>

      {/* Recent Tickets */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold">Recent Tickets</h2>

        {loading ? (
          <div className="rounded-2xl bg-white p-8 shadow-sm">Loading...</div>
        ) : (
          <TicketTable tickets={tickets.slice(0, 5)} />
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
