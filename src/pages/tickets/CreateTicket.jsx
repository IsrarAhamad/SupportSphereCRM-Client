import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import api from "../../services/api.js";

import Input from "../../components/ui/Input.jsx";
import TextArea from "../../components/ui/TextArea.jsx";
import Button from "../../components/ui/Button.jsx";

const CreateTicket = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      customerName,
      customerEmail,
      subject,
      description,
    } = formData;

    if (
      !customerName ||
      !customerEmail ||
      !subject ||
      !description
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        "/tickets",
        formData
      );

      toast.success(data.message);

      navigate("/tickets");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create ticket"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl"
    >
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Create New Ticket
        </h1>

        <p className="mt-2 text-slate-500">
          Fill in the customer details below.
        </p>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Customer Name"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Rahul Sharma"
            required
          />

          <Input
            label="Customer Email"
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            placeholder="rahul@gmail.com"
            required
          />
        </div>

        <Input
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Payment Failed"
          required
        />

        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the customer's issue..."
          required
        />

        <div className="flex justify-end">
          <div className="w-full md:w-52">
            <Button
              type="submit"
              loading={loading}
            >
              Create Ticket
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateTicket;