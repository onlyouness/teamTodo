import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({
    currentUser: null, // Initial value while data is loading
    setCurrentUser: () => { }, // Placeholder function
}
);

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState("");
    const [tasks,setTasksSecond] = useState({})


    const token = localStorage.getItem("token");
    const getUser =  async() => {
        if (token) {
            try {
                // axios.get("http://localhost:8000/api/me",{headers: {
                //     Authorization: `Bearer ${token}`,
                //     Accept: "application/json",
                // },
                // }).then((response) => {
                    
                //     setCurrentUser(response.data.user);
                //     setIsLoading(false);
                // }
                // )
                const response = await axios.get("http://localhost:8000/api/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });
                setCurrentUser(response.data.user);
                setIsLoading(false);
                console.log("success set the user")
            } catch (error) {
                console.log("Error fetching user:", error);
            }
        }
    };




    useEffect(() => {
    
        getUser();

        if (!token) {
            setIsLogged(false)  
            setIsLoading(false)
            setCurrentPage(1)
        } else {
            setIsLogged(true)
        }
        
    }, [isLogged,token]);

    return (
        <AuthContext.Provider value={{tasks,setTasksSecond,setCurrentPage,currentPage,setNextPageUrl,nextPageUrl, isLogged,setIsLogged,currentUser,getUser,isLoading,setIsLoading,setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);

