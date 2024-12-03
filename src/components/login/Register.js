import { useState, useContext } from "react";
import './Register.css'
import axiosInstance from "../../api/axiosConfig";
import axios from "axios";
import  {jwtDecode } from 'jwt-decode';
import { useAuth } from "./AuthProvider";



export default function Register(props) {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [charServer, setCharServer] = useState('')
    const [charName, setCharName] = useState('')
    const [error, setError] = useState(null); // FOR ERRORS
    const [isLoading, setIsLoading] = useState(false)
    const { login2 } = useAuth();

    const BATTLE_NET_TOKEN = process.env.REACT_APP_BATTLE_NET_TOKEN;

    const handleCharServerChange = (e) => {
        setCharServer(e.target.value.toLowerCase())
    }

    const handleCharNameChange = (e) => {
        setCharName(e.target.value.toLowerCase())
    }



    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError(null)
        try {
            const registerResponse = await axiosInstance.post(`api/v1/auth/register`, {
                username,
                password,
                charName,
                charServer
            })
           
                const token = registerResponse.data.token;
                const userData = {
                  username: registerResponse.data.username, // Username of the logged-in user
                  userId: registerResponse.data.userId,
                  charName: registerResponse.data.charName,
                  charServer: registerResponse.data.charServer
                }
                const wowGetAvatar = await axios.get(`https://springtransmogapi5-714423430443.europe-west1.run.app/api/v1/battle-net/character-avatar?server=${userData.charServer}&characterName=${userData.charName}&accessToken=${BATTLE_NET_TOKEN}`, {
                  
                })
                console.log(wowGetAvatar.data)
                const avatarData = wowGetAvatar.data
                const decoded = jwtDecode(token);


            login2(token,userData, avatarData) // using the function from AuthProvider
             props.toggle();
            

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
                    <h4>The server and name below will be used to fetch your char from Blizzard</h4>
                    <label>
                        Server - Only EU realms:
                        <input type="text" value={charServer} onChange={handleCharServerChange} 
                        required />
                    </label>
                    <label>
                        Main Character Name:
                        <input type="text" value={charName} onChange={handleCharNameChange}
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