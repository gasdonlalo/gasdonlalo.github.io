import React from "react";

const InputChangeYear = ({ handle, name, defaultYear }) => {
  let numYears = Math.round(
    (Date.now() - new Date("2021-01-01").getTime()) / 3.154e10
  );

  let years = [];

  for (let i = 0; i < numYears; i++) {
    years.push(2022 + i);
  }

  return (
    <select
      className="form-select form-select"
      aria-label=".form-select-lg example"
      defaultValue={defaultYear}
      onChange={handle}
      name={name}
      required
    >
      {years.map((el) => (
        <option value={el} key={el}>
          {el}
        </option>
      ))}
    </select>
  );
};

InputChangeYear.defaulProps = {
  name: "year",
  defaultYear: "2022",
};

export default InputChangeYear;
