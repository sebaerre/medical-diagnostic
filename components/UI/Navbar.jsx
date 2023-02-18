import React from "react";
import { useCookies } from "react-cookie";

const Navbar = ({ children }) => {
  const [cookies] = useCookies(["user"]);
  if (cookies.user?.email) {
    return (
      <nav className="navbar flex text-white items-center justify-end gap-12 bg-neonblue border-gray px-2 sm:px-4 py-2.5">
        {children}
      </nav>
    );
  } else return null;
};

export default Navbar;
