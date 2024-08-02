import React from "react";
import Alert from "@mui/material/Alert";
import Style from "./AlertComponent.module.css";

const AlertComponent = ({ type, message }) => {
  return (
    <Alert className={Style.alertPosition} severity={type}>
      {message}
    </Alert>
  );
};

export default AlertComponent;
