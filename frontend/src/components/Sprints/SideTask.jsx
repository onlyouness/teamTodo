import React,{useEffect, useState} from "react";
import {
    ChevronLeftIcon,
    CalendarDaysIcon,
    QueueListIcon,
    XMarkIcon,
    ChevronDownIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import DateFormat from "../DateFormat";
import Comments from "./Comments";
import { useScroll } from "framer-motion";
const SideTask = ({ task, closeTask }) => {
    const [period,setPeriod] = useState("")
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
    const { id, title, desc, date_end, date_start, status, priority } = task;
    useEffect(() => {
        const date = calculatePeriod(date_end);
    
        if (date) {
           let periodLeft = `${date.years !== 0 && date.years ? `${date.years} Years,` : ""} ${date.months !== 0 && date.months ? `${date.months} Month,` : ""} ${date.days !== 0 && date.days ? `${date.days} Days,` : ""} ${
                date.hours !== 0 && date.hours ? `${date.hours} Hours,` : ""
            }${
                date.minutes !== 0 && date.minutes ? `${date.minutes} minutes` : ""
                } `;
            setPeriod(periodLeft)
        } else {
            // period = "Out Of Time";
            setPeriod("Out Of Time")
        } 
},[id])
    return (
        <article className="px-6 py-5">
            <div className="relative border-b pb-2">
                <h1 className="font-semibold">{title}</h1>
                <XMarkIcon
                    onClick={() => closeTask()}
                    className="w-5 text-gray-600 absolute top-0 cursor-pointer right-0"
                />
            </div>
            <div className="relative border-b pb-2 pt-4 flex flex-col gap-4">
                <h1 className="font-semibold">Details</h1>
                <div className="flex justify-start items-center gap-4">
                    <h1 className="text-gray-600">Team:</h1>
                    <p className="">{task.team.name}</p>
                </div>
                <div className="flex justify-start items-center gap-4">
                    <h1 className="text-gray-600">Status:</h1>
                    <p
                        className={` px-2 py-1 rounded-lg ${
                            status == "Completed" &&
                            "bg-green-100 text-green-800"
                        } ${
                            status == "Pending" &&
                            "bg-orange-100 text-orange-800"
                        } ${
                            status == "In progress" &&
                            "bg-blue-100 text-blue-800"
                        }`}
                    >
                        {status}
                    </p>
                </div>
                <div className="flex justify-start items-center gap-4">
                    <h1 className="text-gray-600">Priority:</h1>
                    <p
                        className={` capitalize rounded-lg px-2 py-1 ${
                            priority == "high" && "bg-red-100 text-red-800"
                        } ${
                            priority == "low" && "bg-green-100 text-green-800"
                        } ${
                            priority == "medium" &&
                            "bg-orange-100 text-orange-800"
                        }`}
                    >
                        {priority}
                    </p>
                </div>
                <div className="flex justify-start items-center gap-4">
                    <h1 className="text-gray-600">Assignee:</h1>
                    <p className="">{task.user.name}</p>
                </div>
            </div>
            <div className="relative mt-5 border-b pb-2">
                <h1 className="font-semibold">Dates</h1>
                <div className="flex justify-start items-center gap-6">
                    <h1 className="text-gray-600">Created:</h1>
                    <p className="">
                        <DateFormat DateProvided={date_start} />
                    </p>
                </div>
                <div className="flex justify-start items-center gap-4">
                    <h1 className="text-gray-600">Deadline:</h1>
                    <p className="">
                        {date_end ? (
                            <DateFormat DateProvided={date_end} />
                        ) : (
                            "-"
                        )}
                    </p>
                </div>
                <div className="flex justify-start items-center gap-4">
                    <h1 className="text-gray-600">Period left:</h1>
                    <p className="">
                        {period
                            
                    }
                    </p>
                </div>
            </div>
            <div className="relative border-b pb-2 mt-5">
                <h1 className="font-semibold mb-2">Description:</h1>
                <p>{desc}</p>
            </div>
            <div>
                <Comments taskID={id} taskComments={task?.comments}/>
           </div>
        </article>
    );
};

export default SideTask;
