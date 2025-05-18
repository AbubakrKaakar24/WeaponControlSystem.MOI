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
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <i
            className=" fa fa-trash fa-2x"
            style={{
              cursor: "pointer",
              color: "#F4631E", // Bootstrap danger red
              transition: "color 0.3s ease",
            }}
            onClick={() => this.handleDelete(row.id)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#CB0404")} // darker red
            onMouseLeave={(e) => (e.currentTarget.style.color = "#F4631E")}
          />

          <i
            className="fa fa-edit fa-2x"
            style={{
              cursor: "pointer",
              color: "#FFCF50", // Bootstrap success green
              transition: "color 0.3s ease",
              marginTop: "4px",
            }}
            onClick={() => this.handleEdit(row.id)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C45E")} // darker green
            onMouseLeave={(e) => (e.currentTarget.style.color = "#FFCF50")}
          />
          <i
            className="fas fa-circle-right fa-2x"
            style={{
              cursor: "pointer",
              color: "blue",
              transition: "color 0.3s ease",
              marginTop: "4px",
              marginLeft: "50px",
            }}
            onClick={() => this.handleEdit(row.id)}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C45E")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#FFCF50")}
          />
        </div>
      ),
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
