import React from "react";
import Image from "next/image";
import { useCookies } from "react-cookie";
import Router from "next/router";

const Logout = () => {
  const [, , removeCookie] = useCookies(["user"]);

  const handleLogout = () => {
    removeCookie("user", { path: "/" });
    Router.push("/login");
  };
  return (
    <div
      onClick={handleLogout}
      className="cursor-pointer flex items-center justify-center"
    >
      <Image
        src="/usericon.png"
        alt="Picture of the author"
        width={30}
        height={30}
      />
      <a href="#">Logout</a>
    </div>
  );
};
export default Logout;
