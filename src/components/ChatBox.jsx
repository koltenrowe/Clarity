import { useState } from "react";

function ChatBox({ personaName }) {
  const [messages, setMessages] = useState([
    { sender: "AI", text: `Hey, it’s ${personaName} here. What’s up? 🚀` }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
    // Here you'd add the API call to your backend ChatGPT endpoint
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-lg">
      <h4 className="text-xl font-bold mb-4 text-indigo-400">Chat with {personaName}</h4>
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-xl ${msg.sender === "You" ? "bg-indigo-600 text-right text-white ml-20" : "bg-gray-700 mr-20"}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
