import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";

import "./WorkShop.css";

const WorkShop = ({ user, date }) => {
  const [waste, setWaste] = useState(0);
  const [wasteTrailer, setWasteTrailer] = useState(0);
  const [wastePhoto, setWastePhoto] = useState("");

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
      url: "http://localhost:4000/me/waste",
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
      url: "http://localhost:4000/me/insurance",
      headers: {
        Authorization: token,
      },
      data: {
        insuranceMonth: date.getMonth(),
        insuranceDay: date.getDay(),
      },
    }).then((res) => {});
  };

  const sendTechnicalReview = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

    axios({
      method: "PUT",
      url: "http://localhost:4000/me/technicalReview",
      headers: {
        Authorization: token,
      },
      data: {
        technicalReviewMonth: date.getMonth(),
        technicalReviewDay: date.getDay(),
      },
    }).then((res) => {});
  };

  const compareDates = () => {
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
    if (date.getMonth() !== user.insuranceMonth && date.getDay() === user.insuranceDay) {
      axios({
        method: "PUT",
        headers: {
          Authorization: token,
        },
        url: "http://localhost:4000/me/insuranceEnd",
      }).then((res) => {
        window.location.reload();
      });
    }
    if (date.getMonth() !== user.technicalReviewMonth && date.getDay() === user.technicalReviewDay) {
      axios({
        method: "PUT",
        headers: {
          Authorization: token,
        },
        url: "http://localhost:4000/me/technicalReviewEnd",
      }).then((res) => {
        window.location.reload();
      });
    }
  };

  const sendWash = () => {
    console.log("Umyty");
  };

  useEffect(() => {
    if (date !== 0) {
      compareDates();
    }
  }, []);

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
              <Form.Label>Stopień uszkodzenia</Form.Label>
              <Form.Control onChange={getWaste} type="number" placeholder="Sopień uszkodzenia" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Stopień uszkodzenia naczepy</Form.Label>
              <Form.Control onChange={getWasteTrailer} type="number" placeholder="Sopień uszkodzenia" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Link do zdjęcia</Form.Label>
              <Form.Control onChange={getWastePhoto} type="text" placeholder="Link do zdjęcia" />
            </Form.Group>
            {}
          </Form>
        </div>
        <hr className="separator"></hr>
        <div className="option-box">
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
                  window.location.reload();
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
                  window.location.reload();
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
