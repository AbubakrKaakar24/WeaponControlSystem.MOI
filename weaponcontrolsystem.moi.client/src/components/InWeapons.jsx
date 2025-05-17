import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
function InWeapon() {
  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <p>Welcome to In weapons list</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InWeapon;
