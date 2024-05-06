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


    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:8000/api/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    });
                    setCurrentUser(response.data.user);
                    setIsLoading(false);
                } catch (error) {
                    console.log("Error fetching user:", error);
                }
            }
        };
    
            getUser();
        
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser,isLoading,setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);

