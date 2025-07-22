interface Message {
  id: number;
  role: "user" | "agent";
  content: string;
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`max-w-[75%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
        isUser ? "bg-gray-500 text-white self-end" : "bg-gray-100 text-black self-start"
      }`}
    >
      {message.content}
    </div>
  );
}
