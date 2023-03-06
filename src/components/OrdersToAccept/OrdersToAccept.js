import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ModalData from "../ModalData/ModalData";
import { backendUrl } from "../../config";

const OrdersToAccept = ({ orders }) => {
  const [modalDataVisibility, setModalDataVisibility] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleClose = () => setModalDataVisibility(false);
  const handleShow = () => setModalDataVisibility(true);
  const handleData = (data) => setSelectedData(data);


  const acceptOrder = (_id, userID, distance) => {
    axios({
      method: "PUT",
      url: `${backendUrl}/order/accept`,
      data: {
        _id: _id,
        userID: userID,
        distance: distance,
      },
    }).then((res) => {
      window.location.reload();
    });
  };

  const rejectOrder = (_id, userID) => {
    axios({
      method: "PUT",
      url: `${backendUrl}/order/reject`,
      data: {
        _id: _id,
        userID: userID,
      },
    }).then((res) => {
      window.location.reload();
    });
  };

  return (
    <>
      <Table className="text-align" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Szczegóły</th>
            <th>Status zlecenia</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((element) => element.accepted === "pending")
            .map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Button
                    variant="outline-info"
                    onClick={() => {
                      handleData(item);
                      handleShow();
                      console.log(item);
                    }}
                  >
                    Szczegóły
                  </Button>
                </td>
                <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Button onClick={() => acceptOrder(item._id, item.userID, item.distance)} variant="outline-success">
                    Akceptuj
                  </Button>
                  <Button onClick={() => rejectOrder(item._id, item.userID)} variant="outline-danger">
                    Odrzuć
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ModalData show={modalDataVisibility} close={handleClose} open={handleShow} data={selectedData} />
    </>
  );
};

export default OrdersToAccept;
