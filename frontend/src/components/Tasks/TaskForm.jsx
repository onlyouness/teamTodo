import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CircularProgress, Box } from "@mui/material";

import { FormLabel, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
const TaskForm = ({
    isEditing,
    closeEdit,
    sprintID,
    taskID,
    projectID
}) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [date_start, setDateStart] = useState("");
    const [date_end, setDateEnd] = useState("");
    const [sprint, setSprint] = useState(sprintID);
    const [team, setTeam] = useState(null);
    const [teams, setTeams] = useState([]);
    const [user, setUser] = useState(null);
    const [users,setUsers]= useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/teams/${projectID}`)
            .then((res) => setTeams(res.data.teams))
            .catch((error) => {
                console.log(error);
            });
    }, [sprintID,taskID,isEditing,projectID]);
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/members/${team}`)
            .then((res) => setUsers(res.data.members))
            .catch((error) => {
                console.log(error);
            });
    }, [team]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            title,
            desc,
            status,
            priority,
            date_end,
            date_start,
            sprint,
            team,
            user,
        };
        if (isEditing) {
            axios
                .put(`http://localhost:8000/api/tasks/${taskID}`, newItem)
                .then((res) => {
                    closeEdit();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("no editing but adding", newItem);
            const token = localStorage.getItem("token");
            axios
                .post(
                    `http://localhost:8000/api/create_task`,
                    {
                        newItem,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    closeEdit();
                    toast.success(res.data.success);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    if (isEditing) {
        const fetchProject = () => {
            const token = localStorage.getItem("token");
            axios
                .get(`http://localhost:8000/api/tasks/${taskID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    const data = res.data.success;
                    const { id,team_id, title,desc,date_end,date_start,priority,status } =
                        data;
                    setTitle(title)
                    setDesc(desc)
                    setDateStart(date_start)
                    setDateEnd(date_end)
                    setPriority(priority)
                    setStatus(status)
                    setSprint(sprintID)
                    setTeam(team_id)
                    // setTeams([res.data.success.team])
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        useEffect(() => {
            fetchProject();
        }, [taskID]);
    }
    return (
        <div class="flex fixed w-full  z-50 bg-black  bg-opacity-20 top-0 left-0 flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ x: "-12rem", opacity: 0 }}
                transition={{ duration: 0.2 }}
                layout
                className="absolute top-2 z-50  bg-white shadow py-5 px-4 rounded-lg"
            >
                <span>
                    <XMarkIcon
                        onClick={closeEdit}
                        className="w-6 p-1 absolute right-4 bg-gray-300 rounded-2xl cursor-pointer text-gray-600 hover:bg-gray-400"
                    />
                </span>
                <h1 className="mb-6 text-xl">
                    {isEditing ? "Edit Task" : "Add Task"}
                </h1>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-start items-start gap-3"
                >
                    <div className="flex flex-col">
                        {/* <label htmlFor="name">Name:</label> */}
                        <FormLabel>Name:</FormLabel>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <FormLabel>Description:</FormLabel>
                        <TextField
                            value={desc}
                            required
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <FormLabel>Status:</FormLabel>
                        <select
                            name=""
                            className="border px-3 py-2 rounded-lg"
                            id=""
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In progress">In progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <FormLabel>Priority:</FormLabel>
                        <select
                            name=""
                            className="border px-3 py-2 rounded-lg"
                            id=""
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="" disabled>Select Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <FormLabel>Team:</FormLabel>
                        <select
                            className="border px-3 py-2 rounded-lg"
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                        >
                            <option value="" disabled>Select Team</option>
                            {teams.map((item) => {
                                return (
                                    <option value={item.id}>{item.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <FormLabel>Assignee:</FormLabel>
                        <select
                            className="border px-3 py-2 rounded-lg"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        >
                            <option value="" disabled>Select Team</option>
                            {users.map((item) => {
                                return (
                                    <option value={item.user.id}>{item.user.name} - { item.role.type}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <FormLabel>Date Start:</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                            >
                                <DatePicker
                                    value={dayjs(date_start)}
                                    onChange={(newValue) =>
                                        setDateStart(newValue)
                                    }
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className="flex flex-col ">
                        <FormLabel>Date Fin:</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                            >
                                <DatePicker
                                    value={dayjs(date_end)}
                                    onChange={(newValue) =>
                                        setDateEnd(newValue)
                                    }
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 font-medium text-white bg-primaryColor hover:bg-primaryHover rounded-lg"
                    >
                        {isEditing ? "Save" : "Add"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default TaskForm;
