import React, { use, useState } from "react";
import Navbar from "./Navbar";
import { FaSearch, FaClipboardList, FaIdCard } from "react-icons/fa";
import StatCard from "./StatsCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//import { fa } from "jalaali-react-date-picker/lib/core/constants/translations";
function Home() {
  const [phoneNo, setphoneNo] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [pendingWeaponsCount, setPendingWeaponsCount] = useState(0);
  const [officerName, setOfficerName] = useState("");
  useEffect(() => {
    // Set body background image when component mounts
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
  const navigate = useNavigate();
  const searchOfficer = async () => {
    if (phoneNo.trim() !== "") {
      var response = await fetch(
        `https://localhost:7211/api/officer/by-Phone/${phoneNo}`
      );
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Officer with phone number ${phoneNo} not found.`,
          timer: 3000,
        });
        return;
      }
      var data = await response.json();
      console.log(data);
      if (data) {
        navigate("/weapon", {
          state: {
            officer: data.id,
          },
        });
      } else {
        alert("Officer not found");
      }
      // Reset the input field
      setphoneNo("");
    }
  };
  const checkoutWeapon = async () => {
    console.log("Card No: " + cardNo);
    if (cardNo.trim() !== "") {
      const cardData = await fetch(`https://localhost:7211/api/card/${cardNo}`);
      if (!cardData.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Card with number ${cardNo} not found.`,
          timer: 3000,
        });
        return;
      } else if (cardData.ok) {
        Swal.fire({
          icon: "success",
          title: "Card Found",
          text: `Card with number ${cardNo} found.`,
          timer: 3000,
        });
      }
      const card = await cardData.json();

      const weaponResponse = await fetch(`https://localhost:7211/api/weapon`);
      const weapons = await weaponResponse.json();
      var Ids = card.weaponsid;
      console.log("Ids: " + Ids);
      weapons.forEach((weapon) => {
        if (Ids.includes(weapon.id)) {
          weapon.in = false;
        }
      });

      const updatedWeapons = weapons
        .filter((weapon) => Ids.includes(weapon.id))
        .map((weapon) => ({
          id: weapon.id,
          name: weapon.name,
          type: weapon.type,
          serialNo: weapon.serialNo,
          officerId: weapon.officerID,
          in: false,
        }));

      var a = 0;
      for (const weapon of updatedWeapons) {
        if (a == 0) {
          var officerData = await fetch(
            `https://localhost:7211/api/officer/by-id/${weapon.officerId}`
          );
          var officer = await officerData.json();
          setOfficerName(officer.name);
          a++;
        }
        await fetch(`https://localhost:7211/api/weapon/${weapon.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(weapon),
        });
        var res = await fetch(`https://localhost:7211/api/weaponHandover`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: weapon.name,
            Type: weapon.type,
            SerialNo: weapon.serialNo,
            InDate: card.issueDate,
            OutDate: new Date().toISOString(),
            OfficerName: officerName, // Placeholder, replace with actual officer name if available
            InBy: "Admin", // Placeholder, replace with actual user name if available
          }),
        });
        if (!res.ok) {
          alert("Failed to update weapon: " + weapon.id);
          return;
        }
      }
      a = 0;

      const response = await fetch(
        `https://localhost:7211/api/card/${cardNo}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Checkout Successful",
          text: `Weapons checked out successfully for ${officerName}.`,
          timer: 3000,
        });
        setCardNo("");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a valid card number.",
        timer: 3000,
      });
    }
    pendingWeapons();
  };
  const pendingWeapons = async () => {
    const response = await fetch("https://localhost:7211/api/weapon/count");
    var data = await response.json();
    setPendingWeaponsCount(data);
  };
  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          {/* Find Officer Card */}
          <div className="col-md-3 d-flex">
            <div className="card shadow-lg rounded-3 w-100 h-100 d-flex flex-column bg-success bg-gradient text-white">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <FaSearch className="me-2" />
                  Find Officer
                </h5>
                <input
                  type="search"
                  placeholder="🔍 Search Officer"
                  className="form-control shadow-sm rounded-pill mb-3 text-dark"
                  value={phoneNo}
                  onChange={(e) => setphoneNo(e.target.value)}
                />
                <div className="mt-auto">
                  <button
                    className="btn btn-outline-light rounded-pill w-100 fw-bold"
                    onClick={searchOfficer}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Checkout Weapon's Card */}
          <div className="col-md-3 d-flex">
            <div className="card shadow-lg rounded-3 w-100 h-100 d-flex flex-column bg-success bg-gradient text-white">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <FaSearch className="me-2" />
                  Checkout Weapon
                </h5>
                <input
                  type="search"
                  placeholder="🔍 Search Card No"
                  className="form-control shadow-sm rounded-pill mb-3 text-dark"
                  value={cardNo}
                  onChange={(e) => setCardNo(e.target.value)}
                />
                <div className="mt-auto">
                  <button
                    className="btn btn-outline-light rounded-pill w-100 fw-bold"
                    onClick={checkoutWeapon}
                  >
                    Checkout
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
                  Pending Weapons
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
