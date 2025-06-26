import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const handleCheck = async () => {
    const urls = input.split('\n').filter((line) => line && !line.startsWith('#'));
    const response = await fetch('/api/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls }),
    });
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <main style={{ backgroundColor: '#000', color: '#0f0', minHeight: '100vh', padding: '2rem' }}>
      <h1>M3U Link Checker</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} style={{ width: '100%' }} />
      <button onClick={handleCheck}>Check Links</button>
      <ul>
        {results.map(({ url, status }) => (
          <li key={url}>{url} — <strong>{status}</strong></li>
        ))}
      </ul>
    </main>
  );
}
