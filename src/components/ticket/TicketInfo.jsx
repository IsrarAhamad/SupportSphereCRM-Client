import { Mail, User, FileText } from "lucide-react";

const TicketInfo = ({ ticket }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Ticket Information
      </h2>

      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <User className="mt-1 text-indigo-600" size={20} />

          <div>
            <p className="text-sm text-slate-500">Customer Name</p>
            <h3 className="font-semibold text-slate-800">
              {ticket.customerName}
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="mt-1 text-indigo-600" size={20} />

          <div>
            <p className="text-sm text-slate-500">Customer Email</p>
            <h3 className="font-semibold text-slate-800">
              {ticket.customerEmail}
            </h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FileText className="mt-1 text-indigo-600" size={20} />

          <div>
            <p className="text-sm text-slate-500">Subject</p>
            <h3 className="font-semibold text-slate-800">
              {ticket.subject}
            </h3>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-slate-500">
            Description
          </p>

          <div className="rounded-xl bg-slate-50 p-4 text-slate-700">
            {ticket.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;