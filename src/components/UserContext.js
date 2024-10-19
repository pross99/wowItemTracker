import {createContext, useState } from "react";


const UserContext = createContext({
    userId: null, //defaultt value when user is not logged in
    setUserId: () => {},
});


 export const UserProvider = ({children}) =>  {
    const [user, setUser] = useState(null) // user object containing username and password
    const [userId, setUserId] = useState(null) // intially, no user is logged in - can this be changed to demo user later?

    const login = (id) => {
        setUserId(id);
        console.log(userId)
    }

    return (
        <UserContext.Provider value={{user, setUser,userId, login}}>
            {children}
        </UserContext.Provider>
    );
};


export default UserContext;