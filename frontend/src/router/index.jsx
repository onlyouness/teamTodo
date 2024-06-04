import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import ForgetPassword from "../pages/ForgetPassword";
import RequireAuth from "../components/RequireAuth";
import Projects from "../pages/Projects";
import SingleProject from "../pages/SingleProject";
import Test from "../pages/Test";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
            path: '/',
            element:<RequireAuth> <Dashboard /></RequireAuth>
            },
            {
            path: '/projects',
            element:<RequireAuth> <Projects /></RequireAuth>
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
                element:  <Home/>
            },
            {
                
                path: '/forget-password',
                element:<ForgetPassword />
            },
            {
                
                path: '/test',
                element:<Test />
            },

            {
                path: '/api/reset/:token', // Update the route to match Laravel's route
                element: <ResetPassword />
            },
            {
                path: "/projects/:id",
                element: <RequireAuth> <SingleProject /></RequireAuth>,
            },
            {
                path: "*",
                element:<p className="text-red-500 text-xl">This Feature Not Inplemmented Yet!</p>
        },
        ]
    }
])