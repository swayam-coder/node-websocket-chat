import React, { useContext, useState} from 'react'

const usercontext = React.createContext();

export const User = () => useContext(usercontext);

export function UserContext({ children }) {
    const [userCurrent, setUserCurrent] = useState(" ");

    return (
        <usercontext.Provider value={{userCurrent, setUserCurrent}}>
            {children}
        </usercontext.Provider>
    )
}