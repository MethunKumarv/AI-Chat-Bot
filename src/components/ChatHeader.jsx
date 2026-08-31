import { IoAdd } from "react-icons/io5";
function ChatHeader({ onClear, isTyping }) {
  return (
    <div className="header">
      <div>
        <h2>🤖 HexaBot AI</h2>

        <div className="status">
          <span className="status-dot"></span>
          <small>
            {isTyping ? "Thinking..." : "Online"}
          </small>
        </div>
      </div>

      <button onClick={onClear} className="new-chat-header-btn">
        <IoAdd size={18} />
        <span>Clear Chat</span>
      </button>
    </div>
  );
}

export default ChatHeader;