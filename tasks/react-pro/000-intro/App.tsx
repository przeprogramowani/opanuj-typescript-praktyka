import { useState } from 'react';

function fn(x: string) {
  return parseInt(x);
}

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="p-4 text-center text-3xl">
      <h1>Welcome to 000-intro</h1>
      <p>Current count: {count}</p>
      <button
        onClick={handleIncrement}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Increment
      </button>
    </div>
  );
};

export default App;
