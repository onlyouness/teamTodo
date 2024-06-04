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
const SprintForm = ({ isEditing, projectID, closeEdit, setIsEditing }) => {
    const [title, setTitle] = useState("");
    const [date_fin, setDateFin] = useState("");
    const [project_id,setProjectID] = useState(projectID)

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            title,
            date_fin,
            project_id
        };
        if (isEditing) {
            axios
                .put(`http://localhost:8000/api/projects/${projectID}`, newItem)
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
                    `http://localhost:8000/api/sprints`,
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
                    toast.success(res.data.success)
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
                .get(`http://localhost:8000/api/projects/${projectID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    const { id, name, description, date_fin } =
                        res.data.success;
                    const data = res.data.success;
                    setName(name);
                    setDescription(description);
                    setDateFin(date_fin);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        useEffect(() => {
            fetchProject();
        }, [projectID]);
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
                    {isEditing ? "Edit Sprint" : "Add Sprint"}
                </h1>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-start items-start gap-3"
                >
                    <div className="flex flex-col">
                        {/* <label htmlFor="name">Name:</label> */}
                        <FormLabel>Title:</FormLabel>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    
                    <div className="flex flex-col ">
                        <FormLabel>Date Fin:</FormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                            >
                                <DatePicker
                                    value={dayjs(date_fin)}
                                    onChange={(newValue) =>
                                        setDateFin(newValue)
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

export default SprintForm;
