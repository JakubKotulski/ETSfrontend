import Button from "react-bootstrap/Button";

const PickCountries = ({ handleShow, access, countries }) => {
  return (
    <>
      <p className="green-baner">
        Obsługiwane kraje{" "}
        {access.length === 0 ? (
          <Button onClick={() => handleShow()} variant="success">
            Zmień kraje
          </Button>
        ) : (
          <Button variant="danger">Zmień kraje</Button>
        )}
      </p>
      <p className="country-data">
        {countries !== null ? countries.map((item, index) => <span key={index}> {item}, </span>) : null}
      </p>
    </>
  );
};

export default PickCountries;
