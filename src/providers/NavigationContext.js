import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const navigate = useNavigate();

    return (
        <NavigationContext.Provider value={navigate}>
             <Routes>
                {children}
             </Routes>
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    return useContext(NavigationContext);
};
