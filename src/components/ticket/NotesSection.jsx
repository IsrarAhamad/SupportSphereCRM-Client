import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "../../services/api.js";
import TextArea from "../ui/TextArea.jsx";
import Button from "../ui/Button.jsx";

const NotesSection = ({ ticketId, notes = [], refreshTicket }) => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddNote = async () => {
    if (!note.trim()) {
      return toast.error("Please enter a note");
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        `/tickets/${ticketId}/notes`,
        {
          note,
        }
      );

      toast.success(data.message);

      setNote("");

      refreshTicket();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add note"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Notes
      </h2>

      {/* Notes List */}

      <div className="space-y-4">

        {notes.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-5 text-center text-slate-500">
            No notes available.
          </div>
        ) : (
          notes.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between">

                <h4 className="font-semibold text-slate-800">
                  {item.createdBy?.name}
                </h4>

                <span className="text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleString()}
                </span>

              </div>

              <p className="mt-3 text-slate-700">
                {item.note}
              </p>

            </motion.div>
          ))
        )}

      </div>

      {/* Add Note */}

      <div className="mt-8 space-y-4">

        <TextArea
          label="Add Note"
          name="note"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
        />

        <div className="flex justify-end">

          <div className="w-full md:w-48">
            <Button
              loading={loading}
              onClick={handleAddNote}
            >
              Add Note
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NotesSection;