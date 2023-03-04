import Alert from "react-bootstrap/Alert";

const AlertInfo = ({ message, show }) => {
  return (
    <>
      <Alert show={show} className="alert-info" variant="info">
        {message}
      </Alert>
    </>
  );
};

export default AlertInfo;
