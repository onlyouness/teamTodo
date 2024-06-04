import React, { useState } from "react";
import {
    ChevronLeftIcon,
    CalendarDaysIcon,
    QueueListIcon,
    XMarkIcon,
    ChevronDownIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import {
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import Sprint from "./Sprint";
import TaskForm from "../Tasks/TaskForm";
const Sprints = ({ sprints, handleTaskOpen,handleOpenEditTask,handleTaskAddOpen }) => {

   
    return (
        <>
            {sprints.map((sprint) => {
                const filtredPending = sprint.tasks.filter(
                    (item) => item.status == "Pending"
                );
                const filtredInprogress = sprint.tasks.filter(
                    (item) => item.status == "In progress"
                );
                const filtredCompleted = sprint.tasks.filter(
                    (item) => item.status == "Completed"
                );

                return (
                    <Accordion key={sprint.id}>
                        <AccordionSummary
                            expandIcon={<ChevronDownIcon />}
                            aria-controls={sprint.id}
                            id={sprint.id}
                        >
                            <Typography >
                                {sprint.title}{" "}
                                <span className="text-gray-500 text-sm">
                                    ({sprint.tasks.length} tasks)
                                </span>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <button
                                onClick={()=>handleTaskAddOpen(sprint.id)}
                                className="flex items-center mb-2 justify-center px-2 py-1 bg-primaryColor text-white rounded-lg hover:bg-primaryHover"
                            >
                                <PlusIcon className="w-4 text-white" />
                                <span>Task</span>
                            </button>
                           
                            <div className="grid grid-cols-3 divide-x font-semibold text-gray-600 divide-gray-100">
                                <div className="bg-gray-50 px-3 py-2">
                                    <h1 className="">Pending</h1>
                                </div>
                                <div className="bg-gray-50 px-3 py-2">
                                    <h1 className="">In Progress</h1>
                                </div>
                                <div className="bg-gray-50 px-3 py-2">
                                    <h1 className="">Completed</h1>
                                </div>
                            </div>

                            {sprint.tasks.length > 0 ? (
                                <article className="grid grid-cols-3 divide-x divide-gray-100">
                                    <div>
                                        <Sprint
                                            handleOpenEditTask={handleOpenEditTask}
                                            handleOpen={handleTaskOpen}
                                            sprints={filtredPending}
                                        />
                                    </div>
                                    <div>
                                        <Sprint
                                            handleOpenEditTask={handleOpenEditTask}
                                            handleOpen={handleTaskOpen}
                                            sprints={filtredInprogress}
                                        />
                                    </div>
                                    <div>
                                        <Sprint
                                            handleOpenEditTask={handleOpenEditTask}
                                            handleOpen={handleTaskOpen}
                                            sprints={filtredCompleted}
                                        />
                                    </div>
                                </article>
                            ) : (
                                <p className="text-gra-700 font-semibold p-4">
                                    No Task Yet
                                </p>
                            )}
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </>
    );
};

export default Sprints;
