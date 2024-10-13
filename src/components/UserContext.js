import {createContext, useState } from "react";


const UserContext = createContext();


export const UserProvider = ({children}) =>  {
    const [user, setUser] = useState(null) // user object containing username and password


    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;