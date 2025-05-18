import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DataTable from "react-data-table-component";
import { data } from "react-router-dom";
import persian from "react-date-object/calendars/persian";
import persian_fa from "../assets/persian_fa";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
function InWeapon() {
  const [inWeapons, setInWeapons] = useState([]);

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },

    {
      name: "Type",

      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Officer badge No",
      selector: (row) => row.officerBadgeNo,
      sortable: true,
    },
    {
      name: "Card No",
      selector: (row) => row.cardNo,
      sortable: true,
    },
    {
      name: "In Date",
      selector: (row) => row.inDate,
      sortable: true,
    },
  ];
  const row = inWeapons.map((w) => ({
    name: w.name,
    type: w.type,
    officerBadgeNo: w.officerBadgeNo,
    cardNo: w.cardNo,
    inDate: w.inDate,
  }));

  const fetchWeapons = async () => {
    const response = await fetch("https://localhost:7211/api/weapon");
    const Data = await response.json();

    const convertedWeapons = Data.map((weapon) => {
      const localDate = new Date(weapon.inDate); // Converts from UTC to local time

      const shamsiDate = new DateObject({
        date: localDate,
        calendar: persian,
        locale: persian_fa,
      });
      return {
        ...weapon,
        inDate: shamsiDate.format("YYYY/MM/DD/hh:mm"), // Output like: 1403/02/27
      };
    });

    setInWeapons(convertedWeapons);
  };

  useEffect(() => {
    fetchWeapons();
  }, []);
  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <h3 className="mb-4 fw-bold text-primary"> List of in weapons</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default InWeapon;
