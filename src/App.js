import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import MyOrders from "./components/pages/MyOrders/MyOrders";
import Admin from "./components/pages/Admin/Admin";
import SignIn from "./components/pages/SignIn/SignIn";
import YesNavbar from "./components/YesNavbar/YesNavbar";
import Stats from "./components/pages/Stats/Stats";
import CarCreate from "./components/pages/CarCreate/CarCreate";
import Ranking from "./components/pages/Ranking/Ranking";
import WorkShop from "./components/pages/WorkShop/WorkShop";
import Archive from "./components/pages/Archive/Archive";
import "./App.css";
import { backendUrl } from "./config";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [date, setDate] = useState(0);

  const path = window.location.pathname;

  const isLogged = async () => {
    if (localStorage.getItem("token") == null) {
      if (path !== "/") {
        window.location.href = "/";
      }
    } else {
      const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
      try {
        const response = await axios({
          method: "POST",
          url: `${backendUrl}/welcome`,
          headers: {
            Authorization: token,
          },
        });
        setUser(response.data);
        if (path === "/admin" && !response.data.isAdmin) {
          window.location.href = "/myOrders";
        }
      } catch (err) {
        if (path !== "/") {
          window.location.href = "/";
        }
        console.log(err);
      }
    }
  };

  const updateDate = () => {
    const dateToSet = new Date();
    setDate(dateToSet);
  };

  useEffect(() => {
    isLogged();
    updateDate();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact={true} path="/" element={<SignIn />} />
          <Route element={<YesNavbar isAdmin={user.isAdmin} />}>
            <Route exact={true} path="/admin" element={<Admin />} />

            <Route path="/myOrders" element={<MyOrders userData={user} />} />
            <Route
              path="/statistics"
              element={
                <Stats
                  username={user.username}
                  distance={user.distance}
                  avarageFuelConsumption={user.avarageFuelConsumption}
                  doneOrders={user.doneOrders}
                />
              }
            />
            <Route path="/create_car" element={<CarCreate userID={user._id} />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/workshop" element={<WorkShop user={user} date={date} />} />
            <Route path="/archive" element={<Archive user={user} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
