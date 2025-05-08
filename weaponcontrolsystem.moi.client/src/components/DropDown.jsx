import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const CustomDropdown = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
    if (props.onChange) {
      props.onChange(props.name, eventKey); // Call the OnChange function with the selected item
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="light"
        style={{ backgroundColor: "white", color: "black" }}
      >
        {selectedItem || props.Name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.options &&
          props.options.map((item, index) => (
            <Dropdown.Item key={index} eventKey={item}>
              {item}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
