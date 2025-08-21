// src/components/Beneficiary/BenLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../DashboardNavbar"; // 👈 reuse the same navbar
import SideBar from "./sideBar";

const BenLayout = () => {
  return (
    <div className="d-flex" style={{ backgroundColor: "#D0DEF2" }}>
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-grow-1">
        <DashboardNavbar />
        <main className="p-4 vh-100">
          {/* Renders the matched child route's element */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BenLayout;
