import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to 211-use-state</h1>
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
