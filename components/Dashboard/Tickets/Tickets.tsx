import { databases } from "@/lib/appwrite";
import { useUser } from "@/lib/context/user";
import { ID, Query } from "appwrite";
import { useEffect, useState } from "react";

const categories = ["General Enquiries", "Payment Related Issues", "Complaints", "Others"];

// Enum to define the state of the ticket
enum state {
  open = "open",
  closed = "closed",
}

interface Ticket {
  id: string;
  category: string;
  description: string;
  reply: string;
  state: state; // Enum type for state
}

const TicketForm = () => {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Fetch tickets when component loads
  useEffect(() => {
    const loadTickets = async () => {
      if (user) {
        const ticketResponse = await databases.listDocuments(
          "66c22b21001e7eea3fa7",
          "670c4219001a5237a7de",
          [Query.equal("userId", user?.$id)]
        );
        const fetchedTickets = ticketResponse.documents.map((ticket: any) => ({
          id: ticket.$id,
          category: ticket.category,
          description: ticket.description,
          reply: ticket.reply || "",
          state: ticket.state as state, // Fetch state as enum directly from Appwrite document
        }));
        setTickets(fetchedTickets);
      }
    };
    loadTickets();
  }, [user]);

  // Handle ticket form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return; // Make sure user exists

    // Create a new ticket in the database
    const newDoc = await databases.createDocument(
      "66c22b21001e7eea3fa7",
      "670c4219001a5237a7de",
      ID.unique(),
      {
        category: selectedCategory,
        description: message,
        userId: user?.$id,
        state: state.open, // Newly created ticket is open by default
      }
    );

    // Add the new ticket to state
    const newTicket: Ticket = {
      id: newDoc.$id,
      category: selectedCategory,
      description: message,
      reply: "",
      state: state.open, // Default to open when created
    };

    setTickets((prevTickets) => [...prevTickets, newTicket]);
    setMessage(""); // Reset message input
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="mb-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Submit a Complaint</h2>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg p-3"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-lg font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg p-3"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition duration-300 shadow-lg"
        >
          Submit
        </button>
      </form>

      {/* Tickets Section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Previous Tickets</h2>
      <div className="space-y-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket.id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">
                Ticket #{ticket.id} - {ticket.category}
              </h3>
              <p className="mt-3 text-gray-700 text-lg">{ticket.description}</p>
              {ticket.reply && (
                <div className="mt-4 text-sm text-gray-500 bg-gray-100 p-3 rounded-md">
                  <strong>Reply:</strong> {ticket.reply}
                </div>
              )}
              <div className="mt-4">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                    ticket.state === state.open
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {ticket.state === state.open ? "Open" : "Closed"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No previous tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default TicketForm;
