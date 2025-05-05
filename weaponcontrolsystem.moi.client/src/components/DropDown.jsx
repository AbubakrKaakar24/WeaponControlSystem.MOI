import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const CustomDropdown = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
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
        <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
        <Dropdown.Item eventKey="Another action">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="Something else here">Something else here</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
