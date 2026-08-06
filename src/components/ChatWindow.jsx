import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import { IoChevronDown } from "react-icons/io5";

function ChatWindow({ messages, isTyping, forceScroll }) {
  const chatRef = useRef(null);
  const bottomRef = useRef(null);

  const [showScrollButton, setShowScrollButton] = useState(false);

  // Tracks whether we should auto-scroll
  const shouldAutoScroll = useRef(true);

  // Detect user scrolling
  const handleScroll = () => {
    const chat = chatRef.current;

    if (!chat) return;

    const nearBottom =
      chat.scrollHeight - chat.scrollTop - chat.clientHeight < 100;

    shouldAutoScroll.current = nearBottom;
    setShowScrollButton(!nearBottom);
  };

  // Scroll to bottom on first load
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "auto",
    });
  }, []);

  // Auto-scroll when messages or typing changes
  useEffect(() => {
    if (shouldAutoScroll.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // Force scroll (when user sends a message or clicks a suggestion)
  useEffect(() => {
    if (forceScroll) {
      shouldAutoScroll.current = true;

      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });

      setShowScrollButton(false);
    }
  }, [forceScroll]);

  // Manual scroll button
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    shouldAutoScroll.current = true;
    setShowScrollButton(false);
  };

  return (
    <div className="chat-wrapper">
      <div
        ref={chatRef}
        className="chat-window"
        onScroll={handleScroll}
      >
        {messages.map((msg) => (
          <Message
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            time={msg.time}
          />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef}></div>
      </div>

      {showScrollButton && (
        <button
          className="scroll-btn"
          onClick={scrollToBottom}
        >
          <IoChevronDown size={22} />
        </button>
      )}
    </div>
  );
}

export default ChatWindow;