import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { FaSearch, FaClipboardList } from "react-icons/fa";
import StatCard from "./StatsCard";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function Home() {
  const [phoneNo, setphoneNo] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [pendingWeaponsCount, setPendingWeaponsCount] = useState(0);
  const [officerName, setOfficerName] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    pendingWeapons();
    document.body.style.backgroundImage = `
      linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      url('/moi.jpg')
    `;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, [pendingWeaponsCount]);

  const searchOfficer = async () => {
    if (phoneNo.trim() !== "") {
      const response = await fetch(
        `https://localhost:7211/api/officer/by-Phone/${phoneNo}`
      );
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: t("Error"),
          text: t("Officer not found"),
          confirmButtonText: t("Ok"),
          timer: 3000,
        });
        return;
      }
      const data = await response.json();
      if (data) {
        navigate("/weapon", { state: { officer: data } });
      }
      setphoneNo("");
    } else {
      Swal.fire({
        icon: "error",
        title: t("Error"),
        text: t("Please enter a valid phone number"),
        confirmButtonText: t("Ok"),
        timer: 3000,
      });
    }
  };

  const checkoutWeapon = async () => {
    if (cardNo.trim() !== "") {
      const cardData = await fetch(`https://localhost:7211/api/card/${cardNo}`);
      if (!cardData.ok) {
        Swal.fire({
          icon: "error",
          title: t("Error"),
          text: t("Card not found"),
          confirmButtonText: t("Ok"),
          timer: 3000,
        });
        return;
      }
      const card = await cardData.json();

      const weaponResponse = await fetch(`https://localhost:7211/api/weapon`);
      const weapons = await weaponResponse.json();

      const Ids = card.weaponsid;
      const updatedWeapons = weapons
        .filter((weapon) => Ids.includes(weapon.id))
        .map((weapon) => ({
          ...weapon,
          in: false,
        }));

      let a = 0;
      for (const weapon of updatedWeapons) {
        if (a === 0) {
          const officerData = await fetch(
            `https://localhost:7211/api/officer/by-id/${weapon.officerID}`
          );
          const officer = await officerData.json();
          setOfficerName(officer.name);
          a++;
        }

        await fetch(`https://localhost:7211/api/weapon/${weapon.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(weapon),
        });

        const res = await fetch(`https://localhost:7211/api/weaponHandover`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: weapon.name,
            Type: weapon.type,
            SerialNo: weapon.serialNo,
            InDate: card.issueDate,
            OutDate: new Date().toISOString(),
            OfficerName: officerName,
            InBy: "Admin",
          }),
        });
      }

      const response = await fetch(
        `https://localhost:7211/api/card/${cardNo}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: t("Checkout Successful"),
          timer: 3000,
          timerProgressBar: true,
          confirmButtonText: t("Ok"),
        });
        setCardNo("");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: t("Error"),
        text: t("Please enter a valid card number"),
        confirmButtonText: t("Ok"),
        timer: 3000,
      });
    }

    pendingWeapons();
  };

  const pendingWeapons = async () => {
    const response = await fetch("https://localhost:7211/api/weapon/count");
    const data = await response.json();
    setPendingWeaponsCount(data);
  };

  return (
    <div style={{ direction: "rtl", textAlign: "right" }}>
      <Navbar />
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          {/* Find Officer Card */}
          <div className="col-md-3 d-flex">
            <div className="card shadow-lg rounded-3 w-100 h-100 d-flex flex-column bg-success bg-gradient text-white">
              <div className="card-body d-flex flex-column">
                <input
                  type="search"
                  placeholder={t("Search Officer") + "🔍"}
                  className="form-control shadow-sm rounded-pill mb-3 text-dark"
                  value={phoneNo}
                  onChange={(e) => setphoneNo(e.target.value)}
                />
                <div className="mt-auto">
                  <button
                    className="btn btn-outline-light rounded-pill w-100 fw-bold"
                    onClick={searchOfficer}
                  >
                    {t("Search")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Weapon's Card */}
          <div className="col-md-3 d-flex">
            <div className="card shadow-lg rounded-3 w-100 h-100 d-flex flex-column bg-success bg-gradient text-white">
              <div className="card-body d-flex flex-column">
                <input
                  type="search"
                  placeholder={t("Search Card") + "🔍"}
                  className="form-control shadow-sm rounded-pill mb-3 text-dark"
                  value={cardNo}
                  onChange={(e) => setCardNo(e.target.value)}
                />
                <div className="mt-auto">
                  <button
                    className="btn btn-outline-light rounded-pill w-100 fw-bold"
                    onClick={checkoutWeapon}
                  >
                    {t("Checkout")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Weapons Stat Card */}
          <div className="col-md-3">
            <div className="card shadow-lg border-0 rounded-3 hover-effect bg-secondary bg-gradient">
              <div className="card-body text-center p-4">
                <div className="icon-container bg-white-20 d-inline-flex rounded-circle p-3 mb-3">
                  <FaClipboardList className="fs-2 text-white" />
                </div>
                <h6 className="text-uppercase text-white letter-spacing-1 mb-2">
                  {t("Pending Weapons")}
                </h6>
                <h1 className="text-white mb-0">{pendingWeaponsCount}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
