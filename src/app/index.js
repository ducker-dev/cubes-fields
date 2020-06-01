import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {PlayerState} from "./context/Player/PlayerState";
import {AlertState} from "./context/Alert/AlertState";
import {GameState} from "./context/Game/GameState";

import {Start} from "./pages/Start/index";
import {Configuration} from "./pages/Configuration/index";
import {Game} from "./pages/Game/index";
import {NotFound} from "./pages/NotFound";

import {Alert} from "./components/Alert";
import './style.scss';

function App() {
    return (
        <BrowserRouter>
            <AlertState>
                <Alert/>
                <PlayerState>
                    <GameState>
                        <Switch>
                            <Route path="/" exact component={Start}/>
                            <Route path="/configuration" exact component={Configuration}/>
                            <Route path="/game" exact component={Game}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </GameState>
                </PlayerState>
            </AlertState>
        </BrowserRouter>
    );
}

export default App;
