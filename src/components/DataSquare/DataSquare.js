import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DataSquare = ({ data, iconName, additionalStyle }) => {
  return (
    <div className="info-box" style={{marginLeft: additionalStyle }}>
      <div className="desctiption">
        <p>Przejechane kilometry</p>
        <p>{data}</p>
      </div>
      <FontAwesomeIcon className="icon-style-bigger" icon={iconName} />
    </div>
  );
};

export default DataSquare;
