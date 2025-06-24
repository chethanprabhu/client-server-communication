import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const App = () => {
  const [name, setName] = useState("");        // user's name
  const [input, setInput] = useState("");      // message input
  const [messages, setMessages] = useState([]); // message history

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("chat message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const setNameHandler = () => {
    if (name.trim()) {
      socket.emit("set name", name);
    }
  };

  const sendMessageHandler = () => {
    if (input.trim()) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  return (
    <>
      <h3>Set Your Name:</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={setNameHandler}>Save Name</button>

      <hr />

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessageHandler}>Send</button>

      <div>
        <h3>Messages:</h3>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.name}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
