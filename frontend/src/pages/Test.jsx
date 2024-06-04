import React, { useEffect, useState } from "react";
import axios from "axios";
const Test = () => {
    const [users, setUsers] = useState([]);

    // axios.get("http://localhost:4000/users").then((response) => {
    //     console.log(response);
    // });
    const fetchData = async () => {
        try {
            const resp = await fetch("http://localhost:4000/users");
            const data = await resp.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(() => {
       fetchData() 
    },[])
    return <div>Test</div>;
};

export default Test;
