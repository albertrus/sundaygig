import './App.css';
import MusicianProfile from './MusicianProfile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">🎸 SundayGig</h1>
        <p className="App-subtitle">Find & book musicians for your next gig</p>
      </header>
      <main className="App-main">
        <MusicianProfile />
      </main>
    </div>
  );
}

export default App;
