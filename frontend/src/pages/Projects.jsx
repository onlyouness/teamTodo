import React, { useEffect, useState } from "react";
import TableProject from "../components/Projects/TableProject";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ProjectForm from "../components/Projects/ProjectForm";
import Loading from "../components/Loading";
function calculatePeriod(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;
    if (diff > 0) {
        let years = target.getFullYear() - now.getFullYear();
        let months = target.getMonth() - now.getMonth();
        let days = target.getDate() - now.getDate();
        let hours = target.getHours() - now.getHours();
        let minutes = target.getMinutes() - now.getMinutes();

        // Adjust if there is a negative value
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }
        if (days < 0) {
            const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
            days += lastMonth.getDate();
            months--;
        }
        if (months < 0) {
            months += 12;
            years--;
        }
        return {
            years: years,
            months: months,
            days: days,
            hours: hours,
            minutes: minutes,
            // seconds: seconds,
        };
    } else {
        return null;
    }
}
function createData(name, description, owner, date_fin, sprints, id) {
    const date = calculatePeriod(date_fin);
    // console.log("date", date);
    let period = "";
    if (date) {
        period = `${date.years !== 0 && date.years ? `${date.years} Years,` : ""} ${date.months !== 0 && date.months ? `${date.months} Month,` : ""} ${date.days !== 0 && date.days ? `${date.days} Days,` : ""} ${
            date.hours !== 0 && date.hours ? `${date.hours} Hours,` : ""
        }${
            date.minutes !== 0 && date.minutes ? `${date.minutes} minutes` : ""
        } `;
    } else {
        period = "Out Of Time";
    }
    const length = sprints.length;
    return { name, description, period, owner, length, id };
}
const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [searchProject, setSearchProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen,setOpen] = useState(false)
    const [projectID, setProjectID] = useState("");
    const handleSearchChange = (e) => {
        setSearchProject(e.target.value);
    };

    const handleEdit = (id) => {
        setIsEditing(true);
        setOpen(!isOpen)
        setProjectID(id);
    };
    const handleOpen = () => {
        setProjectID(0)
        setIsEditing(false)
        setOpen(!isOpen);
    }
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8000/api/projects/${id}`)
            .then((res) => {
                console.log(res.data);
                toast.dismiss();
                toast.success("Deleted Successfully!");
                setProjectID(null);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const closeEdit = () => {
        setOpen(!isOpen);
        setIsEditing(!isEditing)
    };
    const columns = [
        {
            id: "name",
            align: "left",
            label: "Name",
            minWidth: 50,
            fontWeight: 600,
        },
        {
            id: "description",
            align: "left",
            label: "Description",
            minWidth: 150,
            width: 190,
        },
        { id: "period", align: "left", label: "Period Left", minWidth: 100 },
        { id: "owner", align: "left", label: "Owner", minWidth: 100 },
        {
            id: "length",
            align: "left",
            label: "Sprints",
            minWidth: 20,
            width: 30,
        },
    ];
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`http://localhost:8000/api/projects?search=${searchProject}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((res) => {
                setLoading(false);
                console.log("resp",res.data)
                setProjects(res.data.success);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchProject, isEditing,isOpen, projectID]);
    if (loading) {
        return (
       <Loading/>
        );
    }

    const rows = [];
    projects.map((project) => {
        rows.push(
            createData(
                project.name,
                project.description,
                project.owner.name,
                project.date_fin,
                project.sprints,
                project.id
            )
        );
    });

    return (
        <>
            <Toaster />

            <div className="flex justify-between mb-7 items-center relative">
                {isOpen && (
                    <ProjectForm
                        closeEdit={closeEdit}
                        isEditing={isEditing}
                        projectID={projectID}
                    />
                )}
                <h1 className="font-bold text-gray-800 text-2xl ">Projects</h1>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 "
                            aria-hidden="true"
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
                        placeholder="Search For Project..."
                        value={searchProject}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <button onClick={()=>handleOpen()} className="bg-primaryColor text-white px-3 py-2 mb-4 rounded-lg hover:bg-primaryHover">Add Project</button>
            {projects.length > 0 ? (
                <div>
                    <TableProject
                        handleDelete={handleDelete}
                        closeEdit={closeEdit}
                        handleEdit={handleEdit}
                        columns={columns}
                        rows={rows}
                    />
                </div>
            ) : (
                <h1 className="text-gray-700 font-semibold text-xl">
                    No Project Yet
                </h1>
            )}
        </>
    );
};

export default Projects;
