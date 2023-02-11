import React from "react";
import { Dropdown } from "react-bootstrap";

const CustomSelect = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    className="border border-dark rounded p-2 "
    onClick={onClick}
    style={{ userSelect: "none" }}
  >
    <div className="w-100 text-nowrap overflow-hidden text-center">
      {children}
    </div>
  </div>
));

const ButtonDropDown = ({ children }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomSelect}>
        <li className="fa-regular fa-pen-to-square" />
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark" className="px-2">
        {React.Children.toArray(children).map((el, i) => (
          <Dropdown.Item
            key={i}
            className={`bg-${el.props.variant} mx-auto rounded mb-1 fw-semibold text-dark text-center`}
            onClick={el.props.onClick}
          >
            {el.props.children}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ButtonDropDown;
