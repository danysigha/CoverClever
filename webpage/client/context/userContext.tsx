import React from "react";
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { User } from "../../../CoverCleverExtension/app/src/types/User";

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    fetchUser: async () => {},
});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null >(null);
    
    const fetchUser = async () => {
        try {
            const {data} = await axios.get("/profile");
            setUser(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, fetchUser}}>
            {children}
        </UserContext.Provider>
    )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default UserContextProvider;