import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./ModalForm.css";
import AlertInfo from "../AlertInfo/AlertInfo";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../../config";

const ModalForm = ({ modalVisibility, closeModal, addUser, message, showMessage, order, track }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [startState, setStartState] = useState(0);
  const [endState, setEndState] = useState(0);
  const [startStateEmpty, setStartStateEmpty] = useState(0);
  const [endStateEmpty, setEndStateEmpty] = useState(0);
  const [fuelPrice, setFuelPrice] = useState(0);
  const [fuelAmount, setFuelAmount] = useState(0);
  const [fuelUsed, setfuelUsed] = useState(0);
  const [truckDamage, setTruckDamage] = useState(0);
  const [stuffDamage, setStuffDamage] = useState(0);
  const [semiTrailerDamage, setSemiTrailerDamage] = useState(0);
  const [photo, setPhoto] = useState("");

  const getStartState = (e) => {
    setStartState(e.target.value);
  };

  const getEndState = (e) => {
    setEndState(e.target.value);
  };

  const getStartStateEmpty = (e) => {
    setStartStateEmpty(e.target.value);
  };

  const getEndStateEmpty = (e) => {
    setEndStateEmpty(e.target.value);
  };

  const getFuelPrice = (e) => {
    setFuelPrice(e.target.value);
  };

  const getFuelAmount = (e) => {
    setFuelAmount(e.target.value);
  };

  const getFuelUsed = (e) => {
    setfuelUsed(e.target.value);
  };

  const getTruckDamage = (e) => {
    setTruckDamage(e.target.value);
  };

  const getStuffDamage = (e) => {
    setStuffDamage(e.target.value);
  };

  const getSemiTrailerDamage = (e) => {
    setSemiTrailerDamage(e.target.value);
  };

  const getPhoto = (e) => {
    setPhoto(e.target.value);
  };

  const getUsername = (e) => {
    setUsername(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };

  const sendOrder = async (event) => {
    event.preventDefault();
    const token = await JSON.parse(JSON.stringify(localStorage.getItem("token")));

    axios({
      method: "PUT",
      url: `${backendUrl}/order/me`,
      data: {
        id: track._id,
        startState: startState,
        endState: endState,
        startStateEmpty: startStateEmpty,
        endStateEmpty: endStateEmpty,
        fuelAmount: fuelAmount,
        fuelPrice: fuelPrice,
        fuelUsed: fuelUsed,
        stuffDamage: stuffDamage,
        semiTrailerDamage: semiTrailerDamage,
        truckDamage: truckDamage,
        track: track.toString(),
        photo: photo,
      },
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      window.location.reload();
    });
  };

  return (
    <>
      {order ? (
        <div className="modal show" style={{ display: "block", position: "initial" }}>
          <Modal show={modalVisibility}>
            <Modal.Header closeButton onClick={closeModal}>
              <Modal.Title>Podsumuj trase</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                autoComplete="off"
                className="register-form"
                onSubmit={(event) => {
                  sendOrder(event);
                  closeModal();
                }}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Trasa</Form.Label>
                  <Form.Control placeholder={track.way} type="text" disabled />
                </Form.Group>

                <div className="double-form-field">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Początkowy stan licznika </Form.Label>
                    <Form.Control onChange={getStartStateEmpty} type="number" placeholder="Puste kilometry" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Końcowy stan licznika </Form.Label>
                    <Form.Control onChange={getEndStateEmpty} type="number" placeholder="Puste kilometry" />
                  </Form.Group>
                </div>

                <div className="double-form-field">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Początkowy stan licznika </Form.Label>
                    <Form.Control onChange={getStartState} type="number" placeholder="Początkowy stan licznika" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Końcowy stan licznika </Form.Label>
                    <Form.Control onChange={getEndState} type="number" placeholder="Końcowy stan licznika" />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Pokonane km</Form.Label>
                  <Form.Control type="number" placeholder={endState - startState} disabled />
                </Form.Group>

                <div className="double-form-field">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Cena / L</Form.Label>
                    <Form.Control
                      onChange={getFuelPrice}
                      step="0.01"
                      type="number"
                      placeholder="Cena tankowanego paliwa"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Zatankowana ilość</Form.Label>
                    <Form.Control onChange={getFuelAmount} type="number" placeholder="Zatankowana ilość" />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Cena zatankowanego paliwa</Form.Label>
                  <Form.Control type="number" placeholder={fuelPrice * fuelAmount} disabled />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Wykorzystane paliwo</Form.Label>
                  <Form.Control onChange={getFuelUsed} type="number" placeholder="Wykorzystane paliwo" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Uszkodzenia towaru w %</Form.Label>
                  <Form.Control onChange={getStuffDamage} step="0.01" type="number" placeholder="Uszkodzenia towaru" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Uszkodzenia naczepy w %</Form.Label>
                  <Form.Control onChange={getSemiTrailerDamage} step="0.01" type="number" placeholder="Uszkodzenia naczepy" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Uszkodzenia cięzarówki w %</Form.Label>
                  <Form.Control onChange={getTruckDamage} step="0.01" type="number" placeholder="Uszkodzenia cięzarówki" />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>
                    Zdjęcie ukończenia trasy - https://zapodaj.net/
                  </Form.Label>
                  <Form.Control onChange={getPhoto} type="text" placeholder="Zdjęcie ukończenia trasy" />
                </Form.Group>
                <Button variant="success" type="submit">
                  Prześlij
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={closeModal} variant="secondary">
                Zamknij
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div className="modal show" style={{ display: "block", position: "initial" }}>
          <Modal show={modalVisibility}>
            <Modal.Header closeButton onClick={closeModal}>
              <Modal.Title>Dodaj uytkownika</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={(event) => addUser(username, password, event)} className="register-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nazwa uytkownika</Form.Label>
                  <Form.Control onChange={getUsername} type="text" placeholder="Podaj nazwe" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Hasło</Form.Label>
                  <Form.Control onChange={getPassword} type="password" placeholder="Hasło" />
                </Form.Group>
                <Button variant="success" type="submit">
                  Dodaj
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={closeModal} variant="secondary">
                Zamknij
              </Button>
              <AlertInfo show={showMessage} message={message} />
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default ModalForm;
