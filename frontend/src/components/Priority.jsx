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
const data = ["high", "low", "medium"];
const Priority = ({
    currentPriority,
    handlePriorityChanging,
    handlePriority,
    priorityChange,
    closePriorityChangeModel,
    task,
}) => {
    const items = [
        currentPriority,
        ...data.filter((element) => element !== currentPriority),
    ];
    const priorityRef = useRef();
    const handleClickOutside = (e) => {
        if (priorityRef.current && !priorityRef.current.contains(e.target)) {
            closePriorityChangeModel();
        }
    };
    useEffect(() => {
        if (priorityChange) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [priorityChange]);
    const handleChangePriority = async (item) => {
        const newStatus = {
            priority: item,
        };
        axios
            .put(`http://localhost:8000/api/task-priority/${task}`, newStatus)
            .then((response) => {
                console.log(response);
                handlePriorityChanging();
                handlePriority();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <div ref={priorityRef}>
                <Box
                    className="bg-gray-50 rounded-lg absolute left-20 z-30 "
                    sx={{ width: "70%", maxWidth: 150 }}
                >
                    <List>
                        {items.map((item) => {
                            return (
                                <ListItem disablePadding>
                                    <ListItemButton
                                        style={{
                                            paddingInline: "10px",
                                            paddingBlock: "0px",
                                        }}
                                        onClick={() =>
                                            handleChangePriority(item)
                                        }
                                    >
                                        <ListItemText
                                            className={` capitalize text-center px-3 py-2 rounded-lg ${
                                                item == "high" &&
                                                "bg-red-200 text-red-800"
                                            } ${
                                                item == "low" &&
                                                "bg-green-200 text-green-800"
                                            } ${
                                                item == "medium" &&
                                                "bg-orange-200 text-orange-800"
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
        </>
    );
};

export default Priority;
