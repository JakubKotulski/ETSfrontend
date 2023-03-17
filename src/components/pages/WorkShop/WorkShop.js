import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { backendUrl } from "../../../config";
import WashProgress from "../../WashProgress/WashProgress";
import axios from "axios";
import "./WorkShop.css";

const WorkShop = ({ user, date }) => {
  const [waste, setWaste] = useState(0);
  const [wasteTrailer, setWasteTrailer] = useState(0);
  const [wastePhoto, setWastePhoto] = useState("");
  const [wash, setWash] = useState(0);

  const getWaste = (e) => {
    setWaste(e.target.value);
  };

  const getWasteTrailer = (e) => {
    setWasteTrailer(e.target.value);
  };

  const getWastePhoto = (e) => {
    setWastePhoto(e.target.value);
  };

  const sendWaste = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

    axios({
      method: "PUT",
      url: `${backendUrl}/me/waste`,
      data: {
        waste: waste,
        wasteTrailer: wasteTrailer,
        wastePhoto: wastePhoto,
      },
      headers: {
        Authorization: token,
      },
    }).then((res) => {});
  };

  const sendInsurance = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

    axios({
      method: "PUT",
      url: `${backendUrl}/me/insurance`,
      headers: {
        Authorization: token,
      },
      data: {
        insuranceMonth: date.getMonth(),
        insuranceDay: date.getDate(),
      },
    }).then((res) => {
      window.location.reload();
    });
  };

  const sendTechnicalReview = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

    axios({
      method: "PUT",
      url: `${backendUrl}/me/technicalReview`,
      headers: {
        Authorization: token,
      },
      data: {
        technicalReviewMonth: date.getMonth(),
        technicalReviewDay: date.getDate(),
      },
    }).then((res) => {
      window.location.reload();
    });
  };

  const compareDates = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
    if (date.getMonth() !== user.insuranceMonth && date.getDate() === user.insuranceDay) {
      axios({
        method: "PUT",
        headers: {
          Authorization: token,
        },
        url: `${backendUrl}/me/insuranceEnd`,
      }).then((res) => {
        window.location.reload();
      });
    }
    if (date.getMonth() !== user.technicalReviewMonth && date.getDate() === user.technicalReviewDay) {
      axios({
        method: "PUT",
        headers: {
          Authorization: token,
        },
        url: `${backendUrl}/me/technicalReviewEnd`,
      }).then((res) => {
        window.location.reload();
      });
    }
  };

  const getWash = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
    axios({
      method: "GET",
      url: `${backendUrl}/me/wash`,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      setWash(res.data.distance);
    });
  };

  const sendWash = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
    axios({
      method: "PUT",
      url: `${backendUrl}/me/wash`,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      window.location.reload();
    });
  };

  useEffect(() => {
    if (date !== 0) {
      compareDates();
    }
    getWash();
  });

  return (
    <div className="workshop-container">
      <div className="level">
        <div className="option-box">
          <Form
            onSubmit={() => {
              sendWaste();
            }}
            style={{ textAlign: "center" }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Stopień uszkodzenia pojazdu</Form.Label>
              <Form.Control onChange={getWaste} type="number" placeholder="Stopień uszkodzenia pojazdu" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Stopień uszkodzenia naczepy</Form.Label>
              <Form.Control onChange={getWasteTrailer} type="number" placeholder="Stopień uszkodzenia naczepy" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{color: "black"}}>Link do zdjęcia - https://zapodaj.net/</Form.Label>
              <Form.Control onChange={getWastePhoto} type="text" placeholder="Link do zdjęcia" />
            </Form.Group>
            <Button type="submit" variant="outline-dark">
              Zatwierdź
            </Button>
          </Form>
        </div>
        <hr className="separator"></hr>
        <div className="option-box">
          <WashProgress distance={wash} />
          <Button onClick={() => sendWash()} variant="outline-dark">
            Myjnia
          </Button>
        </div>
        <hr className="separator"></hr>
        <div className="option-box">
          {!user.insurance ? (
            <>
              <p>Nie wykonano</p>
              <Button
                onClick={() => {
                  sendInsurance();
                }}
                variant="outline-dark"
              >
                Ubezpieczenie
              </Button>
            </>
          ) : (
            <>
              <p>Wykonano</p>
              <Button variant="outline-danger">Ubezpieczenie</Button>
            </>
          )}
        </div>
        <hr className="separator"></hr>
        <div className="option-box">
          {!user.technicalReview ? (
            <>
              <p>Nie wykonano</p>
              <Button
                onClick={() => {
                  sendTechnicalReview();
                }}
                variant="outline-dark"
              >
                Przegląd
              </Button>
            </>
          ) : (
            <>
              <p>Wykonano</p>
              <Button variant="outline-danger">Przegląd</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkShop;
