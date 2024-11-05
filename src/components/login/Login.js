import { useState, useContext } from "react";
import './Login.css'
import axiosInstance from "../../api/axiosConfig";
import UserContext from "../UserContext";
import { useAuth } from "./AuthProvider";
import  {jwtDecode } from 'jwt-decode';


export default function Login(props) {
    const [username, setUsername] = useState ('')
    const [password, setPassword] = useState ('')
    const [error, setError] = useState(null); // FOR ERRORS
    const [isLoading, setIsLoading] = useState(false)
    const { setUser } = useContext(UserContext); //  Get the setUser finction form context - has been refactored, marked for deletion
    const { login } = useContext(UserContext)
    const { login2 } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
       setIsLoading(true)
        setError(null) // reseting error state
            try {
              await axiosInstance.post(`api/v1/auth/login`, {
                username,
                password
              })
              .then(response => {
                const token = response.data.token;
                const userData = {
                  username: response.data.username, // Username of the logged-in user
                  userId: response.data.userId,
                }
              const decoded = jwtDecode(token);

               console.log("New token decoded:", decoded);
              console.log("Token exp:", decoded.exp * 1000);
              console.log("Current time:", Date.now());
              console.log("Time until expiry (minutes):", 
              Math.round((decoded.exp * 1000 - Date.now()) / 1000 / 60));
                console.log(response)
               /*  const loggedInUser = response.data.username;
                const loggedUserId = response.data.userId
                const loggedinUserId = response.data.userId
                setUser({username: loggedInUser}); // Need to set the fetched user in order to fetch associated items and username display
                setUser({userId: loggedinUserId});  Has been refractored, marked for deletion */ 
               // login({userId: loggedUserId});
                
                login2(token,userData) // using the function from AuthProvider

                props.toggle();
              });
              
            } catch (error) {
                setError("Login failed. Please check your credentials.");
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };



          return (
            <div className="popup">
                <div className="popup-inner">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <label>
                            Username:
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                            required 
                            />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                            required />
                        </label>
                        <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button onClick={props.toggle}>Close</button>
                </div>
            </div>
          )
    }
