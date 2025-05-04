import React, { useState } from 'react';

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={toggleDropdown}
        style={{ backgroundColor: 'white', color: 'black' }} // Make the button full width
      >
        {props.Name} {/* Access props correctly here */}
      </button>
      {isOpen && (
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Action
          </a>
          <a className="dropdown-item" href="#">
            Another action
          </a>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
