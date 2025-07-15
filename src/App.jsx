import React from 'react';
import './App.css';
import Header from './components/Header';
import MatchList from './components/MatchList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <MatchList />
      </main>
    </div>
  );
}

export default App;
