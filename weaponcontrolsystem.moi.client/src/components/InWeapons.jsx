import React, { useState, useEffect, use } from "react";
import Navbar from "./Navbar";
import DataTable from "react-data-table-component";
import persian from "react-date-object/calendars/persian";
import persian_fa from "../assets/persian_fa";
import DateObject from "react-date-object";
import Swal from "sweetalert2";
import WeaponModel from "./weaponModel";
import WeaponCheckoutModel from "./weaponCheckoutModel";
function InWeapon() {
  const [inWeapons, setInWeapons] = useState([]);
  const [allInWeapons, setAllInWeapons] = useState([]);
  const [weapon, setWeapon] = useState();
  const [show, setShow] = useState(false);
  const [id, setID] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const toggleModal = () => {
    setShow(!show);
    setWeapon({});
  };
  const checkoutToggle = () => {
    setShowCheckout(!showCheckout);
  };
  const handleCheckout = async (weaponID) => {
    var response = await fetch("https://localhost:7211/api/weapon/" + weaponID);
    const weapond = await response.json();
    if (weapond) setWeapon(weapond);
    setShowCheckout(true);
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },

    {
      name: "Type",

      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Serial No",

      selector: (row) => row.serialNo,
      sortable: true,
    },
    {
      name: "Officer ID",
      selector: (row) => row.officerId,
      sortable: true,
    },
    {
      name: "In Date",
      selector: (row) => row.inDate,
      sortable: true,
    },
  ];

  const row = inWeapons.map((w) => ({
    id: w.id,
    name: w.name,
    type: w.type,
    serialNo: w.serialNo,
    officerId: w.officerID || "N/A",
    inDate: w.inDate,
  }));

  const fetchWeapons = async () => {
    const response = await fetch("https://localhost:7211/api/weapon");
    const Data = await response.json();

    const convertedWeapons = Data.map((weapon) => {
      // Parse the UTC string
      const utcDate = new Date(weapon.inDate);

      // Adjust to local time manually
      const localTime = new Date(
        utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
      );
      const shamsiDate = new DateObject({
        date: localTime,
        calendar: persian,
        locale: persian_fa,
      });

      return {
        ...weapon,
        inDate: shamsiDate.format("YYYY/MM/DD HH:mm"),
      };
    });

    setAllInWeapons(convertedWeapons.filter((w) => w.in == true));
    setInWeapons(convertedWeapons.filter((w) => w.in == true));
  };
  const searchWeapon = (e) => {
    if (e.target.value == "") setInWeapons(allInWeapons);
    else {
      const searchTerm = e.target.value;
      const weapons = allInWeapons.filter((w) => w.cardNo == searchTerm);
      setInWeapons(weapons);
    }
  };
  // const handleDelete = async (weaponId) => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   });
  //   if (result.isConfirmed) {
  //     try {
  //       const response = await fetch(
  //         `https://localhost:7211/api/weapon/${weaponId}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         Swal.fire({
  //           icon: "success",
  //           text: "Weapons has been deleted",
  //           title: "Deleted!",
  //         });
  //         fetchWeapons();
  //       } else {
  //         const errorData = await response.json();
  //         console.log("Error:", errorData);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: errorData.message,
  //         });
  //       }
  //     } catch (error) {
  //       Swal.fire({ icon: "error", title: "Error", text: error.message });
  //     }
  //   }
  // };
  // const handleEdit = (weaponID) => {
  //   var weapon = allInWeapons.find((w) => w.id == weaponID);
  //   setWeapon(weapon);
  //   setShow(true);
  //   setID(weaponID);
  // };

  useEffect(() => {
    fetchWeapons();
  }, []);
  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <input
                type="search"
                placeholder="🔍 Search Weapon"
                className="form-control w-50 shadow-sm rounded-pill "
                style={{
                  maxWidth: "300px",
                }}
                onChange={(e) => searchWeapon(e)}
              />
            </div>
            <h3 className="mb-4 fw-bold text-primary"> Pending weapons</h3>

            <DataTable
              columns={columns}
              data={row}
              pagination
              highlightOnHover
              responsive
              fixedHeader
              fixedHeaderScrollHeight="400px"
              customStyles={{
                rows: {
                  style: {
                    minHeight: "50px", // override the row height
                  },
                },
                headCells: {
                  style: {
                    backgroundColor: "#f8f9fa",
                    fontWeight: "bold",
                  },
                },
                cells: {
                  style: {
                    paddingLeft: "8px", // override the cell padding for data cells
                    paddingRight: "8px",
                  },
                },
              }}
            />
            {/* <WeaponModel
              show={show}
              weapon={weapon}
              onHide={toggleModal}
              id={id}
              fetchWeapons={fetchWeapons}
            />
            <WeaponCheckoutModel
              show={showCheckout}
              onHide={checkoutToggle}
              weapon={weapon}
              fetchWeapons={fetchWeapons}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InWeapon;
