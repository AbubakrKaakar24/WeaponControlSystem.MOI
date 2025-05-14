// AddUserModal.js
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";

export default function AddUserModal({
  show,
  onHide,
  onSubmit,
  roleOptions,
  gateOptions,
  formData,
  errors,
  handleChange,
  handleSelectChange,
  header,
}) {
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
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
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
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                isInvalid={!!errors.phoneNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNo}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Label>Role</Form.Label>
              <Select
                name="role"
                value={roleOptions.find((opt) => opt.value === formData.role)}
                onChange={(selected) =>
                  handleSelectChange("role", selected ? selected.value : "")
                }
                options={roleOptions}
              />
              <div className="text-danger">{errors.role}</div>
            </Col>
            <Col md={3}>
              <Form.Label>Gate</Form.Label>
              <Select
                name="gate"
                value={gateOptions.find((opt) => opt.value === formData.gate)}
                onChange={(selected) =>
                  handleSelectChange("gate", selected ? selected.value : "")
                }
                options={gateOptions}
              />
              <div className="text-danger">{errors.gate}</div>
            </Col>
            <Col md={3}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
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
