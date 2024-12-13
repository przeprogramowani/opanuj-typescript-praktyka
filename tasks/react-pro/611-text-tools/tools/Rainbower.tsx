export default function Rainbower({ text }: { text: string }) {
  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg border border-gray-800">
      <p
        className="text-transparent bg-clip-text text-2xl font-bold"
        style={{
          backgroundImage: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f)',
          backgroundSize: '200% auto',
          animation: 'rainbow 5s linear infinite',
        }}
      >
        {text}
      </p>
      <style>
        {`
          @keyframes rainbow {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>
    </div>
  );
}
