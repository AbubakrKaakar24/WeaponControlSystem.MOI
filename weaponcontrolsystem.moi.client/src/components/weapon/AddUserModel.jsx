// AddUserModal.js
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      direction: isRTL ? "rtl" : "ltr",
    }),
    menu: (provided) => ({
      ...provided,
      direction: isRTL ? "rtl" : "ltr",
      textAlign: isRTL ? "right" : "left",
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: isRTL ? "right" : "left",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: isRTL ? "right" : "left",
    }),
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton dir={isRTL ? "rtl" : "ltr"}>
        <Modal.Title
          className={`mb-4 fw-bold text-primary ${
            isRTL ? "text-end w-100" : ""
          }`}
        >
          {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body dir={isRTL ? "rtl" : "ltr"}>
        <Form noValidate onSubmit={onSubmit}>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Label>{t("First name")}</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                placeholder={t("Enter first name")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>

            <Col md={3}>
              <Form.Label>{t("Last name")}</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                placeholder={t("Enter last name")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>

            <Col md={3}>
              <Form.Label>{t("Phone no")}</Form.Label>
              <Form.Control
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                isInvalid={!!errors.phoneNo}
                placeholder={t("Enter phone number")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNo}
              </Form.Control.Feedback>
            </Col>

            <Col md={3}>
              <Form.Label>{t("Email")}</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder={t("Enter Email")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={3}>
              <Form.Label>{t("Role")}</Form.Label>
              <Select
                name="role"
                value={roleOptions.find((opt) => opt.value === formData.role)}
                onChange={(selected) =>
                  handleSelectChange("role", selected ? selected.value : "")
                }
                options={roleOptions}
                placeholder={t("Select role")}
                styles={customSelectStyles}
              />
              <div className="text-danger">{errors.role}</div>
            </Col>

            <Col md={3}>
              <Form.Label>{t("Gate")}</Form.Label>
              <Select
                name="gate"
                value={gateOptions.find((opt) => opt.value === formData.gate)}
                onChange={(selected) =>
                  handleSelectChange("gate", selected ? selected.value : "")
                }
                options={gateOptions}
                placeholder={t("Select gate")}
                styles={customSelectStyles}
              />
              <div className="text-danger">{errors.gate}</div>
            </Col>

            <Col md={3}>
              <Form.Label>{t("Password")}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                placeholder={t("Enter Password")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Col>

            <Col md={3}>
              <Form.Label>{t("Confirm password")}</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                placeholder={t("Confirm password")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer dir={isRTL ? "rtl" : "ltr"}>
        <Button variant="secondary" onClick={onHide}>
          {t("Cancel")}
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {t("Save")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
