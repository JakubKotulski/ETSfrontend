import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalData = ({ show, close, data }) => {
  return (
    <div className="modal show" style={{ display: "block", position: "initial" }}>
      <Modal show={show}>
        <Modal.Header closeButton onClick={() => close()}>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Trasa: {data ? data.way : "brak"}</p>
          <p>Początkowy stan licnzika: {data ? data.startState : "brak"}</p>
          <p>Końcowy stan licnzika: {data ? data.endState : "brak"}</p>
          <p>Odległość w km: {data ? data.distance : "brak"}</p>
          <p>Kupione paliwo: {data ? data.boughtFuel : "brak"}</p>
          <p>Cena paliwa: {data ? data.fuelPrice : "brak"}</p>
          <p>Zuzycie paliwa w litrach : {data ? data.fuelConsumption : "brak"}</p>
          <p>Uszkodzenie cięzarówki: {data ? data.wasteTruck : "brak"}</p>
          <p>Uszkodzenie naczepy: {data ? data.wasteTrailer : "brak"}</p>
          <p>Uszkodzenie ładunku: {data ? data.wasteStuff : "brak"}</p>
          {data ? <img style={{ width: "100%" }} src={data.file}></img> : "brak zdjęcia"}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => close()} variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalData;
