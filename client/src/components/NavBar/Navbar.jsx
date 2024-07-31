import React from "react";
import Style from "./Navbar.module.css";
import logo from "../../assets/Wallet-logo.png";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img src={logo} alt="logo" height={40} width={180} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
