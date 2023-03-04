import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProgressInfo = ({ iconName, distance, maxValue, percent }) => {
  return (
    <div className="length-of-road">
      <FontAwesomeIcon className="icon-style-bigger" icon={iconName} />
      <div className="description">
        <p>Progres ukończenia normy miesięcznej</p>
        <h6>
          {distance} km / {maxValue} km
        </h6>
        <ProgressBar className="progress-changed" variant="success" animated now={distance * 100 /12000} />
        <p>ukończono: {Math.round(distance * 100 /12000)}%</p>
      </div>
    </div>
  );
};

export default ProgressInfo;
