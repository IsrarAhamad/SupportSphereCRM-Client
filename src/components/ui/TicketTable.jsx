import { Link } from "react-router-dom";
import { Eye, Plus } from "lucide-react";
import StatusBadge from "./StatusBadge";

const TicketTable = ({ tickets = [] }) => {
  if (!tickets.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
          <Plus size={24} className="text-indigo-600" />
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          No Tickets Found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          There are no tickets available.
        </p>

        <Link
          to="/tickets/new"
          className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Create Ticket
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          {/* Table Head */}
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">

              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-4">
                Ticket ID
              </th>

              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-4">
                Customer
              </th>

              {/* Desktop Only */}
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 md:table-cell">
                Subject
              </th>

              {/* Desktop Only */}
              <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 md:table-cell">
                Status
              </th>

              <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-4">
                View
              </th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.ticketId}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                {/* Ticket ID */}
                <td className="px-3 py-3 sm:px-4">
                  <p className="text-sm font-semibold text-slate-800">
                    {ticket.ticketId}
                  </p>
                </td>

                {/* Customer */}
                <td className="px-3 py-3 sm:px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      {ticket.customerName?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {ticket.customerName}
                      </p>

                      {/* Hide email on mobile */}
                      <p className="hidden text-xs text-slate-500 md:block">
                        {ticket.customerEmail}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Subject - Desktop */}
                <td className="hidden max-w-xs px-4 py-3 md:table-cell">
                  <p className="truncate text-sm text-slate-700">
                    {ticket.subject}
                  </p>
                </td>

                {/* Status - Desktop */}
                <td className="hidden px-4 py-3 md:table-cell">
                  <StatusBadge status={ticket.status} />
                </td>

                {/* View */}
                <td className="px-3 py-3 text-center sm:px-4">
                  <Link
                    to={`/tickets/${ticket.ticketId}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                  >
                    <Eye size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default TicketTable;