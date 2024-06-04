import React, { useState } from "react";
import {
    ChevronLeftIcon,
    PencilSquareIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "@mui/material";
const Sprint = ({ sprints, sprintID, handleOpen, handleOpenEditTask }) => {
    return (
        <div>
            {sprints.map((task) => {
                return (
                    <div
                        key={task.id}
                        className="flex cursor-pointer justify-start items-start gap-4 flex-col p-2 bg-gray-50 m-2 rounded-lg"
                    >
                        <div className="flex justify-between items-center w-full">
                            <p className="font-medium text-gray-400">
                                ID-{task.id}
                            </p>

                            <PencilSquareIcon
                                onClick={() =>
                                    handleOpenEditTask(task.id, sprintID)
                                }
                                className="w-5 cursor-pointer text-gray-500"
                            />
                        </div>
                        <p
                            onClick={() => handleOpen(task)}
                            className="font-semibold hover:underline hover:pl-3 transition-all ease-in-out"
                        >
                            {task.title}
                        </p>

                        <div className="flex justify-center items-center gap-3">
                            <Avatar
                                sx={{
                                    width: "25px",
                                    height: "25px",
                                }}
                                src={`http://127.0.0.1:8000/${task.user?.image}`}
                            />{" "}
                            <p className="font-medium text-gray-600">
                                {task.user?.name}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Sprint;
