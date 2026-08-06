import ReactMarkdown from "react-markdown";

function Message({ sender, text, time }) {
  return (
    <div className={`message ${sender}`}>
      {sender === "bot" && (
        <div className="avatar bot-avatar">
          🤖
        </div>
      )}

      <div className="bubble">
        <ReactMarkdown>{text}</ReactMarkdown>

        <small>{time}</small>
      </div>

      {sender === "user" && (
        <div className="avatar user-avatar">
          👤
        </div>
      )}
    </div>
  );
}

export default Message;