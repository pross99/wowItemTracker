import { createContext, useContext, useState, useEffect } from 'react';
import  {jwtDecode } from 'jwt-decode';
import UserContext from '../UserContext';


const AuthContext = createContext(null);




export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem("user"))
        console.log("STORED USER", storedUser)
    

        console.log("Initial token check:", token ? "Token exists" : "No token");

        if(token) {

            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now();
                const expiryTime = decoded.exp * 1000;
                const timeUntilExpiry = expiryTime - currentTime

                console.log("Token expiry details", {
                    currentTime,
                    expiryTime,
                    timeUntilExpiry: Math.round(timeUntilExpiry / 1000 / 60) + "minutes",
                    decoded
                });

                const isExpired = expiryTime < currentTime;
            

                if (!isExpired) {
                    console.log("Setting logged in to TRUE");
                    setIsLoggedIn(true)
                    setUser(storedUser)
                } else{
                    console.log("Token expired, removing");
                    localStorage.removeItem('token')
                    setIsLoggedIn(false);
                } 
            } catch(error) {
                console.error("INVALID TOKEN", error)
                localStorage.removeItem("token"); // remove invalid token
                setIsLoggedIn(false);
            }
            
        }

    }, []); // Empty dependency array means this runs once on mount

    const login2 = (token, userData) =>  {
        localStorage.setItem('token', token);
        localStorage.setItem('user',JSON.stringify(userData))
        setIsLoggedIn(true)
        setUser(userData)
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login2, logout, user, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);