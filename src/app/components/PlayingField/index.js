import React, {useContext} from 'react';
import './style.scss';
import {GameContext} from "../../context/Game/gameContext";
import {PlayerContext} from "../../context/Player/playerContext";
import {Button} from "../Button";
import {PlayerCard} from "../PlayerCard";
import {AlertContext} from "../../context/Alert/AlertContext";

export const PlayingField = () => {
  const numberRows = 18;
  const numberColumns = 27;
  const createRows = Array(numberRows).fill('');
  const createColumns = Array(numberColumns).fill('');
  const styleRows = {gridTemplateRows: `repeat(${numberRows}, 1fr)`};
  const styleColumns = {gridTemplateColumns: `repeat(${numberColumns}, 1fr)`};

  const {gameState, getFirst, throwCubes, resetCubes, addingField, addingPoints, changeActive} = useContext(GameContext);
  const {playerState} = useContext(PlayerContext);
  const {showAlert} = useContext(AlertContext);
  const activePlayer = playerState.players[gameState.activePlayer];

  const accentSpan = (value) => (
    <span
      className="wrapper-field__accent"
      style={{backgroundColor: activePlayer.color}}
    >
      {value}
    </span>
  );

  const takeGameStep = () => {
    if (gameState.gameStage >= 2 && gameState.cubes.cubeOne !== null) {
      if (gameState.gameStage <= 10) {
        addingPoints({id: activePlayer.id, value: 140});
        changeActive();
        resetCubes();
      } else {
        console.log('Game over!')
      }
    }
  };

  // const doesLogicRun = gameState.gameStage >= 2 && gameState.cubes.cubeOne !== null;
  const doesLogicRun = true;
  const playingFieldRef = React.createRef();
  const wrapperFieldRef = React.createRef();

  function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset,
    }
  }

  function mouseMoveLogic(event) {
    if (doesLogicRun) {
      // console.log(getCoords(playingFieldRef.current));
    }
  }

  function mouseDownLogic(event) {
    if (doesLogicRun) {
      const coordsPlayingField = getCoords(playingFieldRef.current);
      const startDrawingPlayer = playerState.players.map((player, index) => {
        const coordsStartDrawing = [
          {
            x: coordsPlayingField.left,
            y: coordsPlayingField.top,
            round: 'one'
          },
          {
            x: coordsPlayingField.right,
            y: coordsPlayingField.bottom,
            round: 'two'
          },
          {
            x: coordsPlayingField.left,
            y: coordsPlayingField.bottom,
            round: 'three'
          },
        ];
        return {
          ...coordsStartDrawing[index],
          id: player.id
        }
      });
      console.log(coordsPlayingField);
      console.log(startDrawingPlayer);
      const startPosition = startDrawingPlayer.find(item => item.id === activePlayer.id);
      const coordinateDifferenceX = Math.abs(event.pageX - startPosition.x) <= 30;
      const coordinateDifferenceY = Math.abs(event.pageY - startPosition.y) <= 30;

      if (coordinateDifferenceX && coordinateDifferenceY) {
        const drawElement = document.createElement('div');
        drawElement.classList.add('playing-field__player-field');
        Object.assign(drawElement.style, {
          top: `${startPosition.round === "one" ? startPosition.y :  startPosition.y - 31}px`,
          left: `${startPosition.round === "one" ? startPosition.x :  startPosition.x - 31}px`,
          width: "31px",
          height: "31px",
          backgroundColor: activePlayer.color,
          borderColor: activePlayer.color,
        });
        drawElement.innerText = '3';
        wrapperFieldRef.current.append(drawElement);
      } else {
        showAlert({type: "error", text: "Вы начали рисовать вне стартовой ячейки."})
      }

      playingFieldRef.current.addEventListener('mousemove', mouseMoveLogic);
    }
  }

  function mouseUpLogic() {
    if (doesLogicRun) {
      console.log('mouseUpLogic');
      playingFieldRef.current.removeEventListener('mousemove', mouseMoveLogic);
    }
  }

  return (
    <div className="wrapper-field" ref={wrapperFieldRef}>
      <div
        className="playing-field"
        ref={playingFieldRef}
        onClick={takeGameStep}
        onMouseDown={mouseDownLogic}
        onMouseUp={mouseUpLogic}
      >
        {
          playerState.players.map((player, index) => (
            <div
              key={player.id}
              style={{borderColor: player.color}}
              className={`player-area player-area_${index + 1}`}
            />
          ))
        }
        <div className="playing-field__rows" style={styleRows}>
          {
            createRows.map((_, index) => {
              return (
                <div key={index} className="playing-field__row"/>
              )
            })
          }
        </div>
        <div className="playing-field__columns" style={styleColumns}>
          {
            createColumns.map((_, index) => {
              return (
                <div key={index} className="playing-field__column"/>
              )
            })
          }
        </div>

      </div>
      <div className="interaction-field">
        {
          gameState.activePlayer === null && (
            <>
              <p className="paragraph wrapper-field__paragraph">
                Давайте решим, кто будет ходить первым:
              </p>
              <Button
                className="interaction-field__button"
                onClick={() => getFirst()}
              >
                Запустить рандом
              </Button>
            </>
          )
        }
        {
          gameState.activePlayer !== null && (
            <>
              {
                gameState.gameStage >= 3
                  ? (
                    <p className="paragraph wrapper-field__paragraph">
                      Идем по порядку, теперь очередь за игроком с ником:
                    </p>
                  )
                  : (
                    <p className="paragraph wrapper-field__paragraph">
                      Рандом решил, что первым начнет играть:
                    </p>
                  )
              }

              <PlayerCard name={activePlayer.name} color={activePlayer.color}/>

              {
                gameState.gameStage <= 3 && (
                  <p className="paragraph wrapper-field__paragraph">
                    Теперь {accentSpan(activePlayer.name)} тебе нужно подбросить кубики, чтобы узнать размер твоей
                    фигуры.
                  </p>
                )
              }
              {
                gameState.cubes.cubeOne === null && (
                  <Button
                    className="interaction-field__button"
                    onClick={() => throwCubes()}
                  >
                    Подбросить 2 кубика
                  </Button>
                )
              }

            </>
          )
        }
        {
          (gameState.cubes.cubeOne !== null && gameState.gameStage === 2) && (
            <>
              <p className="paragraph wrapper-field__paragraph">
                У первого кубика выпало число {accentSpan(gameState.cubes.cubeOne)}, что является шириной, а у второго
                число {accentSpan(gameState.cubes.cubeTwo)}, что является высотой.
              </p>
              <p className="paragraph wrapper-field__paragraph">
                То есть тебе нужно нарисовать на игровом поле
                фигуру {accentSpan(gameState.cubes.cubeOne)} x {accentSpan(gameState.cubes.cubeTwo)}.
              </p>
            </>
          )
        }
        {
          (gameState.cubes.cubeOne !== null && gameState.gameStage > 2) && (
            <>
              <p className="paragraph wrapper-field__paragraph">
                На этот раз рандом выдал следующую для рисования фигуру с
                размерами {accentSpan(gameState.cubes.cubeOne)} x {accentSpan(gameState.cubes.cubeTwo)}.
              </p>
            </>
          )
        }
      </div>
    </div>
  )
};