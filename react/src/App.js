import './App.css';
import Navbar from './Navbar'
import Home from './pages/Home';
import Leaderboards from './pages/Leaderboards';
import PlayerPage from './pages/PlayerPage';
import {Routes, Route} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

function App() {

  const {isAuthenticated, user } = useAuth0();
  const [AlertBar, setAlertBar] = useState(null); // * "Lifting state up" pattern
  // TODO: This logic should not be in front-end, use Auth0 Action workflow
  // Once authenticated, upload user to DB if not present
  useEffect(() => {
    async function checkUserExists() {
      if (isAuthenticated && user) {
        const userId = user?.sub;
        var res = await fetch(`http://localhost:5051/user/${userId}`);
        if (res.ok) {
          console.log('user already uploaded to db')
        } else {
          
              console.log('no user found in db')
  
              const data = {
                userId: userId
              }
  
              res = await fetch(`http://localhost:5051/user`, 
                {method: 'POST', 
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                });
              if (res.ok) {
                console.log("user has been created")
              }
          
        }
      }
    }

    checkUserExists();
  }, [isAuthenticated]);
  return (
    <div className="App">
      {AlertBar}
      <Navbar/>
      <div className="gradient"></div>
      <div className="pageContainer">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/leaderboards" element={<Leaderboards/>}/>
          <Route path="/player/:playername" element={<PlayerPage setAlertBar = {setAlertBar}/>}></Route>
        </Routes>
      </div>
    </div>
  );
}


export default App;
