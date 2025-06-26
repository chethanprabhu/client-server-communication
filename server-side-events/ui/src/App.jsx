import { useEffect, useState } from "react";

const SSEComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/sse");

    eventSource.onmessage = (event) => {
      console.log(event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Server-Sent Events Example</h1>
      {messages.map((msg) => <div>{msg}</div>)}
    </div>
  );
};

export default SSEComponent;
