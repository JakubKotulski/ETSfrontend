import {
  faRoad,
  faTruck,
  faMoneyBill,
  faCheck,
  faGasPump,
  faTachographDigital,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataArray from "../../DataArray/DataArray";
import TopBar from "../../TopBar/TopBar";
import DataSquare from "../../DataSquare/DataSquare";
import ProgressInfo from "../../ProgressInfo/ProgressInfo";
import RejectedOrders from "../../RejectedOrders/RejectedOrders";
import "./MyOrders.css";
import PickCountries from "../../PickCountries/PickCountries";
import PickModal from "../../PickModal/PickModal";
import axios from "axios";
import { backendUrl } from "../../../config";

const Main = ({ userData }) => {
  const [maxValue, setMaxValue] = useState(12000);
  const [percent, setPercent] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [km, setKm] = useState(userData.distance);
  const [access, setAccess] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const checkUserData = () => {
    if (userData.doneOrders >= 5) {
      setAccess(true);
    }
    const toSet = JSON.parse(localStorage.getItem("countries"));
    setCountries(toSet);
  };

  const fetchOrders = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

    axios({
      method: "GET",
      url: `${backendUrl}/order/me`,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setAllOrders(res.data);
    });

    axios({
      method: "GET",
      url: `${backendUrl}/order/me/rejected`,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setRejectedOrders(res.data);
    });
  };

  const createOrders = (pickedCountries) => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

    axios({
      method: "POST",
      url: `${backendUrl}/order/create`,
      headers: {
        Authorization: token,
      },
      data: {
        countries: pickedCountries,
      },
    }).then((res) => {
      localStorage.setItem("countries", JSON.stringify(res.data));
      window.location.reload();
    });
  };

  useEffect(() => {
    checkUserData();
    fetchOrders();
  }, []);

  return (
    <div className="main-container">
      <TopBar username={userData.username} />
      <div className="mid-section">
        <h4>Hamdam</h4>
        <div className="mid-container">
          <div className="half-section">
            <p className="green-baner">Aktualne Zlecenia</p>
            <div className="data-array">
              <DataArray access={access} data={allOrders} />
            </div>
            <div className="data-array">
              <p className="green-baner">Odrzucone Zlecenia</p>
              <RejectedOrders access={access} data={rejectedOrders} />
            </div>
            <PickCountries handleShow={handleShow} access={allOrders} countries={countries} />
          </div>
          <div className="half-section">
            <ProgressInfo percent={percent} iconName={faRoad} distance={userData.monthDistance} maxValue={maxValue} />
            <div className="recent-order">
              <div className="description">
                <p>Aktualna dostawa</p>
                <span className="order-info">{allOrders[0] === undefined ? "Brak" : allOrders[0].way}</span>
              </div>
              <FontAwesomeIcon className="icon-style-bigger" icon={faTruck} />
            </div>
            <div className="recent-order" id="orange-background">
              <div className="description">
                <p>Następna dostawa</p>
                <span className="order-info">{allOrders[1] === undefined ? "Brak" : allOrders[1].way}</span>
              </div>
              <FontAwesomeIcon className="icon-style-bigger" icon={faTruck} />
            </div>
            <div className="square">
              <div>
                <div className="info-box">
                  <div className="desctiption">
                    <p>Przejechane kilometry</p>
                    <p>{userData.distance}</p>
                  </div>
                  <FontAwesomeIcon className="icon-style-bigger" icon={faTachographDigital} />
                </div>
                <div className="info-box">
                  <div className="desctiption">
                    <p>Średnie zuzycie paliwa</p>
                    <p>
                      {userData.avarageFuelConsumption || userData.avarageFuelConsumption === 0
                        ? userData.avarageFuelConsumption.toFixed(2)
                        : "ładowanie danych"}
                    </p>
                  </div>
                  <FontAwesomeIcon className="icon-style-bigger" icon={faGasPump} />
                </div>
              </div>
              <div>
                <div className="info-box" style={{ marginLeft: "auto" }}>
                  <div className="desctiption">
                    <p>Wykonane dostawy</p>
                    <p>{userData.doneOrders}</p>
                  </div>
                  <FontAwesomeIcon className="icon-style-bigger" icon={faCheck} />
                </div>
                <div className="info-box" style={{ marginLeft: "auto" }}>
                  <div className="desctiption">
                    <p>Stan Konta</p>
                    <p>{userData.income}</p>
                  </div>
                  <FontAwesomeIcon className="icon-style-bigger" icon={faMoneyBill} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PickModal show={show} handleClose={handleClose} setOrders={createOrders} />
    </div>
  );
};

export default Main;
