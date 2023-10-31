import './App.css';
import Navbar from './Navbar'
import Home from './pages/Home';
import Leaderboards from './pages/Leaderboards';
import PlayerPage from './pages/PlayerPage';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="gradient"></div>
      <div className="pageContainer">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/leaderboards" element={<Leaderboards/>}/>
          <Route path="/player" element={<PlayerPage/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
