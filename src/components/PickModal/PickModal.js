import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { destination } from "../../Destination";
import axios from "axios";
import "./PickModal.css";

const PickModal = ({ show, handleClose, setOrders }) => {
  const [pickedCountries, setPickedCountries] = useState([]);

  const handlePick = (e) => {
    if (e.target.checked) {
      for (let i = 0; i < pickedCountries.length; i++) {
        if (pickedCountries[i] == e.target.value) {
          return false;
        }
      }
      setPickedCountries((previousState) => [...previousState, e.target.value]);
    }
    if (!e.target.checked) {
      let arrayToSet = [];
      for (let i = 0; i < pickedCountries.length; i++) {
        if (pickedCountries[i] !== e.target.value) {
          arrayToSet.push(pickedCountries[i]);
        }
      }
      setPickedCountries(arrayToSet);
    }
  };

  return (
    <Modal show={show}>
      <Modal.Header onClick={() => handleClose()} closeButton>
        <Modal.Title>Wybierz max 5 państw</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pick-country-direction">
        {destination.map((item, index) => (
          <label key={index}>
            <input style={{marginRight: "5px"}} type="checkbox" onChange={handlePick} value={item[0]} />
            <span>{item[0]}</span>
          </label>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Zamknij
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setOrders(pickedCountries);
            handleClose();
          }}
        >
          Wybierz kraje
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PickModal;
