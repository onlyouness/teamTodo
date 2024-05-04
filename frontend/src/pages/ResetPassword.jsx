import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import {
    FormControl,
    FormLabel,
    Input,
    InputLabel,
    TextField,
    Button,
} from "@mui/material";

const ResetPassword = () => {
    // const { token } = match.params;.
    const navigate = useNavigate()
    const { token } = useParams();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [changed,setChanged] = useState(false)
    const [errors,setErrors] = useState({  password: '',confirmed_password:'' })

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/reset/${token}`)
            .then((response) => {
                console.log(response);
                setUser(response.data.user);
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement password reset logic here
        const newItem = {
            password: password,
            confirmed_password : cpassword,
  
        };
        axios
        .post(`http://localhost:8000/api/confirm-reset/${token}`, newItem)
      .then((response) => {
            console.log(
                "response:",
                response.data
          );
        
          
            setErrors({  password: '',confirmed_password :"" })
          setPassword("")
          setCPassword("")
          const message = response.data.success;
          setChanged(true)
          console.log(message)
          toast.success(message);
          // navigate("/");
          
        })
        .catch((error) => {
         console.log("error",error)
            const errorData = error.response.data.error;
            console.log(errorData)
            setErrors(errorData);
            setPassword("")
            setCPassword("")
        })
    
    };

    if (!user) {
        return <div>Loading...</div>;
    }
    if (changed) {
        return <div>
            <h1 className="text-2xl text-gray-800">
            The Password Changed Successfully!

            </h1>
            <div className="text-blue-700 text-xl underline hover:text-blue-800 hover:no-underline">
            <Link to={"/"}>Go Back</Link>
                
          </div>
            


        </div>;
    }

    return (
        <div>
            <Toaster />
            <h2 className="text-2xl text-gray-700">Reset Password</h2>
            <form
                onSubmit={handleSubmit}
                action=""
                className="mt-6 flex flex-col gap-4 w-1/2 max-w-lg"
            >
                <div className="flex flex-col gap-2 ">
                    <FormLabel>New Password:</FormLabel>
                    <TextField
                         error = {errors.password}
                         helperText={errors.password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </div>
                <div className="flex flex-col gap-2 ">
                    <FormLabel>Confirm Password:</FormLabel>
                    <TextField
                         error = {errors.confirmed_password}
                         helperText={errors.confirmed_password}
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        type="password"
                    />
                </div>

                <Button type="submit" variant="contained">
                    Reset
                </Button>
            </form>
        </div>
    );
};

export default ResetPassword;
