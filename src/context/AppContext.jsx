import React, { createContext, useContext} from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext();

export const useApp = () => {
    return useContext(AppContext);
};


export const AppProvider = ({ children }) => {

    const notify = (message, error = false) => {
        let options = {
            position: "bottom-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        }
        error ? toast.error(message, options) : toast.success(message, options)
    }

    return (
        <AppContext.Provider value={{
            notify,
        }}>
            {children}
            <ToastContainer />
        </AppContext.Provider>
    );
};
