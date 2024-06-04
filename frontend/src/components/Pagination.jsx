import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

function Pagination({ tasks, itemsPerPage }) {
    const { setCurrentPage, currentPage } = useContext(AuthContext);

    let lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;

    const totalPages = tasks.last_page;

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (currentPage === tasks.last_page) {
        lastItemIndex = tasks.total;
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const lastPage = () => {
        if (currentPage >= 1) {
            setCurrentPage(tasks.last_page);
        }
    };
    const firstPage = () => {
        if (currentPage > 1) {
            setCurrentPage(1);
        }
    };
    return (
        <>
        <section
            style={{ justifyContent: "space-between", gap: "12px" }}
            className=" flex my-5 mr-4  flex-col md:flex-row"
        >
            <div>
                <p className="text-gray-400 mr-6">
                    Items {firstItemIndex + 1} - {lastItemIndex} of{" "}
                    {tasks.total} | Page {currentPage} of {tasks.last_page}
                </p>
            </div>
            <div className="flex gap-4">
                <div>
                    {currentPage === 1 ? (
                        <span className="text-gray-300">No Previous Page</span>
                    ) : (
                        <div className="flex justify-center items-center gap-3">
                            <button onClick={firstPage}>
                                <ChevronDoubleLeftIcon className="w-5 text-gray-500" />
                            </button>

                            <button
                                className="text-gray-500"
                                onClick={prevPage}
                            >
                                Previous
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    {currentPage === totalPages ? (
                        <span className="text-gray-300">No Next Page</span>
                    ) : (
                        <div className="flex justify-center items-center gap-3">
                            <button
                                className="text-gray-500"
                                onClick={nextPage}
                            >
                                Next
                            </button>
                            <button onClick={lastPage}>
                                <ChevronDoubleRightIcon className="w-5 text-gray-500" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            </section>
            
            </>
    );
}

export default Pagination;
