import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const YesNavbar = ({isAdmin}) => {
  return (
    <>
      <Navbar isAdmin={isAdmin}/>
      <Outlet />
    </>
  );
};

export default YesNavbar;
