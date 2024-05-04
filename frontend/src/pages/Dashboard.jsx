import React, { useEffect ,useContext} from "react";
import toast, { Toaster } from "react-hot-toast";
// import  {AuthContext} from '../context/AuthContext'; // Adjust the path as needed
import {AuthContext} from "../context/AuthContext"
const Dashboard = () => {
    const {currentUser} = useContext(AuthContext)
    // console.log(AuthContext)
    useEffect(() => {
        var urlParams = new URLSearchParams(window.location.search);
        var message = urlParams.get("message");
        if (message) {
            toast.success(message);

            // Remove the notification data from the URL parameters after displaying the notification
            history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);
   
    console.log("user",currentUser)
    return (
        <div>
            <Toaster />
            <h1>Dashboard</h1>
        </div>
    );
};

export default Dashboard;
