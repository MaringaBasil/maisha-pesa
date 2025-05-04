import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import ContractorDashboard from "./components/contractor/ContractorDashboard";
// ... import other dashboards

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/contractor" element={<ContractorDashboard />} />
                {/* Add other role routes */}
            </Routes>
        </BrowserRouter>
    );
}
