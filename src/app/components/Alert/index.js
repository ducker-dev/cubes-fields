import React, {useContext} from 'react';
import {AlertContext} from "../../context/Alert/AlertContext";
import './style.scss';

export const Alert = () => {
    const {alertState} = useContext(AlertContext);
    const startText = {
        info: "Информация!",
        warning: "Внимание!",
        error: "Бедааа!",
        success: "Все гуууд!"
    };
    if (!alertState.visible) {
        return null
    }
    return (
        <div className={`alert alert_${alertState.type || 'warning'}`}>
            <strong>{startText[alertState.type || 'warning']}</strong>&nbsp;{alertState.text}
        </div>
    )
};