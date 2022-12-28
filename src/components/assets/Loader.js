import React from "react";

const Loader = ({ size }) => {
  return (
    <div className="text-center">
      <div
        className="spinner-border"
        style={{ width: size, height: size, borderWidth: "0.4rem" }}
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

Loader.defaultProps = {
  size: "5rem",
};

export default Loader;
