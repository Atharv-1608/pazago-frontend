import MessageBubble from "./MessageBubble";

interface Props {
  messages: {
    id: number;
    role: "user" | "agent";
    content: string;
  }[];
  isLoading: boolean;
}

export default function ChatWindow({ messages , isLoading }: Props) {
  return (
    <div className="flex-1  overflow-y-auto p-4 flex flex-col space-y-2 mx-56">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading && (
  <div className="text-sm text-gray-400 italic self-start">
    Agent is typing...
  </div>
)}
    </div>
    
  );
}
