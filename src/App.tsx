import { Counter } from './features/counter/Counter';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Diary</h1>
        <Counter />
        <Outlet />
      </header>
    </div>
  );
}

export default App;
