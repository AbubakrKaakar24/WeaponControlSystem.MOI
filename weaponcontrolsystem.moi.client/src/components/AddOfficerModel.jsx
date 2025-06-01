// AddUserModal.js
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";

export default function AddOfficerModal({
  show,
  onHide,
  onSubmit,
  firstName,
  lastName,
  badgeNo,
  deputyMinistry,
  directorate,
  administration,
  base,
  deputyOptions,
  directorateOptions,
  administrationOptions,
  baseOptions,
  errors,
  handleChange,
  handleSelectChange,
  header,
  phoneNo,
}) {
  console.log({
    badgeNo,
    deputyMinistry,
    directorate,
    administration,
    base,
  });
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="mb-4 fw-bold text-primary">
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={onSubmit}>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                placeholder="First Name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                placeholder="Last Name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Label>Badge No</Form.Label>
              <Form.Control
                type="text"
                name="badgeNo"
                value={badgeNo}
                onChange={handleChange}
                isInvalid={!!errors.badgeNo}
                placeholder="Badge No"
              />
              <Form.Control.Feedback type="invalid">
                {errors.badgeNo}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="text"
                name="phoneNo"
                value={phoneNo}
                onChange={handleChange}
                isInvalid={!!errors.phoneNo}
                placeholder="Phone No"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNo}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Label>Deputy Ministry</Form.Label>
              <Select
                name="deputyMinistry"
                value={deputyOptions.find(
                  (opt) => opt.value === deputyMinistry
                )}
                onChange={(selected) =>
                  handleSelectChange(
                    "deputyMinistry",
                    selected ? selected.value : ""
                  )
                }
                options={deputyOptions}
              />
              <div className="text-danger">{errors.deputyMinistry}</div>
            </Col>
            <Col md={3}>
              <Form.Label>Directorate</Form.Label>
              <Select
                name="directorate"
                value={directorateOptions.find(
                  (opt) => opt.value === directorate
                )}
                onChange={(selected) =>
                  handleSelectChange(
                    "directorate",
                    selected ? selected.value : ""
                  )
                }
                options={directorateOptions}
              />
              <div className="text-danger">{errors.directorate}</div>
            </Col>
            <Col md={3}>
              <Form.Label>Administration</Form.Label>
              <Select
                name="administration"
                value={administrationOptions.find(
                  (opt) => opt.value === administration
                )}
                onChange={(selected) =>
                  handleSelectChange(
                    "administration",
                    selected ? selected.value : ""
                  )
                }
                options={administrationOptions}
              />
              <div className="text-danger">{errors.administration}</div>
            </Col>
            <Col md={3}>
              <Form.Label>Base</Form.Label>
              <Select
                name="base"
                value={baseOptions.find((opt) => opt.value === base)}
                onChange={(selected) =>
                  handleSelectChange("base", selected ? selected.value : "")
                }
                options={baseOptions}
              />
              <div className="text-danger">{errors.base}</div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
