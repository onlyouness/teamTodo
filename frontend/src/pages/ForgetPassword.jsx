import React, { useState,useEffect } from "react";
import axios from "axios";
import {
    FormControl,
    FormLabel,
    Input,
    InputLabel,
    TextField,
    Button,
} from "@mui/material";
const ForgetPassword = () => {


    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState({ email: '' });
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
     
        axios
            .post(`http://localhost:8000/api/forget-password`, {email})
          .then((response) => {
                console.log(
                    "user logged in successfully:",
                    response.data.success
              );
              setErrors({ email: '' })
              setMessage(response.data.success);
           })
            .catch((error) => {
                console.log(error)
                setErrors(error.response.data);
                setMessage(null);
             
            })
    };
  

    return (
        <>
            <div className="flex  justify-center items-center flex-col gap-2 w-full">
                {!message ? <h1 className="text-gray-700 text-2xl font-semibold ">
                    Enter Your Email to Reset Password
                </h1>
                :     
                <p className="text-green-800 font-semibold bg-green-300 px-3 py-2 rounded">{message}</p>
            }
                <form
                    onSubmit={handleSubmit}
                    action=""
                    className=" mt-6 flex flex-col gap-4 w-1/2 max-w-lg"
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

                    <Button type="submit" variant="contained">
                        Reset
                    </Button>

                    
                </form>
            </div>
        </>
    );
};

export default ForgetPassword;
