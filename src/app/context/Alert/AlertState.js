import React, {useReducer, useState} from 'react';
import {AlertContext} from "./AlertContext";
import {alertReducer} from "./alertReducer";
import {SHOW_ALERT, HIDE_ALERT} from "../types";

export const AlertState = ({children}) => {
    const initialState = {
        type: '',
        value: '',
        visible: false,
    };
    const [alertState, dispatch] = useReducer(alertReducer, initialState);
    const [runState, setRunState] = useState(true);

    const showAlert = ({type, text}) => {
        if (runState) {
            dispatch({type: SHOW_ALERT, payload: {type, text}});
            setTimeout(() => {
                setRunState(true);
                dispatch({type: HIDE_ALERT});
            }, 3000)
        }
        setRunState(false);
    };

    const hideAlert = () => dispatch({type: HIDE_ALERT});

    return (
        <AlertContext.Provider value={{
            alertState, showAlert, hideAlert
        }}>
            {children}
        </AlertContext.Provider>
    )
};