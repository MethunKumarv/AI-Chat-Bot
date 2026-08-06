function SuggestedPrompts({ onSelect }) {
  const prompts = [
    "What is React?",
    "Tell me about Hexaware",
    "What is JavaScript?",
    "What is an internship?",
  ];

  return (
    <div className="suggestions">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

export default SuggestedPrompts;