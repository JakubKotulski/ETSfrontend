import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./Ranking.css";

const Ranking = () => {
  const [users, setUsers] = useState([]);

  const sortByDistance = () => {
    const sorted = [...users].sort((a, b) => b.distance - a.distance);
    setUsers(sorted);
  };

  const sortByOrders = () => {
    const sorted = [...users].sort((a, b) => b.doneOrders - a.doneOrders);
    setUsers(sorted);
  };

  const sortByFuel = () => {
    const sorted = [...users].sort((a, b) => a.avarageFuelConsumption - b.avarageFuelConsumption);
    setUsers(sorted);
  };

  const getUsers = () => {
    axios({
      method: "GET",
      url: "http://localhost:4000/users",
    }).then((res) => {
      setUsers(res.data.users);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="ranking-box">
      <Table className="text-align" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nazwa uytkownika</th>
            <th onClick={() => sortByOrders()}>Wykonanie zlecenia ↑↓</th>
            <th onClick={() => sortByDistance()}>Pokonane km ↑↓</th>
            <th onClick={() => sortByFuel()}>Średnie zuzycie paliwa ↑↓</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.doneOrders}</td>
              <td>{user.distance}</td>
              <td>{user.avarageFuelConsumption}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Ranking;
