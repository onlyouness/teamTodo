import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import axios from "axios";
import Loading from "../components/Loading";
import DateFormat from "../components/DateFormat";
import Sprints from "../components/Sprints/Sprints";
import SideTask from "../components/Sprints/SideTask";
import SprintForm from "../components/Sprints/SprintForm";
import TaskForm from "../components/Tasks/TaskForm";

const SingleProject = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState({});
    const [taskID, setTaskID] = useState(null);
    const [sprintID, setSprintID] = useState(null);
    const [isSprintOpen, setIsSprintOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenTask, setIsOpenTask] = useState(false);
    const [isTaskOpen, setIsTaskOpen] = useState(false);
    const handleTaskAddOpen = (sprint) => {
        setIsTaskOpen(true);
         setSprintID(sprint);
        console.log(sprint);
    };
    const handleSprintAddOpen = () => {
        setIsSprintOpen(true);
       
    };
    const closeEdit = () => {
        setIsEditing(false);
        setIsSprintOpen(false);
        setIsOpenTask(false);
        setIsTaskOpen(false);
    };

    const handleTaskOpen = (task) => {
        setIsOpen(true);
        setTask(task);
    };
    const closeTask = () => {
        setIsOpen(false);
    };

    const handleOpenEditTask = (taskID) => {
        setIsEditing(true);
        setIsOpenTask(true);
        setIsOpen(false);
        setTaskID(taskID);
       
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`http://localhost:8000/api/projects/${id}/project`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((response) => {
                setProject(response.data.success);
                setProgress(response.data.progress);
                setLoading(false);
            })
            .catch((error) => {
                console.error(
                    "There was an error storing the comment details!",
                    error
                );
            });
    }, [id, isOpen, isSprintOpen, isOpenTask, isTaskOpen]);
    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <header className="bg-white shadow rounded-md  p-4">
                <article>
                    <div className="flex justify-start gap-20 items-center">
                        <div>
                            <Link to={"/projects"}>
                                <div className="flex justify-start text-gray-600 text-sm">
                                    <ChevronLeftIcon className="w-4" />
                                    <p>BACK TO PROJECTS</p>
                                </div>
                            </Link>
                            <h1 className="text-2xl font-bold mt-2 text-gray-800">
                                {project?.name}
                            </h1>
                        </div>

                        <div className="flex justify-center items-start flex-col">
                            <h1 className="text-gray-500 font-medium">Owner</h1>
                            <p className="flex justify-start items-center gap-3 hover:bg-gray-100 cursor-pointer bg-gray-50 rounded-lg px-1 py-0.5">
                                <Avatar
                                    src={`http://127.0.0.1:8000/${project?.owner.image}`}
                                />
                                <span className="capitalize font-semibold">
                                    {project?.owner.name}
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-stretch items-start flex-col gap-3">
                            <h1 className="text-gray-500 font-medium">
                                Date Due
                            </h1>

                            <span className="capitalize font-semibold">
                                <DateFormat DateProvided={project?.date_fin} />
                            </span>
                        </div>
                    </div>
                </article>
                <div className="w-1/2 mt-5">
                    <div class="flex justify-between mb-1 ">
                        <span class="text-base font-medium text-primaryColor ">
                            Progress
                        </span>
                        <span class="text-sm font-medium text-primaryColor">
                            {progress}%
                        </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 ">
                        <div
                            class="bg-primaryColor h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
                {/* the owner */}
            </header>

            <article className="bg-white shadow rounded-md mt-3 p-4">
                <div className="flex justify-between mb-4">
                    <h1 className="text-gray-500 font-medium text-lg">
                        Active Sprints
                    </h1>
                    <button
                        onClick={handleSprintAddOpen}
                        className="flex items-center justify-center px-2 py-1 bg-primaryColor text-white rounded-lg hover:bg-primaryHover"
                    >
                        {" "}
                        <PlusIcon className="w-4 text-white" />
                        <span>Sprint</span>
                    </button>
                    {isSprintOpen && (
                        <SprintForm
                            closeEdit={closeEdit}
                            isEditing={isEditing}
                            projectID={project.id}
                        />
                    )}
                    {isOpenTask && (
                        <TaskForm
                            closeEdit={closeEdit}
                            isEditing={isEditing}
                            taskID={taskID}
                            projectID={project.id}
                        />
                    )}
                    {isTaskOpen && (
                        <TaskForm
                            closeEdit={closeEdit}
                            isEditing={isEditing}
                            sprintID={sprintID}
                            projectID={project.id}
                        />
                    )}
                </div>
                {project.sprints.length > 0 ? (
                    <Sprints
                        handleOpenEditTask={handleOpenEditTask}
                        handleTaskOpen={handleTaskOpen}
                        sprints={project.sprints}
                        handleTaskAddOpen={handleTaskAddOpen}
                    />
                ) : (
                    <h1 className="text-gray-700 text-lg font-semibold pl-1">
                        No Sprint Yet
                    </h1>
                )}
            </article>

            {isOpen && (
                <aside
                    className={`fixed shadow z-50 top-14 right-0 pb-20 overflow-y-auto transition-transform bg-gray-50 h-full w-96`}
                >
                    <SideTask closeTask={closeTask} task={task} />
                </aside>
            )}
        </>
    );
};

export default SingleProject;
