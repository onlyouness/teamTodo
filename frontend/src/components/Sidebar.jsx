import React, { useContext,useRef, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { HomeIcon,FolderOpenIcon } from '@heroicons/react/24/solid'


const Sidebar = () => {
    const { currentUser, setIsLoading, setCurrentUser, setIsLogged } =
        useContext(AuthContext);
    const navigate = useNavigate();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };
    const profileRef = useRef();
    const handleClickOutside = (e) => {
        if (profileRef.current && !profileRef.current.contains(e.target)) {
            setIsProfileOpen(false);
        }
    };
    useEffect(() => {
        if (isProfileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileOpen]);

    const handleLogOut = () => {
        const token = localStorage.getItem("token");
        axios
            .get("http://localhost:8000/api/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                console.log(
                    "user log Out successfully:",
                    response.data.success
                );
                localStorage.removeItem("token");
                const successMessage = response.data.success;
                setCurrentUser(null);
                setIsLogged(false);
                navigate(
                    "/login/?message=" + encodeURIComponent(successMessage)
                );
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                onClick={toggleNavbar}
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <Link to={"/"} className="flex ms-2 md:me-24">
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap ">
                                    Teamify
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button
                                        onClick={toggleProfile}
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        {/* <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" /> */}
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={`http://127.0.0.1:8000/${currentUser?.image}`}
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div ref={profileRef}
                                    className={`z-50 ${
                                        isProfileOpen ? `` : `hidden`
                                    } absolute top-8 right-2   my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`}
                                    id="dropdown-user"
                                >
                                    <div className="px-4 py-3" role="none">
                                        {/* <p className="text-sm text-gray-900 " role="none">
                  Neil Sims
                </p> */}
                                        <p
                                            className="text-sm text-gray-900 "
                                            role="none"
                                        >
                                            {currentUser?.name}
                                        </p>
                                        <p
                                            className="text-sm font-medium text-gray-900 truncate "
                                            role="none"
                                        >
                                            {currentUser?.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a
                                                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                                                role="menuitem"
                                            >
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  e"
                                                role="menuitem"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={handleLogOut}
                                                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  e"
                                                role="menuitem"
                                            >
                                                Sign Out
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-44 h-screen pt-20 transition-transform ${
                    isNavbarOpen ? `` : `-translate-x-full`
                }  bg-white border-r border-gray-200 sidebar:translate-x-0 `}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
                    <ul className="space-y-2 font-medium">
                        <li></li>
                        <li>
                            <Link
                                to={"/"}
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <HomeIcon className="size-5 text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Home
                                </span>
                            </Link>
                            <Link
                                to={"/projects"}
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <FolderOpenIcon className="size-5 text-gray-600" />
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Projects
                                </span>
                            </Link>
                            {/* <Link
                                to={"/login"}
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                    />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Sign In
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/register"}
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Sign Up
                                </span>
                            </Link>
                            <button
                                onClick={handleLogOut}
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Sign Out
                                </span>
                            </button> */}
                        </li>
                    </ul>
                </div>
            </aside>
            
        </>

        // <nav>
        //     <ul className='flex flex-col gap-2'>
        //         <li>
        //             <Link to={"/login"}>Login</Link>
        //             <Link to={"/register"}>Sign up</Link>
        //         </li>
        //     </ul>
        // </nav>
    );
};

export default Sidebar;
