import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../index.css";
import "tailwindcss/tailwind.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { AuthContext } from "../context/AuthContext";

function Layout() {
    const { currentUser, isLoading, isLogged } = useContext(AuthContext);
    if (isLoading) {
        // return <div>Loading...</div>;
        return (
            <div className="h-full">
                <Box
                    sx={{
                        
                        display: "flex",
                        height: "800px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            </div>
        );
    }
    return (
        <div className="bg-gray-50 h-screen ">
            <header>{isLogged && <Sidebar />}</header>
            <main className={`${isLogged ? `p-4 mt-14 sidebar:ml-44  bg-gray-50` : "bg-gray-50 pt-10" }`}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
