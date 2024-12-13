export default function Rewinder({ text }: { text: string }) {
  const processedText = text
    .split(/\s+/)
    .map((word) => word.split('').reverse().join(''))
    .join(' ');

  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg border border-gray-800">
      <p className="text-gray-200">{processedText}</p>
    </div>
  );
}
