import React from 'react';
import './style.scss';
import {Button} from "../../components/Button";

export const Start = () => {
  return (
    <div className="start container">
      <h1 className="title-one start__title">
        Добро пожаловать в игру "<span className="underline">Поля да кубики</span>"
      </h1>
      <p className="paragraph start__paragraph">
        Нажмите "Далее", чтобы перейти к конфигурации игры
      </p>
      <Button linkPath="/configuration">Далее ⇨</Button>
    </div>
  )
};