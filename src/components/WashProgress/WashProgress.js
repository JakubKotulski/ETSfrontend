import ProgressBar from "react-bootstrap/ProgressBar";

const WashProgress = ({ distance }) => {
  return (
    <div className="description">
      <ProgressBar className="progress-changed" variant="success" animated now={(distance * 100) / 10000} />
      <p>Zabrudzenie: {Math.round((distance * 100) / 10000)}%</p>
    </div>
  );
};

export default WashProgress;
