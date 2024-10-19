import { useState, useContext } from "react";
import './Login.css'
import axiosInstance from "../../api/axiosConfig";
import UserContext from "../UserContext";


export default function Login(props) {
    const [username, setUsername] = useState ('')
    const [password, setPassword] = useState ('')
    const [error, setError] = useState(null); // FOR ERRORS
    const [isLoading, setIsLoading] = useState(false)
    const {setUser} = useContext(UserContext); //  Get the setUser finction form context
    const {userId, setUserId} = useState ('')
    const {login} = useContext(UserContext)

    const handleLogin = async (e) => {
        e.preventDefault();
       setIsLoading(false)
        setError(null) // reseting error state
            try {
              await axiosInstance.post(`api/v1/auth/login`, {
                username,
                password
              })
              .then(response => {
                console.log(response)
                console.log(response.data.username)
                console.log("LOOK HERE", response.data.userId)
                const loggedInUser = response.data.username;
                const loggedUserId = response.data.userId
                const loggedinUserId = response.data.userId

                setUser({username: loggedInUser});
                setUser({userId: loggedinUserId});
                login({userId: loggedUserId})
console.log("LOGIN", loggedInUser)
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
