import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const CustomDropdown = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
    if (props.onChange) {
      props.onChange(props.name,eventKey); // Call the OnChange function with the selected item
    }
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle
        variant="light"
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        {selectedItem || props.Name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Taminat">Action</Dropdown.Item>
        <Dropdown.Item eventKey="Production">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="Something else here">Something else here</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
