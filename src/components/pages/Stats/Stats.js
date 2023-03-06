import axios from "axios";
import { backendUrl } from "../../../config";
import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart } from "victory";

import "./Stats.css";

const Stats = ({ username, doneOrders, distance, avarageFuelConsumption }) => {
  const [companyDistance, setCompanyDistance] = useState(0);
  const [companyOrders, setCompanyOrders] = useState(0);
  const [companyFuel, setCompanyFuel] = useState(0);

  const getUsers = () => {
    axios({
      method: "GET",
      url: `${backendUrl}/users`,
    }).then((res) => {
      setCompanyDistance(res.data.companyDistance);
      setCompanyOrders(res.data.companyOrders);
      setCompanyFuel(res.data.companyFuel);
      console.log(res.data.companyDistance);
    });
  };

  const distanceData = [
    { users: "ja", distances: distance },
    { users: "firma", distances: companyDistance },
  ];

  const ordersData = [
    { users: "ja", orders: doneOrders },
    { users: "firma", orders: companyOrders },
  ];

  const fuelData = [
    { users: "ja", fuel: avarageFuelConsumption },
    { users: "firma", fuel: companyFuel },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="stats-box">
      {distanceData[1].distance === 0 ? (
        <p>Tworzenie wykresu</p>
      ) : (
        <div className="chart-box">
          <span className="chart-header">Pokonane km</span>
          <br />
          <span className="chart-header">Mój wynik: {distance}</span>

          <VictoryChart domainPadding={100}>
            <VictoryBar data={distanceData} x="users" y="distances" />
          </VictoryChart>
        </div>
      )}
      {ordersData[1].orders === 0 ? (
        <p>Tworzenie wykresu</p>
      ) : (
        <div className="chart-box">
          <span className="chart-header">Zlecenia</span>
          <br />
          <span className="chart-header">Mój wynik: {doneOrders}</span>

          <VictoryChart domainPadding={100}>
            <VictoryBar data={ordersData} x="users" y="orders" />
          </VictoryChart>
        </div>
      )}
      {fuelData[1].fuel === 0 ? (
        <p>Tworzenie wykresu</p>
      ) : (
        <div className="chart-box">
          <span className="chart-header">Zuzyte Paliwo</span>
          <br />
          <span className="chart-header">
            Mój wynik:{" "}
            {avarageFuelConsumption || avarageFuelConsumption === 0
              ? avarageFuelConsumption.toFixed(2)
              : "ładowanie danych"}
          </span>

          <VictoryChart domainPadding={100}>
            <VictoryBar data={fuelData} x="users" y="fuel" />
          </VictoryChart>
        </div>
      )}
    </div>
  );
};

export default Stats;
