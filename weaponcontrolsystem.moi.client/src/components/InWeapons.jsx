import React, { useState, useEffect, use } from "react";
import Navbar from "./Navbar";
import DataTable from "react-data-table-component";
import persian from "react-date-object/calendars/persian";
import persian_fa from "../assets/persian_fa";
import DateObject from "react-date-object";
import { useTranslation } from "react-i18next";
function InWeapon() {
  const [inWeapons, setInWeapons] = useState([]);
  const [allInWeapons, setAllInWeapons] = useState([]);
  const [weapon, setWeapon] = useState();
  const [show, setShow] = useState(false);
  const [id, setID] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const columns = [
    { name: t("Name"), selector: (row) => row.name, sortable: true },

    {
      name: t("Type"),

      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: t("Serial no"),

      selector: (row) => row.serialNo,
      sortable: true,
    },
    {
      name: t("Officer ID"),
      selector: (row) => row.officerId,
      sortable: true,
    },
    {
      name: t("In date"),
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
      const weapons = allInWeapons.filter((w) => w.name.includes(searchTerm));
      setInWeapons(weapons);
    }
  };
  const paginationOptions = {
    rowsPerPageText: t("RowsPerPage"),
    rangeSeparatorText: t("Of"),
    selectAllRowsItem: true,
    selectAllRowsItemText: t("All"),
  };
  useEffect(() => {
    fetchWeapons();
  }, []);
  return (
    <div className="bg-light min-vh-100" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <input
                type="search"
                placeholder={t("Search Weapon") + "🔍"}
                className="form-control w-50 shadow-sm rounded-pill "
                style={{
                  maxWidth: "300px",
                }}
                onChange={(e) => searchWeapon(e)}
              />
            </div>
            <h3 className="mb-4 fw-bold text-primary">
              {" "}
              {t("Pending Weapons")}
            </h3>

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
              direction={isRTL ? "rtl" : "ltr"}
              noDataComponent={t("No Data")}
              paginationComponentOptions={paginationOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InWeapon;
