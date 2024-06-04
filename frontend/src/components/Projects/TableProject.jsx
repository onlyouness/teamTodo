import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link ,useNavigate} from "react-router-dom";

import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

const TableProject = ({ columns, rows, handleEdit, handleDelete }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
  };
  const navigate = useNavigate();
    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Toaster />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow className="bg-gray-50">
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        fontWeight: 600,
                                        width: column?.width,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        fontWeight:
                                                            column?.fontWeight,
                                                    }}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key={row.id}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "5px",
                                                    justifyContent: "start",
                                                    alignItems: "start",
                                                }}
                                            >
                                                <EyeIcon onClick={()=> navigate(`/projects/${row.id}`)} className="w-5 cursor-pointer text-gray-700" />

                                                <PencilSquareIcon
                                                    onClick={() =>
                                                        handleEdit(row.id)
                                                    }
                                                    className="w-5 cursor-pointer text-gray-700"
                                                />
                                                <TrashIcon
                                                    onClick={() => {
                                                        toast(
                                                            <div>
                                                                <p>
                                                                    Are You Sure
                                                                    You Want To
                                                                    Delete it
                                                                </p>
                                                                <div className="flex justify-center items-center gap-4 mt-3">
                                                                    {" "}
                                                                    <button
                                                                        className="bg-red-300 p-2 rounded-lg hover:bg-red-500 text-white"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                row.id
                                                                            )
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        Yes
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            toast.dismiss()
                                                                        }
                                                                    >
                                                                        No
                                                                    </button>
                                                                </div>
                                                            </div>,
                                                            {
                                                                icon: (
                                                                    <TrashIcon className="w-7 text-red-500" />
                                                                ),
                                                            }
                                                        );
                                                    }}
                                                    className="w-5 cursor-pointer text-gray-700"
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default TableProject;
