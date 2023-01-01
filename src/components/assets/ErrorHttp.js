import React from "react";
import gdl from "../assets/img/GDL.png";

const ErrorHttp = ({ code, msg }) => {
  return (
    <div>
      <p className="text-center">
        <span className="bg-danger px-4 py-2 rounded text-white fw-bold">
          {code}
        </span>
      </p>
      <p className="text-center">
        <span className="btn text-danger fw-bold">{msg}</span>
      </p>
      <div style={{ width: "150px" }} className="m-auto">
        <img className="w-100 d-block m-auto " src={gdl} alt="gasdonlalo" />
      </div>
    </div>
  );
};

ErrorHttp.defaultProps = {
  code: 400,
  msg: "Not found",
};

export default ErrorHttp;
