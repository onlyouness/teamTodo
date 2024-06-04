import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
    ArrowsUpDownIcon,
    CalendarDaysIcon,
    QueueListIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
// import  {AuthContext} from '../context/AuthContext'; // Adjust the path as needed
import { AuthContext } from "../context/AuthContext";

import { Skeleton, Grid, bottomNavigationActionClasses } from "@mui/material";
import Task from "../components/Task";
import Tasks from "../components/Tasks";
import SelectItem from "../components/SelectItem";
import Loading from "../components/Loading";
const Dashboard = () => {
    const { currentUser, isLoading, currentPage } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState("completed");
    const [teams, setTeams] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [statusChanging, setStatusChanging] = useState(false);
    const [priorityChanging, setPriorityChanging] = useState(false);
    //Filter Items
    const [filterdStatus, setFilterdStatus] = useState(null);
    const [filterdDate, setFilterdDate] = useState(null);
    const [filterdPriority, setFilterdPriority] = useState(null);
    const [searchTask, setSearchTask] = useState(null);

    const handleStatusChanging = () => {
        setStatusChanging(!statusChanging);
    };
    const handlePriorityChanging = () => {
        setPriorityChanging(!priorityChanging);
    };
    const handleStatusButton = (e) => {
        e.preventDefault();
        if (e.target.value == "All") {
            setFilterdStatus(null);
            setFilterdDate(null);
            setFilterdPriority(null);
            setLoading(true);
        } else {
            setFilterdStatus(e.target.value);
            setLoading(true);
        }
    };
    const removeFilterStatus = () => {
        setFilterdStatus(null);
    };
    const removeFilterDate = () => {
        setFilterdDate(null);
    };
    const removeFilterPriority = () => {
        setFilterdPriority(null);
    };
    const handleDateButton = (e) => {
        e.preventDefault();
        setFilterdDate(e.target.value);
        setLoading(true);
    };
    const handlePriorityButton = (e) => {
        e.preventDefault();
        setFilterdPriority(e.target.value);
        // setLoading(true);
        toast.loading("loading...");
    };
    const handleSearchChange = (e) => {
        if (e.target.value === "") {
            setSearchTask(null);
        } else {
            setSearchTask(e.target.value);
        }
    };
    useEffect(() => {
        var urlParams = new URLSearchParams(window.location.search);
        var message = urlParams.get("message");
        if (message) {
            toast.success(message);

            // Remove the notification data from the URL parameters after displaying the notification
            history.replaceState({}, document.title, window.location.pathname);
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/get_tasks?page=${currentPage}&status=${filterdStatus}&date=${filterdDate}&search= ${searchTask}&priority=${filterdPriority}`,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
                console.log(response);
                toast.remove();
                setTasks(response.data.success);
                setLoading(false);
                setTeams(response.data.teams);
                console.log("tasks", tasks.length);
            } catch (error) {
                console.log(error);
                if (error.response.status == 406) {
                    console.log("no notification");
                    setNotifications(null);
                }
            }
        };
        fetchData();
    }, [
        currentPage,
        statusChanging,
        priorityChanging,
        filterdStatus,
        filterdPriority,
        filterdDate,
        searchTask,
    ]);

    if (loading) {
        return (
            <Loading/>
        );
    }
    return (
        <div className="">
            <Toaster />
            <div className="flex justify-between mb-7 items-center">
                <h1 className="font-bold text-gray-800 text-2xl ">
                    Today's Tasks
                </h1>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 "
                            ariaHidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Search For Tasks..."
                        value={searchTask}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <>
                <div className="flex w-max justify-start items-center gap-5 mb-5">
                    <SelectItem
                        handleChange={handleStatusButton}
                        value={filterdStatus}
                        icon={<QueueListIcon className="w-4 text-gray-600" />}
                        label="Progress"
                        options={["All", "In progress", "Pending", "Completed"]}
                    />
                    <SelectItem
                        handleChange={handleDateButton}
                        value={filterdDate}
                        icon={
                            <CalendarDaysIcon className="w-4 text-gray-600" />
                        }
                        label="Date"
                        options={["Due", "Overdue"]}
                    />
                    <SelectItem
                        handleChange={handlePriorityButton}
                        value={filterdPriority}
                        icon={
                            <ArrowsUpDownIcon className="w-4 text-gray-600" />
                        }
                        label="Priority"
                        options={["high", "low", "medium"]}
                    />
                </div>
            </>
            <div className="flex justify-start gap-3 items-center my-4">
                {filterdStatus && (
                    <div className="rounded-lg px-2 py-2 flex gap-2 bg-gray-200">
                        {" "}
                        <XMarkIcon
                            onClick={removeFilterStatus}
                            className="w-4 text-gray-600  cursor-pointer capitalize"
                        />{" "}
                        <span>{filterdStatus}</span>{" "}
                    </div>
                )}
                {filterdDate && (
                    <div className="rounded-lg px-2 py-2 flex gap-2 bg-gray-200">
                        {" "}
                        <XMarkIcon
                            onClick={removeFilterDate}
                            className="w-4 text-gray-600 cursor-pointer capitalize"
                        />{" "}
                        <span>{filterdDate}</span>{" "}
                    </div>
                )}
                {filterdPriority && (
                    <div className="rounded-lg px-2 py-2 flex gap-2 bg-gray-200">
                        {" "}
                        <XMarkIcon
                            onClick={removeFilterPriority}
                            className="w-4 text-gray-600 cursor-pointer capitalize"
                        />{" "}
                        <span>{filterdPriority}</span>{" "}
                    </div>
                )}
            </div>

            {tasks.data.length !== 0 ? (
                <Tasks
                    handleStatusChanging={handleStatusChanging}
                    handlePriorityChanging={handlePriorityChanging}
                    tasks={tasks}
                />
            ) : (
                <p className="text-gray-700 text-2xl mt-5">No Tasks Yet</p>
            )}
        </div>
    );
};

export default Dashboard;
