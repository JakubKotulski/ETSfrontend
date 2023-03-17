import axios from "axios";
import { backendUrl } from "../../../config";
import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import "./Stats.css";

const Stats = ({ doneOrders, distance, avarageFuelConsumption }) => {
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
          <br></br>
          <span className="chart-header">Wynik firmy: {companyDistance}</span>

          <VictoryChart theme={VictoryTheme.material} domainPadding={100}>
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
          <br></br>
          <span className="chart-header">Wynik firmy: {companyOrders}</span>

          <VictoryChart theme={VictoryTheme.material} domainPadding={100}>
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
          <br></br>
          <span className="chart-header">Wynik firmy: {companyFuel.toFixed(2)}</span>

          <VictoryChart theme={VictoryTheme.material} domainPadding={100}>
            <VictoryBar data={fuelData} x="users" y="fuel" />
          </VictoryChart>
        </div>
      )}
    </div>
  );
};

export default Stats;
