import axios from "axios";
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    // const getUser = async () => {
    //     const token = localStorage.getItem('token')
    //     console.log("token",token)
    //     const axiosInstance = axios.create({
    //         baseURL: 'http://127.0.0.1:8000',
    //         headers: {
    //           'Authorization': `Bearer ${token}`,
    //           'Content-Type': 'application/json',
    //         },
    //       });

    //       axiosInstance.get('/api/user').then(response => {
    //           console.log(response.data);
    //           setCurrentUser(response.data)
    //       }).catch(error => {
    //         console.error("The error of get",error);
    //       });

    // }

    const getUser = async () => {
   
        
        axios
            .get("http://localhost:8000/api/me")
        .then((response) => {
            console.log(
                "user:",
                response
            );

           
        })
        .catch((error) => {
            console.log(error)
          
        })
       
    };

    const login = useCallback(async () => {

        console.log("ok logged")
    })
        useEffect(() => {
            if (!currentUser) {
                getUser();

            }
        },[currentUser])

    //  const authcontextValue = useMemo(()=> ({currentUser,login}),{currentUser,login})
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
