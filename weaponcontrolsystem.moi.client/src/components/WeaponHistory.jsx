import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DataTable from "react-data-table-component";
import persian from "react-date-object/calendars/persian";
import persian_fa from "../assets/persian_fa";
import DateObject from "react-date-object";
import Swal from "sweetalert2";

const WeaponHistory = () => {
  const [weapons, setWeapons] = useState([]);
  const [filteredWeapons, setFilteredWeapons] = useState([]);

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Type", selector: (row) => row.type, sortable: true },
    {
      name: "Officer Badge No",
      selector: (row) => row.officerBadgeNo,
      sortable: true,
    },
    { name: "In Date", selector: (row) => row.inDate, sortable: true },
    { name: "Out Date", selector: (row) => row.outDate, sortable: true },
  ];

  const fetchWeapons = async () => {
    try {
      const response = await fetch("https://localhost:7211/api/weaponHandover");
      const data = await response.json();

      const convertedWeapons = data.map((weapon) => {
        const parseDate = (iso) => {
          const d = new Date(iso);
          if (isNaN(d)) return "Invalid date";

          const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
          const shamsi = new DateObject({
            date: local,
            calendar: persian,
            locale: persian_fa,
          });
          return shamsi.format("YYYY/MM/DD HH:mm");
        };

        return {
          ...weapon,
          inDate: parseDate(weapon.inDate),
          outDate: parseDate(weapon.outDate),
        };
      });

      setWeapons(convertedWeapons);
      setFilteredWeapons(convertedWeapons);
    } catch (err) {}
  };

  const handleSearch = (e) => {
    const term = e.target.value.trim();

    if (!term) {
      setFilteredWeapons(weapons);
    } else {
      const filtered = weapons.filter(
        (w) =>
          w.name.includes(term) ||
          w.type.includes(term) ||
          w.officerBadgeNo === term
      );
      setFilteredWeapons(filtered);
    }
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <div className="d-flex justify-content-end mb-3">
              <input
                type="search"
                placeholder="🔍 Search Weapon"
                className="form-control w-50 shadow-sm rounded-pill"
                style={{ maxWidth: "300px" }}
                onChange={handleSearch}
              />
            </div>

            <h3 className="mb-4 fw-bold text-primary">History of Weapons</h3>

            <DataTable
              columns={columns}
              data={filteredWeapons}
              pagination
              highlightOnHover
              responsive
              fixedHeader
              fixedHeaderScrollHeight="400px"
              customStyles={{
                rows: {
                  style: { minHeight: "50px" },
                },
                headCells: {
                  style: {
                    backgroundColor: "#f8f9fa",
                    fontWeight: "bold",
                  },
                },
                cells: {
                  style: {
                    paddingLeft: "8px",
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
};

export default WeaponHistory;
