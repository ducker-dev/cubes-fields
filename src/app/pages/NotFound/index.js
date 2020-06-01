import React from 'react';
import './style.scss';
import {Button} from "../../components/Button";

export const NotFound = () => {
    return (
        <div className="not-found container">
            <h1 className="title-one not-found__title">
                "404". Страница не существует!
            </h1>
            <Button linkPath="/">На главную</Button>
        </div>
    )
};