import Table from "react-bootstrap/Table";
import "./Archive.css";
import axios from "axios";
import { backendUrl } from "../../../config";
import { useState, useEffect } from "react";

const Archive = ({ user }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

    axios({
      method: "GET",
      url: `${backendUrl}/orders`,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setOrders(res.data);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="archive-box">
      <div className="data-border">
        <Table className="text-align" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Trasa</th>
              <th>Zuzyte paliwo</th>
              <th>Stan licznika - start</th>
              <th>Stan licznika - koniec</th>
              <th>Pokonane km</th>
              <th>Uszkodzenia ładunku</th>
              <th>Zdjęcie</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) => order.accepted === "true")
              .filter((order) => order.userID === user._id)
              .map((item, index) => (
                <tr key={index}>
                  <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                  <td style={{ verticalAlign: "middle" }}>{item.way}</td>
                  <td style={{ verticalAlign: "middle" }}>{item.fuelConsumption}</td>
                  <td style={{ verticalAlign: "middle" }}>{item.startState}</td>
                  <td style={{ verticalAlign: "middle" }}>{item.endState}</td>
                  <td style={{ verticalAlign: "middle" }}>{item.distance}</td>
                  <td style={{ verticalAlign: "middle" }}>{item.wasteStuff}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    <img style={{ width: "50%" }} src={item.file}></img>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Archive;
