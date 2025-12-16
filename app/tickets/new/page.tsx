function NewTicketsPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Submit a Support Ticket
        </h1>
        <form className="space-y-4 text-gray-700">
          <input
            type="text"
            className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400  "
            name="subject"
            placeholder="Subject"
            required
          />
          <textarea
            className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            name="description"
            placeholder="Describe your issue"
            rows={4}
            required
          />
          <select
            className="w-full border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            name="priority"
            defaultValue="low"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50 "
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTicketsPage;
