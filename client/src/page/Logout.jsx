import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth(); 

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logoutUser();
                navigate("/");
            } catch (error) {
                console.error("Logout failed:", error);
                
            }
        };

        handleLogout();
    }, [logoutUser, navigate]);
    return null;
};