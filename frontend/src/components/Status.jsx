import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    ListItemText,
    Box,
    List,
    ListItem,
    ListItemButton,
} from "@mui/material";
const Status = ({
    currentStatus,
    statusChange,
    closeStatusChangeModel,
    task,
    handleStatus,
    handleStatusChanging,
}) => {
    const data = ["Pending", "In progress", "Completed"];
    const [status, setStatus] = useState(data);
    const statusRef = useRef();
    const handleClickOutside = (e) => {
        if (statusRef.current && !statusRef.current.contains(e.target)) {
            closeStatusChangeModel();
        }
    };
    useEffect(() => {
        if (statusChange) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [statusChange]);
    const handleChangeStatus = async (item) => {
        const newStatus = {
            status: item,
        };
        axios
            .put(`http://localhost:8000/api/task-status/${task}`, newStatus)
            .then((response) => {
                console.log(response);
                handleStatusChanging();
                handleStatus();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    if (currentStatus) {
        const items = [
            currentStatus,
            ...data.filter((element) => element !== currentStatus),
        ];
        return (
            <div ref={statusRef}>
                <Box
                    className="bg-gray-50 rounded-lg absolute left-20 z-30"
                    sx={{ width: "70%", maxWidth: 150 }}
                >
                    <List>
                        {items.map((item) => {
                            return (
                                <ListItem disablePadding>
                                    <ListItemButton style={{paddingInline:"10px",paddingBlock:"0px"}}
                                        onClick={() => handleChangeStatus(item)}
                                    >
                                        <ListItemText
                                            className={` px-3 py-2 rounded-lg ${
                                                item == "Completed" &&
                                                "bg-green-200 text-green-800"
                                            } ${
                                                item == "Pending" &&
                                                "bg-red-200 text-red-800"
                                            } ${
                                                item == "In progress" &&
                                                "bg-blue-200 text-blue-800"
                                            }`}
                                            primary={item}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </div>
        );
    }

    console.log(status);
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    label="Status"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                >
                    {status.map((item) => (
                        <MenuItem
                            className={`rounded-lg shadow bg-white px-6 py-4 ${
                                status == "Completed" &&
                                "border-t-2 border-green-600"
                            } ${
                                status == "Pending" &&
                                "border-t-2 border-red-600"
                            } ${
                                status == "in_progress" &&
                                "border-t-2 border-blue-600"
                            }`}
                            value={item}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default Status;
