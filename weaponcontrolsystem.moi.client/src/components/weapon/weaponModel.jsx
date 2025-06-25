// AddUserModal.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import weaponData from "../../assets/weaponData.json";
import Swal from "sweetalert2"; // Make sure you import this
import { useTranslation } from "react-i18next";
export default function WeaponModel({ show, onHide, id, fetchWeapons }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [OfficerID, setOfficerID] = useState("");
  const [errors, setErrors] = useState({});
  const [types, setTypes] = useState([]);
  const [names, setNames] = useState([]);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  useEffect(() => {
    const names = weaponData.weaponTypes
      .map((weaponType) => weaponType.weapons)
      .flat();
    const types = weaponData.weaponTypes.map((weaponType) => weaponType.type);
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
          title: t("Weapon Added"),
          text: t("The weapon has been Added successfully!"),
          confirmButtonText: t("Ok"),
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
          title: t("Error"),
          text: t("There was an error adding the weapon."),
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("Error"),
        text: error.message,
        timer: 3000,
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="mb-4 fw-bold text-primary">
          {t("Add Weapon")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body dir={isRTL ? "rtl" : "ltr"}>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("Weapon type")}</Form.Label>
                <Select
                  name="type"
                  options={types.map((t) => ({ value: t, label: t }))}
                  value={type ? { value: type, label: type } : null}
                  onChange={(selectedOption) =>
                    handleDropdownChange("type", selectedOption.value)
                  }
                  placeholder={t("Select type")}
                />
                <div className="text-danger">{errors.type}</div>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("Weapon name")}</Form.Label>
                <Select
                  name="name"
                  options={names.map((n) => ({ value: n, label: n }))}
                  value={name ? { value: name, label: name } : null}
                  onChange={(selectedOption) =>
                    handleDropdownChange("name", selectedOption.value)
                  }
                  placeholder={t("Select name")}
                />
                <div className="text-danger">{errors.name}</div>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="serialNo">
                <Form.Label>{t("Serial no")}</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNo"
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  isInvalid={!!errors.serialNo}
                  placeholder={t("Enter serial no")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.serialNo}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer dir={isRTL ? "rtl" : "ltr"}>
        <Button variant="secondary" onClick={onHide}>
          {t("Cancel")}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {t("Submit")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
