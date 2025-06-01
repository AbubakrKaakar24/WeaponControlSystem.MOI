// AddUserModal.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import weaponData from "../assets/weaponData.json";
import persian from "react-date-object/calendars/persian";
import persian_fa from "../assets/persian_fa";
import DatePicker from "react-multi-date-picker";
import Swal from "sweetalert2"; // Make sure you import this
import TimePicker from "react-multi-date-picker/plugins/time_picker"; // Not used in UI
import DateObject from "react-date-object";
import { set } from "date-fns";
export default function WeaponModel({ show, onHide, id, fetchWeapons }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [OfficerID, setOfficerID] = useState("");
  const [errors, setErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [names, setNames] = useState([]);
  useEffect(() => {
    const names = weaponData.weaponTypes
      .map((weaponType) => weaponType.weapons)
      .flat();
    const types = weaponData.weaponTypes.map((weaponType) => weaponType.type);
    // const timeString = "11:12:43";
    // const timeObject = new DateObject({ format: "hh:mm:ss", date: timeString });
    // setInTime(timeObject);
    // console.log("In Time inside Modal: " + inTime);
    // if (weapon) {
    //   setName(weapon.name || "");
    //   setType(weapon.type || "");
    //   setCardNo(weapon.cardNo || "");
    //   setInDate(weapon.inDate || "");
    //   setOfficerBadgeNo(weapon.officerBadgeNo);
    // }
    setNames(names);
    setTypes(types);
    setOfficerID(id);
  }, []);
  const handleDropdownChange = (name, value) => {
    if (name === "type") {
      const selectedType = weaponData.weaponTypes.find((w) => w.type === value);
      // Check if selectedType is found, then use its weapons array, otherwise fallback to previous state
      const names = selectedType ? selectedType.weapons : [];

      setType(selectedType.type);
      setNames(names);
    } else if (name === "name") {
      setName(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const temperrors = {};
    if (!name) temperrors.name = "Name is required";
    if (!type) temperrors.type = "Type is required";
    if (!serialNo) temperrors.serialNo = "Card number is required";

    if (Object.keys(temperrors).length > 0) {
      setErrors(temperrors);
      return;
    }

    // let inDateObj = inDate?.toDate?.() || new Date();

    const weaponPayload = {
      Name: name,
      Type: type,
      // InDate: inDateObj.toISOString() || new Date().toISOString(),
      // OutDate: null,
      // OfficerBadgeNo: officerBadgeNo,
      // CardNo: cardNo,
      SerialNo: serialNo,
      OfficerID: OfficerID,
    };

    try {
      const response = await fetch("https://localhost:7211/api/weapon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(weaponPayload),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Weapon Added",
          text: "The weapon has been Added successfully!",
          timer: 3000,
        });
        fetchWeapons(); // Assuming you have a function to refresh the weapon list
        // Reset form
        setName("");
        setType("");
        // setInDate("");
        // setInTime("");
        // setOfficerBadgeNo("");
        // setCardNo("");
        setSerialNo("");
        setErrors({});
        onHide();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error adding the weapon.",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        timer: 3000,
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="mb-4 fw-bold text-primary">
          Add Weapon
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Col md={4}>
              <Form.Label>Type</Form.Label>
              <Select
                name="type"
                options={types.map((t) => ({ value: t, label: t }))}
                value={type ? { value: type, label: type } : null}
                onChange={(selectedOption) =>
                  handleDropdownChange("type", selectedOption.value)
                }
                placeholder="Select Type"
              />
              <div className="text-danger">{errors.type}</div>
            </Col>
            <Col md={4}>
              <Form.Label>Name</Form.Label>
              <Select
                name="name"
                options={names.map((n) => ({ value: n, label: n }))}
                value={name ? { value: name, label: name } : null}
                onChange={(selectedOption) =>
                  handleDropdownChange("name", selectedOption.value)
                }
                placeholder="Select Name"
              />
              <div className="text-danger">{errors.name}</div>
            </Col>
            <Col md={4}>
              <Form.Label>Serial No</Form.Label>
              <Form.Control
                type="text"
                name="cardNo"
                value={serialNo}
                onChange={(value) => setSerialNo(value.target.value)}
                isInvalid={!!errors.serialNo}
                placeholder="Enter Serial No"
              />
              <Form.Control.Feedback type="invalid">
                {errors.serialNo}
              </Form.Control.Feedback>
            </Col>
            {/* <Col md={4}>
              <Form.Label>In Date</Form.Label>
              <DatePicker
                value={inDate}
                onChange={(value) => {
                  console.log("VAlue: " + value.toString);
                  setInDate(value);
                }}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-left"
                placeholder="Select In Date"
                format="YYYY/MM/DD hh:mm:ss"
                plugins={[<TimePicker position="bottom" />]}
                style={{
                  width: "115%",
                  backgroundColor: "#fff",
                  height: "38px",
                  color: "black",
                  border: "1px solid #ced4da",
                  borderRadius: "0.375rem",
                  padding: "0.375rem 0.75rem",
                  fontSize: "1rem",
                }}
              />

              <div className="text-danger">{errors.inDate}</div>
            </Col> */}
          </Row>

          {/* <Row className="mb-2">
            <Col md={4}>
              <Form.Label>Officer Badge No</Form.Label>
              <Form.Control
                type="text"
                name="officerBadgeNo"
                value={officerBadgeNo}
                onChange={handleInputChange}
                isInvalid={!!errors.officerBadgeNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.officerBadgeNo}
              </Form.Control.Feedback>
            </Col>
            <Col md={4}>
              <Form.Label>Card No</Form.Label>
              <Form.Control
                type="text"
                name="cardNo"
                value={cardNo}
                onChange={handleInputChange}
                isInvalid={!!errors.cardNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNo}
              </Form.Control.Feedback>
            </Col>
          </Row> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
