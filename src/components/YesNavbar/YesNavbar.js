import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

const YesNavbar = ({ isAdmin, adminUsername }) => {
  return (
    <>
      <Navbar isAdmin={isAdmin} adminUsername={adminUsername} />
      <Outlet />
    </>
  );
};

export default YesNavbar;
