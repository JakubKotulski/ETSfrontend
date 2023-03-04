import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./RejectedOrders.css";
import { useState } from "react";
import ModalForm from "../ModalForm/ModalForm";

const RejectedOrders = ({ data }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const closeModal = () => {
    setModalVisibility(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <tbody>
          {data
            .filter((item) => item.accepted === "rejected")
            .map((order, index) => (
              <tr key={index}>
                <td className="justify-table">{index + 1}</td>
                <td className="justify-table">{order.way}</td>
                <td className="justify-table">
                  {order.accepted === "rejected" ? (
                    <Button
                      onClick={() => {
                        setModalVisibility(true);
                        setSelectedOrder(order);
                      }}
                      variant="success"
                    >
                      Podsumuj
                    </Button>
                  ) : (
                    <Button variant="danger">Podsumuj</Button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {modalVisibility && (
        <ModalForm order={true} closeModal={closeModal} modalVisibility={modalVisibility} track={selectedOrder} />
      )}
    </>
  );
};

export default RejectedOrders;
