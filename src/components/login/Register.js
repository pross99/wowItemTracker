import { useState, useContext } from "react";
import './Register.css'
import axiosInstance from "../../api/axiosConfig";
import  {jwtDecode } from 'jwt-decode';
import { useAuth } from "./AuthProvider";



export default function Register(props) {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState(null); // FOR ERRORS
    const [isLoading, setIsLoading] = useState(false)
    const { login2 } = useAuth();



    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError(null)
        try {
            await axiosInstance.post(`api/v1/auth/register`, {
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


            login2(token,userData) // using the function from AuthProvider
             props.toggle();
            })

        }catch(error) {
            setError("Something failed");
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    };
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
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
                    {isLoading ? 'Creating...' : 'Register'}
                    </button>
                </form>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button onClick={props.toggle}>Close</button>
            </div>
        </div>
      )
}