import { useState } from "react";

import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/ChatWindow";

type Role = "user" | "agent";

interface Message {
  id: number;
  role: Role;
  content: string;
}



export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
  if (!text.trim()) return;

  const userMessage: Message = {
    id: Date.now(),
    role: "user",
    content: text,
  };

  const agentMessageId = Date.now() + 1;
  const agentMessage: Message = {
    id: agentMessageId,
    role: "agent",
    content: "",
  };

  setMessages((prev) => [...prev, userMessage, agentMessage]);
  setIsLoading(true);

  try {
    const response = await fetch(
      "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-mastra-dev-playground": "true",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
          runId: "weatherAgent",
          maxRetries: 2,
          maxSteps: 5,
          temperature: 0.5,
          topP: 1,
          runtimeContext: {},
          threadId: 2,
          resourceId: "weatherAgent",
        }),
      }
    );

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let result = "";

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter((line) => line.trim());

      for (const line of lines) {
        if (line.startsWith("0:")) {
          try {
            const token = JSON.parse(line.slice(2));
            result += token;

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === agentMessageId
                  ? { ...msg, content: result }
                  : msg
              )
            );
          } catch {
            console.warn("Failed to parse token:", line);
          }
        }
      }
    }
  } catch (error) {
    console.error("API error:", error);
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === agentMessageId
          ? { ...msg, content: " Failed to fetch response." }
          : msg
      )
    );
  }
  setIsLoading(false); 
};


  return (
    <div className="flex flex-col h-screen">
      <ChatWindow messages={messages} isLoading={isLoading} />
      <ChatInput onSend={handleSend}  isLoading={isLoading}/>
    </div>
  );
}
