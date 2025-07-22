import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


interface Props {
  onSend: (text: string) => void;
  isLoading : boolean
}

export default function ChatInput({ onSend , isLoading}: Props) {
  const [input, setInput] = useState("");

  const handleClick = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="w-full p-4 border-t">
      <div className="max-w-3xl mx-auto flex space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          disabled={isLoading}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleClick();
            }
          }}
        />
        <Button onClick={handleClick}
        disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
