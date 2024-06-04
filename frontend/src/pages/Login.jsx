import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { FormLabel, TextField, Button } from "@mui/material";
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const { getUser, setIsLogged, setIsLoading } = useContext(AuthContext);
    useEffect(() => {
        var urlParams = new URLSearchParams(window.location.search);
        var message = urlParams.get("message");
        if (message) {
            toast.success(message);

            // Remove the notification data from the URL parameters after displaying the notification
            history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const toastID = toast.loading("Logging in...");
        const newItem = {
            email: email,
            password: password,
        };

        axios
            .post("http://localhost:8000/api/login", newItem)
            .then((response) => {
                console.log("user logged in successfully:", response);

                const successMessage = response.data.success; // Assuming success message is stored under 'success' key
                setErrors({ name: "", email: "", password: "" });
                setPassword("");
                // After successful login
                localStorage.removeItem("token");
                localStorage.setItem("token", response.data.accessToken); // Store the token in local storage
                getUser();
                setIsLogged(true);

                // toast.success(successMessage);
                // <Navigate to={"/login"} />
                navigate("/?message=" + encodeURIComponent(successMessage));
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status == 422) {
                    const errorData = error.response.data.error;

                    setErrors(errorData);
                    console.log(errors);
                }
                if (error.response.status == 406) {
                    const errorData = error.response.data;
                    console.log(errors);
                    setErrors(errorData);
                    // Object.keys(errorData).forEach((field) => {
                    //     toast.error(`${field}: ${errorData[field]}`);
                    // });
                }
                setPassword("");
            })
            .finally(() => {
                toast.dismiss(toastID);
            });
    };

    return (
        <>
            <Toaster />
            <div className="flex justify-center items-center flex-col gap-2 w-1/2 mx-auto shadow px-7 py-5 rounded-lg bg-white ">
                <h1 className="text-gray-700 text-2xl font-semibold ">
                    Log To Your account
                </h1>
                <p>Enter your email below to Login</p>
                <form
                    onSubmit={handleSubmit}
                    action=""
                    className=" mt-6 flex flex-col gap-4 w-full  max-w-lg"
                >
                    <div className="flex flex-col gap-2 ">
                        <FormLabel>Email Adress:</FormLabel>
                        <TextField
                            error={errors.email}
                            helperText={errors.email}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="m@gmail.com"
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <FormLabel>Password:</FormLabel>
                        <TextField
                            error={errors.password}
                            helperText={errors.password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>
                    <div className="flex gap-2 ">
                        <Link
                            to={"/forget-password"}
                            className="flex items-center text-gray-900 rounded-lg  hover:underline  group"
                        >
                            <span className="flex-1 whitespace-nowrap">
                                Forget Password?
                            </span>
                        </Link>
                    </div>

                  
                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                    

                    <div className="flex gap-2 ">
                        <p>Don't have an account?</p>
                        <Link
                            to={"/register"}
                            className="flex items-center text-gray-900 rounded-lg  hover:underline  group"
                        >
                            <span className="flex-1 whitespace-nowrap">
                                Sign Up
                            </span>
                        </Link>
                    </div>

                    <div className="my-10 relative">
                        <div className=" h-px bg-gray-300"></div>
                        <span className=" text-sm px-2 py-4 bg-white absolute left-1/3 -top-7 text-gray-600">
                            Or Continue With
                        </span>
                    </div>
                    <div className="flex justify-center items-center w-full">
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                const crendentialResposeDecoded = jwtDecode(
                                    credentialResponse.credential
                                );
                                console.log(crendentialResposeDecoded);
                                const newItem = {
                                    name: crendentialResposeDecoded.name,
                                    email: crendentialResposeDecoded.email,
                                    image: crendentialResposeDecoded.picture,
                                    password: "1234",
                                    google: true,
                                    verified:
                                        crendentialResposeDecoded.email_verified,
                                };
                                // console.log(newItem)

                                axios
                                    .post(
                                        "http://localhost:8000/api/login",
                                        newItem
                                    )
                                    .then((response) => {
                                        console.log(
                                            "user created successfully:",
                                            response.data.success
                                        );
                                        const successMessage =
                                            response.data.success; // Assuming success message is stored under 'success' key
                                        console.log(
                                            "Success message:",
                                            successMessage
                                        );
                                        localStorage.removeItem("token");
                                        localStorage.setItem(
                                            "token",
                                            response.data.accessToken
                                        ); // Store the token in local storage
                                        getUser();
                                        setIsLogged(true);
                                        navigate(
                                            "/?message=" +
                                                encodeURIComponent(
                                                    successMessage
                                                )
                                        );
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "Error creating item:",
                                            error.response
                                        );
                                    });
                            }}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
