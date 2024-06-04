import React,{useContext,useEffect} from 'react'
import { useLocation, Navigate,useNavigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";

function RequireAuth({ children }) {
    const navigate = useNavigate();
    const { isLogged } = useContext(AuthContext);
    console.log("the current user",isLogged)
    const location = useLocation();
    useEffect(() => {
        if (!isLogged) {
            navigate("/login");
        }
    }, [isLogged]);


    return children;
}

export default RequireAuth