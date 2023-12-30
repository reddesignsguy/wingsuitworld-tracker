import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Leaderboards from "./pages/Leaderboards";
import PlayerPage from "./pages/PlayerPage";
import Settings from "./pages/Settings";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, refetchOnMount: false },
  },
});

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [AlertBar, setAlertBar] = useState(null); // * "Lifting state up" pattern
  const location = useLocation();

  useEffect(() => {
    // TODO This logic should not be in front-end, use Auth0 Action workflow!!!
    // ! The reason this is here is because Auth0 requires a deployed backend (backend not deployed yet)
    async function addUserToDbIfDoesntExist() {
      if (isAuthenticated && user) {
        const userId = user?.sub;
        var res = await fetch(`http://localhost:5051/user/${userId}`);
        if (res.ok) {
          res.json().then((userData) => {
            setUserData(userData);
            console.log(`setting user data to ${userData["playername"]}`);
          });
          console.log("user already uploaded to db");
        } else {
          console.log("no user found in db");
          const data = {
            userId: userId,
          };

          res = await fetch(`http://localhost:5051/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (res.ok) {
            console.log("user has been created");
          }
        }
      }
    }

    // hide alert bar if user is not on player page
    function calculateAlertBar() {
      if (location.pathname.indexOf("/player/") != 0) {
        setAlertBar(null);
      }
    }

    calculateAlertBar();
    addUserToDbIfDoesntExist();
  }, [isAuthenticated, location]);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {AlertBar}
        <Navbar />
        {/* <div className="gradient"></div> */}
        <div className="pageContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route
              path="/player/:playername"
              element={
                <PlayerPage setAlertBar={setAlertBar} userData={userData} />
              }
            ></Route>
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
