// AddUserModal.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import persian from "react-date-object/calendars/persian";
import persian_fa from "../../assets/persian_fa";
import DatePicker from "react-multi-date-picker";
const { t, i18n } = useTranslation();
import Swal from "sweetalert2"; // Make sure you import this
import TimePicker from "react-multi-date-picker/plugins/time_picker"; // Not used in UI
export default function WeaponCheckoutModel({
  show,
  onHide,
  weapon,
  fetchWeapons,
}) {
  const [cardNo, setCardNo] = useState("");
  const [errors, setErrors] = useState({});
  const [outDate, setOutDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const temperrors = {};

    if (!cardNo) temperrors.cardNo = "Card number is required";
    if (!outDate) temperrors.outDate = "Out Date is required";

    if (Object.keys(temperrors).length > 0) {
      setErrors(temperrors);
      return;
    }

    if (cardNo === weapon.cardNo) {
      let outDateObj = outDate?.toDate?.();
      const { inDate } = weapon;

      console.log("type of indate: " + inDate);
      const weaponPayload = {
        Name: weapon.name,
        Type: weapon.type,
        InDate: inDate,
        OutDate: outDateObj.toISOString(),
        OfficerBadgeNo: weapon.officerBadgeNo,
      };
      console.log(JSON.stringify(weaponPayload));
      try {
        const response = await fetch(
          "https://localhost:7211/api/weaponHandover",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(weaponPayload),
          }
        );

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Weapon's Checkout completed!",
            text: "The weapon has been check out successfully!",
            timer: 3000,
          });
          setCardNo("");
          setOutDate("");
          const response = await fetch(
            `https://localhost:7211/api/weapon/${weapon.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          fetchWeapons();
          onHide();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was an error checking out the weapon.",
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "there is no weapon with this Card No",
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="mb-4 fw-bold text-primary">
          {t("Checkout Weapon")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body dir={isRTL ? "rtl" : "ltr"}>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("Out Date")}</Form.Label>
                <DatePicker
                  value={outDate}
                  onChange={(value) => setOutDate(value)}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-left"
                  placeholder={t("Select Out Date")}
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
                <div className="text-danger">{errors.outDate}</div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t("Card No")}</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNo"
                  value={cardNo}
                  onChange={(e) => setCardNo(e.target.value)}
                  isInvalid={!!errors.cardNo}
                  placeholder={t("Enter Card No")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardNo}
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
