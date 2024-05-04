import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import ForgetPassword from "../pages/ForgetPassword";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [{
            path: '/',
            element:<Home />
        },
            {
                path: '/register',
                element:<Register />
            },
            {
                path: '/login',
                element:<Login />
            },
            {
                exact:true,
                path: '/dashboard',
                element:<Dashboard />
            },
            {
                
                path: '/forget-password',
                element:<ForgetPassword />
            },
            {
                path: '/api/reset/:token', // Update the route to match Laravel's route
                element: <ResetPassword />
            },
            {
                path: "*",
                element:<p className="text-red-500 text-xl">This Feature Not Inplemmented Yet!</p>
        },
        ]
    }
])