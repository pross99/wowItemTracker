import { useState, useContext } from "react";
import './Login.css'
import axiosInstance from "../../api/axiosConfig";
import axios from "axios";
import UserContext from "../UserContext";
import { useAuth } from "./AuthProvider";
import  {jwtDecode } from 'jwt-decode';



//const credentials = btoa(`${BATTLE_NET_CLIENT_ID}:${BATTLE_NET_CLIENT_SECRET}`);
//const secretEncoded = btoa(`${BATTLE_NET_CLIENT_SECRET}`)

export default function Login(props) {
    const [username, setUsername] = useState ('')
    const [password, setPassword] = useState ('')
    const [error, setError] = useState(null); // FOR ERRORS
    const [isLoading, setIsLoading] = useState(false)
    const { setUser } = useContext(UserContext); //  Get the setUser finction form context - has been refactored, marked for deletion
    const { login } = useContext(UserContext)
    const { login2 } = useAuth();

const BATTLE_NET_TOKEN = process.env.REACT_APP_BATTLE_NET_TOKEN;

    const handleLogin = async (e) => {
     
        e.preventDefault();
       setIsLoading(true)
        setError(null) // reseting error state
            try {

              const loginResponse = await axiosInstance.post(`api/v1/auth/login`, {
                username,
                password
              });


  
                const token = loginResponse.data.token;
                const userData = {
                  username: loginResponse.data.username, // Username of the logged-in user
                  userId: loginResponse.data.userId,
                  charName: loginResponse.data.charName,
                  charServer: loginResponse.data.charServer,
                
                }
                console.log("YOUR ACCESS TOKEN WOOPWOOP", userData.battleNetAccessToken);
                const wowGetAvatar = await axios.get(`https://springtransmogapi5-714423430443.europe-west1.run.app/api/v1/battle-net/character-avatar?server=${userData.charServer}&characterName=${userData.charName}&accessToken=${BATTLE_NET_TOKEN}`, {
                  
                })
                console.log(wowGetAvatar.data)
                const avatarData = wowGetAvatar.data
           
              

              const decoded = jwtDecode(token);
                login2(token,userData, avatarData) // using the function from AuthProvider
                props.toggle();
           
              
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
                            <p> HI {BATTLE_NET_TOKEN}</p>
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
