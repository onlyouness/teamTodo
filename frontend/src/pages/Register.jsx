import React, { useState,useEffect,useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import {
    FormControl,
    FormLabel,
    Input,
    InputLabel,
    TextField,
    Button,
} from "@mui/material";
import Dashboard from "./Dashboard";
function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image,setImage] = useState('')
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });
    const { getUser,setIsLogged } = useContext(AuthContext);
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
       
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(image)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image); 
        formData.append("email", email);
        formData.append("password", password);
    
     
        console.log("items: ",formData)

        axios
            .post("http://localhost:8000/api/register", formData,{headers: {
                'Content-Type': 'multipart/form-data'
              }})
            .then((response) => {
                console.log(
                    "user created successfully:",
                    response.data.success
                );
                localStorage.removeItem("token");
                localStorage.setItem("token", response.data.accessToken); // Store the token in local storage
                const successMessage = response.data.success; // Assuming success message is stored under 'success' key
                setErrors({ name: '', email: '', password: '' })
                setPassword("")
                // toast.success(successMessage);
                getUser();
                setIsLogged(true)
                navigate("/?message=" + encodeURIComponent(successMessage));
            })
            .catch((error) => {
                const errorData = error.response.data.error;
                setErrors(errorData);
                setPassword("")
            });
        
           
    };
   
    
    return (
        <>
            <Toaster />
            <div className="flex  justify-center items-center flex-col gap-2 w-1/2 mx-auto shadow px-7 py-5 rounded-lg bg-white ">
                <h1 className="text-gray-700 text-2xl font-semibold ">
                    Create an account
                </h1>
                <p>Enter your email below to create your account</p>
                <form
                    onSubmit={handleSubmit}
                    action=""
                    className=" mt-6 flex flex-col gap-4 w-full max-w-lg"
                >
                    <div className="flex flex-col gap-2 ">
                        <FormLabel>Name:</FormLabel>
                        <TextField
                             error = {errors.name}
                             helperText={errors.name}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                            label="Adam Flexer"
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <FormLabel>Email Adress:</FormLabel>
                        <TextField
                            error = {errors.email}
                            helperText={errors.email}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="m@gmail.com"
                        />
                    </div>
                    {/* <div className="flex flex-col gap-2 ">
                        <FormLabel>Image File:</FormLabel>
                        <TextField
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div> */}
                    <div className="flex flex-col gap-2 ">
                        <FormLabel>Password:</FormLabel>
                        <TextField
                             error = {errors.password}
                             helperText={errors.password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                        />
                    </div>

                    <Button type="submit" variant="contained">
                        Register
                    </Button>

                    <div className="flex gap-2 ">
                      <p>Already Have An Account!</p>
                      <Link to={'/login'} className="flex items-center text-gray-900 rounded-lg  hover:underline  group">
           
               <span className="flex-1 whitespace-nowrap">Sign in</span>
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
                                    verified: crendentialResposeDecoded.email_verified,
                                   
                                };
                                // console.log(newItem)

                                axios
                                    .post(
                                        "http://localhost:8000/api/register-google",
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
                                        localStorage.setItem("token", response.data.accessToken); // Store the token in local storage
                                        getUser();
                                        setIsLogged(true)
                                        navigate("/?message=" + encodeURIComponent(successMessage));

                                        // toast.success(successMessage);
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
}

export default Register;
