import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const ModalData = ({ show, close, data, user }) => {

  return (
    <div className="modal show" style={{ display: "block", position: "initial" }}>
      <Modal show={show}>
        <Modal.Header closeButton onClick={() => close()}>
          <Modal.Title>{user}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Trasa: {data ? data.way : "brak"}</p>
          <p>Początkowy stan licznika: {data ? data.startState : "brak"}</p>
          <p>Końcowy stan licznika: {data ? data.endState : "brak"}</p>
          <p>Początkowy stan licznika - puste km: {data ? data.startStateEmpty : "brak"}</p>
          <p>Końcowy stan licznika - puste km: {data ? data.endStateEmpty : "brak"}</p>
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
