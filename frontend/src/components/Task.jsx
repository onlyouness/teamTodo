import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CalendarDaysIcon,
    ArrowsUpDownIcon,
    EllipsisHorizontalCircleIcon,
    UserGroupIcon,
    ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import Status from "./Status";
import Priority from "./Priority";
import { Link } from "react-router-dom";

function Task({ task, handleStatusChanging,handlePriorityChanging }) {
    const { title, status, priority, date_start, date_end } = task;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };
    const [statusChange, setStatusChange] = useState(false);
    const [priorityChange, setPriorityChange] = useState(false);
    const handleStatus = () => {
        setStatusChange(!statusChange);
    };
    const closeStatusChangeModel = () => {
        setStatusChange(false);
    };
    // Priority
    const closePriorityChangeModel = () => {
        setPriorityChange(false);
    };
    const handlePriority = () => {
        setPriorityChange(!priorityChange);
    };

    return (
        <motion.article
            key={task}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: "-12rem", opacity: 0 }}
            transition={{ duration: 0.2 }}
            layout
            className={`rounded-lg shadow bg-white px-6 py-4 ${
                status == "Completed" && "border-t-2 border-green-600"
            } ${status == "Pending" && "border-t-2 border-red-600"} ${
                status == "In progress" && "border-t-2 border-blue-600"
            }`}
        >
            <div className="relative flex gap-2 flex-col">
                <div className="flex justify-center items-center  ">
                    <h1 className=" mx-auto px-3 py-3 text-center text-gray-400 font-medium text-sm">
                        {task.team.name}
                    </h1>
                </div>
                <h1 className="text-gray-800 font-semibold text-lg  ">
                    {title}
                </h1>
                <h1 className="text-gray-800 font-semibold "></h1>
                <div>
                    {/* <Status task={task.id} currentStatus={status} /> */}
                </div>
                <div className="flex justify-start items-center gap-2">
                    <UserGroupIcon className="w-4 text-gray-600" />
                    <span className="font-medium">Project:</span>
                    <Link to={ `/projects/${task.team.project.id}`}>
                       <span className="text-gray-600 text-medium">
                        {task.team.project.name}
                    </span>
                    </Link>
                 
                </div>
                <div className="flex justify-start items-center gap-2">
                    <CalendarDaysIcon className="w-4 text-gray-600" />
                    <span className="font-medium">Date Start:</span>
                    <span className="text-gray-600 text-medium">
                        {formatDate(date_start)}
                    </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                    <CalendarDaysIcon className="w-4 text-gray-600" />
                    <span className="font-medium">Due Date:</span>
                    <span className="text-gray-600 text-medium">
                        {formatDate(date_end)}
                    </span>
                </div>

                <div className="flex justify-start items-center gap-2">
                    <ArrowsUpDownIcon className="w-4 text-gray-600" />
                    <span className="font-medium ">Priority:</span>
                    <span className="text-gray-600 text-medium capitalize">
                        {priorityChange ? (
                            <Priority
                                priorityChange={priorityChange}
                                currentPriority={priority}
                                task={task.id}
                                handlePriority={handlePriority}
                                handlePriorityChanging = {handlePriorityChanging}
                                closePriorityChangeModel={
                                    closePriorityChangeModel
                                }
                            />
                        ) : (
                            <button className={`capitalize rounded px-2 py-1 ${priority==="high" && "text-red-400 hover:bg-red-100"} ${priority==="low" && "text-green-400 hover:bg-green-100"} ${priority==="medium" && "text-orange-400 hover:bg-orange-100"}`}  onClick={handlePriority}>{priority}</button>
                        )}
                    </span>
                </div>
                <div className="flex justify-start items-center gap-2 relative">
                    <EllipsisHorizontalCircleIcon className="w-4 text-gray-600" />
                    <span className="font-medium">Status:</span>

                    {statusChange ? (
                        <Status
                            statusChange={statusChange}
                            closeStatusChangeModel={closeStatusChangeModel}
                            handleStatusChanging={handleStatusChanging}
                            handleStatus={handleStatus}
                            task={task.id}
                            currentStatus={status}
                        />
                    ) : (
                        <button
                            onClick={handleStatus}
                            className={`text-gray-600 text-sm ${
                                status === "Pending" &&
                                `bg-red-200  text-red-800`
                            } ${
                                status === "Completed" &&
                                `bg-green-200 text-green-800`
                            } ${
                                status == "In progress" &&
                                `bg-blue-200 text-blue-700`
                            } rounded-lg px-2 py-1 font-medium capitalize`}
                        >
                            {status == "in_progress" ? "In Progress" : status}
                        </button>
                    )}
                </div>
                <div className="flex justify-start items-center gap-2">
                    <ChatBubbleLeftIcon className="w-4 text-gray-600" />
                    <span className="font-medium ">Comments:</span>
                    <span className="text-gray-600 text-medium capitalize">
                        {task.comments.length} comment
                    </span>
                </div>
            </div>
        </motion.article>
    );
}

export default Task;
