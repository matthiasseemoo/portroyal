import { Client } from 'boardgame.io/react';
import { PlayerView } from 'boardgame.io/core';
import logger from 'redux-logger';
import { applyMiddleware, compose } from 'redux';
import PortRoyal from "./game";
import Board from "./board";
import { SocketIO } from 'boardgame.io/multiplayer';
import { Local } from 'boardgame.io/multiplayer';
import React from 'react';

const PortRoyalClient = Client({
  game: PortRoyal,
  board: Board,
  playerView: PlayerView.STRIP_SECRETS,
//  debug: true,
  debug: false,
  multiplayer: SocketIO({ server: '192.168.188.101:8000' }),
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <PortRoyalClient playerID={this.state.playerID} />
      </div>
    );
  }
}

export default App;
