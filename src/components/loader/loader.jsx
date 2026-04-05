import React from "react";
import "./style.css";

const Loader = ({ height = "70vh" }) => {
  return (
    <div className="loader-container" style={{ minHeight: height }}>
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;