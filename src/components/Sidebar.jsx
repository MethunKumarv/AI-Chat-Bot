function Sidebar({ onNewChat, onClearChat }) {
  return (
    <aside className="sidebar">
      <h2>🤖 HexaBot AI</h2>

      <button
        className="new-chat-btn"
        onClick={onNewChat}
      >
        + New Chat
      </button>

      <button
        className="clear-chat-btn"
        onClick={onClearChat}
      >
        🗑 Clear Chat
      </button>

      <div className="sidebar-footer">
        <p>Powered by</p>
        <h4>Google Gemini AI</h4>

        <small>React + Vite</small>
      </div>
    </aside>
  );
}

export default Sidebar;