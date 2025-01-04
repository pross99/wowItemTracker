import { createContext, useContext, useState, useEffect } from 'react';
import  {jwtDecode } from 'jwt-decode';
import UserContext from '../UserContext';
import axiosInstance from "../../api/axiosConfig";
import axios from 'axios';


const AuthContext = createContext(null);






export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null);
    const [avatarImage, setAvatarImage] = useState(null)
    const [bNetToken, setbNetToken] = useState(null)

   
const getAuthToken = async () => {
        const loginResponse = await axios.post(`https://tokengen-function-714423430443.europe-west1.run.app`,{
            headers: {
                'Content-Type': 'application/json',
            }, 
        });

        
        const sub = loginResponse.data.access_token
console.log('GET BNET TOKEN:',sub)
        setbNetToken(sub)
     //   setToken(loginResponse.data.secret)
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem("user"))
        const storedAvatar = JSON.parse(localStorage.getItem("avatarData"))
        const storedBNetToken = localStorage.getItem("bNetToken")
        console.log("STORED BNET TOKEN", storedBNetToken)
        getAuthToken();
        
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
                    setAvatarImage(storedAvatar)
                    setbNetToken(storedBNetToken)
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

    const login2 = (token, userData, avatarData, bNetToken) =>  {
        localStorage.setItem('token', token);
        localStorage.setItem('user',JSON.stringify(userData))
        localStorage.setItem('avatarData', JSON.stringify(avatarData))
        localStorage.setItem("bNetToken", bNetToken)
        setIsLoggedIn(true)
        setUser(userData)
        setAvatarImage(avatarData)
        setbNetToken(bNetToken)
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
    };

   

    return (
        <AuthContext.Provider value={{ isLoggedIn, login2, logout, user, avatarImage, setAvatarImage, setIsLoggedIn, bNetToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);