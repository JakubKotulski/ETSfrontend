import "./Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faChartSimple,
  faScrewdriverWrench,
  faIdCard,
  faAward,
  faBoxArchive,
  faToolbox,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../img/tryAgain.png";

const Navbar = ({ isAdmin }) => {
  return (
    <div className="navbar-container">
      <div className="f1">
        <img style={{ width: "100%" }} src={logo}></img>
      </div>
      <hr></hr>
      <div className="driver-section">
        <p>Kierowca</p>
        <Link to={"/myOrders"} className="section-path">
          <FontAwesomeIcon className="icon-style" icon={faTruck} />
          Moje dostawy
        </Link>
        <Link to={"/statistics"} className="section-path">
          <FontAwesomeIcon className="icon-style" icon={faChartSimple} />
          Statystyki
        </Link>
        <Link to={"create_car"} className="section-path">
          <FontAwesomeIcon className="icon-style" icon={faScrewdriverWrench} />
          Kreator Cięzarówki
        </Link>
      </div>
      <div className="company-section">
        <p>Firma</p>
        <a className="section-path">
          <FontAwesomeIcon className="icon-style" icon={faIdCard} />
          Tachograf
        </a>
        <Link to={"/ranking"} className="section-path">
          <FontAwesomeIcon className="icon-style" icon={faAward} />
          Ranking
        </Link>
        <Link to={"/archive"} className="section-path">
          <FontAwesomeIcon className="icon-style" icon={faBoxArchive} />
          Archiwum
        </Link>
        <Link to={"/workshop"} className="section-path">
          <FontAwesomeIcon className="icon-style" icon={faToolbox} />
          Warsztat
        </Link>
        <a className="section-path">
          <FontAwesomeIcon className="icon-style" icon={faCartShopping} />
          Sklep
        </a>

        {isAdmin ? <Link to="/admin">*ADMIN*</Link> : null}
      </div>
    </div>
  );
};

export default Navbar;
