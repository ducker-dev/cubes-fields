import React, {useContext, useState, useEffect} from 'react';
import {Button} from "../../components/Button";
import {PlayerCard} from "../../components/PlayerCard";
import {PlayerContext} from "../../context/Player/playerContext";
import {AlertContext} from "../../context/Alert/AlertContext";
import './style.scss';

export const Configuration = () => {
    const {playerState, addPlayer, addNumberPlayers, changeIteration, removeColor} = useContext(PlayerContext);
    const {showAlert} = useContext(AlertContext);
    const [radioState, setRadioState] = useState('');

    useEffect(() => {
        setRadioState(playerState.playerColors[0].value);
    }, [playerState]);

    const addIteration = playerState.addIteration !== playerState.numberPlayers
        ? playerState.addIteration + 1
        : playerState.numberPlayers;

    const submitNumberPlayers = event => {
        event.preventDefault();
        addNumberPlayers(+event.target.number.value);
    };
    const submitPlayer = event => {
        event.preventDefault();
        if (playerState.addIteration === playerState.numberPlayers) {
            showAlert({type: "error", text: `Вы уже добавили всех пользователей.`})
        } else {
            if (!event.target.name.value) {
                showAlert({text: `Вы не указали имя для ${addIteration}-го пользователя.`})
            }
            if (event.target.name.value) {
                if (document.activeElement) document.activeElement.blur();
                addPlayer({
                    id: Date.now(),
                    name: event.target.name.value,
                    color: event.target.color.value
                });
                changeIteration();
                removeColor(event.target.color.value);
                event.target.name.value = '';
            }
        }
    };

    return (
        <div className="configuration container">
            <Button linkPath="/">⇦ На главную</Button>
            <h1 className="title-one">Конфигурация игры</h1>

            {
                playerState.numberPlayers === 0 && (
                    <>
                        <p className="paragraph configuration__paragraph">
                            Выберите кол-во игроков:
                        </p>
                        <form
                            className="form-one"
                            onSubmit={submitNumberPlayers}
                        >
                            <div className="form-one__content">
                                <label className="form-one__label">
                                    <input className="form-one__input" type="radio" name="number" value="2"
                                           defaultChecked/>
                                    <span className="form-one__fake-input">2</span>
                                </label>
                                <label className="form-one__label">
                                    <input className="form-one__input" type="radio" name="number" value="3"/>
                                    <span className="form-one__fake-input">3</span>
                                </label>
                            </div>
                            <Button>Выбрать</Button>
                        </form>
                    </>
                )
            }

            {
                (playerState.numberPlayers !== 0) && (
                    <div
                        className={
                            `adding-users${playerState.addIteration === playerState.numberPlayers
                                ? " adding-users_disable"
                                : ''}`
                        }>
                        <p className="paragraph configuration__paragraph">
                            Введите данные для всех пользователей:
                        </p>
                        <form className="form-two" onSubmit={submitPlayer}>
                            <div className="form-two__content">
                                <input
                                    className="form-two__text-input"
                                    name="name"
                                    type="text"
                                    placeholder={`Как зовут ${addIteration}-го пользователя?`}
                                />
                                <div className="form-two__radio-inputs-wrapper">
                                    {
                                        playerState.playerColors.map((color) => {
                                            return <label key={color.id} className="form-two__label">
                                                <input
                                                    className="form-two__radio-input"
                                                    type="radio"
                                                    name="color"
                                                    checked={color.value === radioState}
                                                    onChange={() => setRadioState(color.value)}
                                                    value={color.value}
                                                />
                                                <span
                                                    className="form-two__fake-radio-input"
                                                    style={{borderColor: color.value}}
                                                >
                                                    <span className="form-two__fake-radio-circle"
                                                          style={{backgroundColor: color.value}}/>
                                                </span>
                                            </label>
                                        })
                                    }
                                </div>
                            </div>

                            <Button>Добавить пользователя</Button>
                        </form>
                    </div>
                )
            }

            {
                playerState.players.length > 0 && (
                    <>
                        <p className="paragraph configuration__paragraph">
                            Созданные игроки:
                        </p>
                        <div className="players">
                            {
                                playerState.players.map(player => (
                                    <PlayerCard key={player.id} color={player.color} name={player.name}/>
                                ))
                            }
                        </div>
                        {
                            playerState.addIteration === playerState.numberPlayers && (
                                <Button linkPath="/game">Начать играть</Button>
                            )
                        }

                    </>
                )
            }
        </div>
    )
};