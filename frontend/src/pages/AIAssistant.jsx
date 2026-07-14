import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AIAssistant() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const sendQuery = () => {
    if (!query.trim()) return;

    const userMessage = {
      type: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);

    api
      .post("/ai/query", {
        query: query,
      })
      .then((res) => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: res.data.answer,
          },
        ]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Something went wrong.",
          },
        ]);
      });

    setQuery("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            AI Assistant 🤖
          </h1>

          <div className="bg-white rounded-xl shadow p-6 h-[500px] overflow-y-auto">

            {messages.length === 0 && (
              <p className="text-gray-500">
                Ask something like:
                <br />
                • How many available seats?
                <br />
                • How many occupied seats?
                <br />
                • Show employee Amit seat
              </p>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.type === "user"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

          </div>

          <div className="flex gap-3 mt-5">

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask AI..."
              className="flex-1 border rounded-lg px-4 py-3"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendQuery();
                }
              }}
            />

            <button
              onClick={sendQuery}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg"
            >
              Send
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}