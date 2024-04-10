import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    
    const storeTokenLocalStorage = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }

    let isUserHaveToken = !!token;


    // logout the user
    const logoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

   
    return (
        <AuthContext.Provider value={{ storeTokenLocalStorage, logoutUser,isUserHaveToken}}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);

    if (!authContextValue) {
        console.error("useAuth used outside of the provider");
    }
    return authContextValue;
}