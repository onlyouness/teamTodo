import React, { useState } from "react";
import { Skeleton, Grid } from "@mui/material";
import ReactPaginate from "react-paginate"
import Task from "../components/Task";
import Pagination from "./Pagination";

function Tasks({ tasks,handleStatusChanging,handlePriorityChanging }) {

    console.log(tasks);
    return (
        <section>
            <Grid container  spacing={2} className="" >
                {tasks.data.map((task, index) => {
                    return (
                        <Grid item xs={12} sm={6} lg={4}>
                            <Task key={index} task={task} handlePriorityChanging={handlePriorityChanging} handleStatusChanging={handleStatusChanging} />
                        </Grid>
                    );
                })}
            </Grid>
            <section className="mx-4 my-4">
               <Pagination tasks={tasks} itemsPerPage={6} />
            </section>
        </section>
    );
}

export default Tasks;
