import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../DashboardNavbar";
import SideBar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar */}
      <div className="shadow" style={{ width: "250px", minHeight: "100vh", background: "linear-gradient(135deg, #4f0c3e, #989f36)" }}>
        <SideBar />

      </div>

      {/* Main content area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Sticky top navbar */}
        <div className="shadow-sm" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <DashboardNavbar />
        </div>

        {/* Page content */}
        <main
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "#f4f6f9",
            borderTopLeftRadius: "12px",
            minHeight: "calc(100vh - 56px)",
          }}
        >
          <div className="container-fluid">
            {/* outlet renders the matched child route's element */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
