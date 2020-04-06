import { Client } from 'boardgame.io/react';
import { PlayerView } from 'boardgame.io/core';
import logger from 'redux-logger';
import { applyMiddleware, compose } from 'redux';
import PortRoyal from "./game";
import Board from "./board";

// TODO: expedition
// TODO: game board
// TODO: handle invalid moves: https://boardgame.io/documentation/#/immutability?id=invalid-moves

const App = Client({
  game: PortRoyal,
  board: Board,
  numPlayers: 3,
  playerView: PlayerView.STRIP_SECRETS,
  enhancer: compose(
    applyMiddleware(logger),
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())) });

export default App;
