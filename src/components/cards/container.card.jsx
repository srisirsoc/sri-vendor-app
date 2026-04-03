import React from "react";
import "./container.card.css"; // We'll define responsive styles here

const Container = ({ children, className = "", fluid = false }) => {
  return (
    <div className={`container ${fluid ? "fluid" : ""} ${className}`}>
      {children}
    </div>
  );
};
export default Container;
