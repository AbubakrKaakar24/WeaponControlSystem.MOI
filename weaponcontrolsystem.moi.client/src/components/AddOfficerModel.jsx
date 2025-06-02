// AddUserModal.js
import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useTranslation } from "react-i18next";

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
              <Form.Control
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                placeholder={t("First name")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                placeholder={t("Last name")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="badgeNo"
                value={badgeNo}
                onChange={handleChange}
                isInvalid={!!errors.badgeNo}
                placeholder={t("Badge no")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.badgeNo}
              </Form.Control.Feedback>
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="phoneNo"
                value={phoneNo}
                onChange={handleChange}
                isInvalid={!!errors.phoneNo}
                placeholder={t("Phone no")}
                style={{ textAlign: isRTL ? "right" : "left" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNo}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
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
                placeholder={t("Select deputy ministry")}
                styles={customSelectStyles}
              />
              <div className="text-danger">{errors.deputyMinistry}</div>
            </Col>
            <Col md={3}>
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
                placeholder={t("Select directorate")}
                styles={customSelectStyles}
              />
              <div className="text-danger">{errors.directorate}</div>
            </Col>
            <Col md={3}>
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
                placeholder={t("Select administration")}
                styles={customSelectStyles}
              />
              <div className="text-danger">{errors.administration}</div>
            </Col>
            <Col md={3}>
              <Select
                name="base"
                value={baseOptions.find((opt) => opt.value === base)}
                onChange={(selected) =>
                  handleSelectChange("base", selected ? selected.value : "")
                }
                options={baseOptions}
                placeholder={t("Select base")}
                styles={customSelectStyles}
              />
              <div className="text-danger">{errors.base}</div>
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
