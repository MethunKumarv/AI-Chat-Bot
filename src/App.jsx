import { useState, useEffect } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import SuggestedPrompts from "./components/SuggestedPrompts";
import { sendMessage } from "./services/chatApi";
import "./styles/App.css";

function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            sender: "bot",
            text: "👋 Hello! I'm HexaBot AI. Ask me anything about programming, web development, or general topics.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [forceScroll, setForceScroll] = useState(false);

  // Save chat automatically
  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  // Send Message
  const handleSend = async (userMessage) => {
    if (!userMessage.trim()) return;

    setForceScroll(true);

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);

    setIsTyping(true);

    try {
      const reply = await sendMessage(userMessage);

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "⚠️ I couldn't reach the AI service. Please check your internet connection or try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsTyping(false);
      setForceScroll(false);
    }
  };

  // New Chat / Clear Chat
  const clearChat = () => {
    localStorage.removeItem("chat");

    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "👋 Hello! I'm HexaBot AI. Ask me anything about programming, web development, or general topics.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
  <div className="app">
    <div className="chat-container">
          <ChatHeader
            onClear={clearChat}
            isTyping={isTyping}
          />

          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            forceScroll={forceScroll}
          />

          
          <SuggestedPrompts onSelect={handleSend} />
          

          <ChatInput onSend={handleSend} />

          <footer className="footer">
            © {new Date().getFullYear()} HexaBot AI • Powered by Google Gemini
          </footer>
        </div>
      </div>
  );
}

export default App;