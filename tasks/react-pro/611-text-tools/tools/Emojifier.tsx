const EMOJIS = ['🌟', '🎈', '🌸', '🌺', '🍀', '🌙', '⭐', '🌈', '✨', '💫'];

export default function Emojifier({ text }: { text: string }) {
  const processedText = text.replace(/\s+/g, () => {
    const randomIndex = Math.floor(Math.random() * EMOJIS.length);
    return EMOJIS[randomIndex];
  });

  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg border border-gray-800">
      <p className="break-words text-gray-200">{processedText}</p>
    </div>
  );
}
