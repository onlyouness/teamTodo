import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import DateFormat from "../DateFormat";
import axios from "axios";
import Loading from "../Loading";

const Comments = ({ taskID, taskComments }) => {
    const [commentTask, setCommentTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        setComments(taskComments)
    }, [taskID]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const newItem = {
            task_id: taskID,
            content: commentTask,
        };
        axios
            .post(
                `http://localhost:8000/api/comments`,
                { newItem },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            )
            .then((response) => {
                setLoading(true);
                console.log(response);
                setComments(response.data.comments);
                setLoading(false);
                setCommentTask("");
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the project details!",
                    error
                );
            });
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="relative pb-2 mt-5">
            <h1 className="font-semibold mb-2">Comments:</h1>
            <div>
                <form
                    action=""
                    onSubmit={(e) => handleSubmit(e)}
                    className="relative flex justify-center items-center gap-4"
                >
                    <input
                        type="text"
                        id="default-search"
                        className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Leave a comment..."
                        value={commentTask}
                        required
                        onChange={(e) => {
                            setCommentTask(e.target.value);
                        }}
                    />
                    <button className="bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold">
                        Post
                    </button>
                </form>
            </div>
            <div>
                {comments.map((comment) => {
                    return (
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-2 flex-col border-b py-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex justify-center items-center gap-3">
                                        <Avatar
                                            sx={{
                                                width: "25px",
                                                height: "25px",
                                            }}
                                            src={`http://127.0.0.1:8000/${comment.user?.image}`}
                                        />{" "}
                                        <p className="font-medium text-gray-600">
                                            {comment.user?.name}
                                        </p>
                                    </div>
                                    <DateFormat
                                        DateProvided={comment.created_at}
                                    />
                                </div>
                                <div className="text-gray-600">
                                    {comment.content}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Comments;
