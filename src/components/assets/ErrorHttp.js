import React from "react";

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
    </div>
  );
};

ErrorHttp.defaultProps = {
  code: 400,
  msg: "Not found",
};

export default ErrorHttp;
