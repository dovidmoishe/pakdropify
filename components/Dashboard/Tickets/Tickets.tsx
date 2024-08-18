import { useState } from "react";

const categories = ["Technical Issue", "Billing", "General Inquiry"];

const TicketForm = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<
    { id: number; category: string; message: string; replies: string[] }[]
  >([
    {
      id: 1,
      category: "Technical Issue",
      message: "I am facing a login issue.",
      replies: ["We are looking into it."],
    },
    {
      id: 2,
      category: "Billing",
      message: "I was overcharged.",
      replies: ["Refund processed."],
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = {
      id: tickets.length + 1,
      category: selectedCategory,
      message,
      replies: [],
    };
    setTickets([...tickets, newTicket]);
    setMessage("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Submit a Complaint</h2>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            rows={4}
          />
        </div>
        <button type="submit" className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
          Submit
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Previous Tickets</h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 border border-gray-300 rounded-md"
          >
            <h3 className="text-lg font-semibold">
              Ticket #{ticket.id} - {ticket.category}
            </h3>
            <p className="text-gray-700 mt-2">{ticket.message}</p>
            <div className="mt-4 space-y-2">
              {ticket.replies.map((reply, index) => (
                <div key={index} className="text-sm text-gray-500">
                  {`Reply ${index + 1}: ${reply}`}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketForm;
