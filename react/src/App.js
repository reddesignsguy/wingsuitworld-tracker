import './App.css';
import Navbar from './Navbar'
import Home from './pages/Home';
import Leaderboards from './pages/Leaderboards';
import PlayerPage from './pages/PlayerPage';
import {Routes, Route} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

function App() {

  const {isAuthenticated, user } = useAuth0();

  // TODO: This logic should not be in front-end
  // Once authenticated, upload user to DB if not present
  useEffect(() => {
    async function checkUserExists() {
      if (isAuthenticated && user) {
        const userId = user?.sub;
        var res = await fetch(`http://localhost:5051/user/${userId}`);
        res.json().then(async (data) => {
          if (data == null) {
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

              res.json().then(data => {
                if (data.errno) {
                  console.log('fail');
                } else {
                  console.log('uploaded user successfully, ', data);
                }
                
              });

            
          } else {
            console.log('user already uploaded to db')
          }
        })
      }
    }

    checkUserExists();
  }, [isAuthenticated]);
  return (
    <div className="App">
      <Navbar/>
      <div className="gradient"></div>
      <div className="pageContainer">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/leaderboards" element={<Leaderboards/>}/>
          <Route path="/player/:playername" element={<PlayerPage/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
