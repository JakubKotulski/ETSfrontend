import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ModalForm from "../../ModalForm/ModalForm";
import OrdersToAccept from "../../OrdersToAccept/OrdersToAccept";
import ModalData from "../../ModalData/ModalData";
import axios from "axios";
import { backendUrl } from "../../../config";
import "./Admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [orders, serOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalDataVisibility, setModalDataVisibility] = useState(false);
  const [amount, setAmount] = useState(0);
  const [newbalance, setNewBalance] = useState(0);

  const fetchUsers = async () => {
    try {
      const data = await fetch(`${backendUrl}/users`);
      const users = await data.json();
      setUsers(users.users);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrders = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${backendUrl}/orders`,
    }).then((res) => {
      serOrders(res.data);
    });
  };

  const addUser = (username, password, event) => {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: `${backendUrl}/user`,
    }).then((res) => {
      if (res.data === "User already exists") {
        setMessage(res.data);
        setShowMessage(true);
      } else {
        window.location.reload();
      }
    });
  };

  const payForRepair = (id) => {
    axios({
      method: "PUT",
      url: `${backendUrl}/admin/repair`,
      data: {
        amount: amount,
        _id: id,
      },
    }).then((res) => {});
  };

  const updateCompanyBalance = () => {
    axios({
      method: "PUT",
      url: `${backendUrl}/admin/balance`,
      data: {
        amount: newbalance,
      },
    }).then((res) => {});
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const handleClose = () => setModalDataVisibility(false);
  const handleShow = () => setModalDataVisibility(true);
  const getAmount = (e) => setAmount(e.target.value);
  const getBalance = (e) => setNewBalance(e.target.value);

  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <div className="admin-panel">
      <Table className="text-align" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>konto firmy</th>
            <th>Nowe saldo</th>
            <th>aktualizuj</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.username === "Hamdam")
            .map((user, index) => (
              <tr key={index}>
                <td>{user.companyBalance}</td>
                <td>
                  <input onChange={getBalance} placeholder="kwota" type="number" />
                </td>
                <td>
                  <Button
                    onClick={() => {
                      updateCompanyBalance();
                      window.location.reload();
                    }}
                    variant="outline-success"
                  >
                    Aktualizuj
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <OrdersToAccept orders={orders} />
      <Table className="text-align" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Uytkownik</th>
            <th>Przegląd</th>
            <th>Ubezpieczenie</th>
            <th>Uszkodzenia cię. w %</th>
            <th>Uszkodzenia nacz. w %</th>
            <th>Naprawa</th>
            <th>Zdjęcie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={8}>
              <Button onClick={() => setModalVisibility(true)} variant="outline-success">
                Dodaj uytkownika
              </Button>
            </td>
          </tr>
          {users
            // .filter((element) => element.isAdmin === false)
            .map((user, index) => (
              <tr key={index}>
                <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                <td style={{ verticalAlign: "middle" }}>{user.username}</td>
                <td style={{ verticalAlign: "middle" }}>{user.technicalReview ? "OK" : "Brak"}</td>
                <td style={{ verticalAlign: "middle" }}>{user.insurance ? "OK" : "Brak"}</td>
                <td style={{ verticalAlign: "middle" }}>{user.waste}</td>
                <td style={{ verticalAlign: "middle" }}>{user.wasteTrailer}</td>
                <td style={{ verticalAlign: "middle" }}>
                  <input type="number" onChange={getAmount} placeholder="kwota" style={{ marginBottom: "5px" }}></input>
                  <Button
                    onClick={() => {
                      payForRepair(user._id);
                      window.location.reload();
                    }}
                    variant="outline-success"
                  >
                    Napraw
                  </Button>
                </td>
                <td>
                  <img style={{ width: "90%" }} alt="Brak zdjęcia" src={user.wastePhoto}></img>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ModalForm
        modalVisibility={modalVisibility}
        closeModal={closeModal}
        addUser={addUser}
        message={message}
        showMessage={showMessage}
      />
      <ModalData show={modalDataVisibility} close={handleClose} open={handleShow} />
    </div>
  );
};

export default Admin;
