import { useState, useContext, createContext, useEffect } from "react";
const AppContext = createContext(null);

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppProvider = ({ children }) => {
    const [isUser , setIsUser] = useState(true);
    const [admin , setAdmin] = useState(null);
    const [user,setUser]=useState(null);
    const [isAdmin , setIsAdmin]=useState(true);


    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {
        user,
        setUser,
        isUser,
        setIsUser,
        admin,
        setAdmin,
        backendUrl,
        setIsAdmin,
        isAdmin,
    }
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

