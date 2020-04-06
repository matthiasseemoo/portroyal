import React from 'react';
import PropTypes from 'prop-types';
import './board.css'
import './font.css'

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  tradeShip(cardIndex) {
    if (this.props.ctx.activePlayers[this.props.playerID] === 'discover') {
      this.props.moves.EndStage();
    }

    this.props.moves.TradeShip(cardIndex);
  }

  render() {

    let drawPileDisplay = [];
 
    if (this.props.G.secret !== undefined) {
      let drawPile = [];
      for (let i = 0; i < this.props.G.secret.drawPile.length; i++) {
        drawPile.push(<li style={{ display: 'inline' }}><img style={{ height: '8em' }} src={require('./images/' + this.props.G.secret.drawPile[i].imageFilename)} /></li>);
      }
      drawPileDisplay.push(
        <div>
          <h1>Draw Pile</h1>
          <ul style={{ overflow: 'auto', whiteSpace: 'nowrap', paddingInlineStart: '0' }}>
            {drawPile}
          </ul>
        </div>
      );
    }

    let shipToRepel = [];
    if (this.props.G.shipToRepel !== null) {
      shipToRepel.push(<li style={{ display: 'inline-block', position: 'relative',  }}><img style={{ height: '8em' }} src={require('./images/' + this.props.G.shipToRepel.imageFilename)} /><input style={{ position: 'absolute', left: '0px', bottom: '4em', width: '100%' }} type="button" value="Repel" onClick={() => this.props.moves.RepelShip(true)} /><input style={{ position: 'absolute', left: '0px', bottom: '6em', width: '100%' }} type="button" value="Keep" onClick={() => this.props.moves.RepelShip(false)} /></li>);
    }

    let harborDisplayShips = [];
    for (let i = 0; i < this.props.G.harborDisplayShips.length; i++) {
      harborDisplayShips.push(<li style={{ display: 'inline' }}><img onClick={() => this.tradeShip(i) } style={{ height: '8em' }} src={require('./images/' + this.props.G.harborDisplayShips[i].imageFilename)} /></li>);
    }

    let harborDisplayNonShips = [];
    for (let i = 0; i < this.props.G.harborDisplayNonShips.length; i++) {
      harborDisplayNonShips.push(<li style={{ display: 'inline' }}><img style={{ height: '8em' }} src={require('./images/' + this.props.G.harborDisplayNonShips[i].imageFilename)} /></li>);
    }

    let expeditionDisplay = [];
    for (let i = 0; i < this.props.G.expeditionDisplay.length; i++) {
      expeditionDisplay.push(<li style={{ display: 'inline' }}><img style={{ height: '8em' }} src={require('./images/' + this.props.G.expeditionDisplay[i].imageFilename)} /></li>);
    }

    let discardPile = [];
    for (let i = 0; i < this.props.G.discardPile.length; i++) {
      discardPile.push(<li style={{ display: 'inline' }}><img style={{ height: '8em' }} src={require('./images/' + this.props.G.discardPile[i].imageFilename)} /></li>);
    }

    let playerDisplay = [];
    if (this.props.playerID !== null) {
      for (let i = 0; i < this.props.G.playerDisplays[this.props.playerID].length; i++) {
        playerDisplay.push(<li style={{ display: 'inline' }}><img style={{ height: '8em' }} src={require('./images/' + this.props.G.playerDisplays[this.props.playerID][i].imageFilename)} /></li>);
      }
    }

    let otherPlayerDisplays = [];
    for (let i = 0; i < this.props.ctx.numPlayers; i++) {
      if (i !== parseInt(this.props.playerID)) {
        let playerDisplay = [];
        for (let j = 0; j < this.props.G.playerDisplays[i].length; j++) {
          playerDisplay.push(
            <li style={{ display: 'inline' }}>
              <img style={{ height: '8em' }} src={require('./images/' + this.props.G.playerDisplays[i][j].imageFilename)} />
            </li>
          );
        }
        otherPlayerDisplays.push(
          <div>
            <h1>Player {i}, <img style={{ height: '1em' }} src={require('./images/points.png')} />: {this.props.G.playerVictoryPoints[i]}, <img style={{ height: '1em' }} src={require('./images/coin.png')} />: {this.props.G.playerCoins[i]}, Swords: {this.props.G.playerSwords[i]}, Active: {(parseInt(this.props.G.activePlayer) === i) ? 'yes' : 'no'}, currently playing: {(parseInt(this.props.ctx.currentPlayer) === i) ? 'yes' : 'no'}</h1>
            <ul style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
              {playerDisplay}
            </ul>
          </div>
        );
      }
    }

    let activePlayerDisplay = [];
    if (this.props.playerID !== null) {
      activePlayerDisplay.push(
        <div>
          <h1>Player {this.props.playerID}, <img style={{ height: '1em' }} src={require('./images/points.png')} />: {this.props.G.playerVictoryPoints[this.props.playerID]}, <img style={{ height: '1em' }} src={require('./images/coin.png')} />: {this.props.G.playerCoins[this.props.playerID]}, Swords: {this.props.G.playerSwords[this.props.playerID]}, Active: {(this.props.G.activePlayer === this.props.playerID) ? 'yes' : 'no'}, currently playing: {(this.props.ctx.currentPlayer === this.props.playerID) ? 'yes' : 'no'}</h1>
          <ul style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
            {playerDisplay}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <div style={{ padding: '1em 1em 1em 1em', backgroundColor: '#990000' }} >
          <img style={{ height: '4em' }} src={require('./images/titlelogo.png')} />
        </div>
        <div style={{ padding: '1em' }} className="board">
          {otherPlayerDisplays}

          {drawPileDisplay}

          <div>
            <h1>Draw Pile and Harbor Display</h1>
            <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
              <ul style={{ display: 'inline', paddingInlineStart: '0' }}>
                <img style={{ height: '8em' }} src={require('./images/cardback.png')} onClick={() => this.props.moves.DrawCard()} />
              </ul>
              <ul style={{ display: 'inline' }}>
                {shipToRepel}
              </ul>
              <ul style={{ display: 'inline' }}>
                {harborDisplayShips}
              </ul>
              <ul style={{ display: 'inline' }}>
                {harborDisplayNonShips}
              </ul>
            </div>
          </div>
          <div>
            <h1>Expeditions</h1>
            <ul style={{ overflow: 'auto', whiteSpace: 'nowrap', paddingInlineStart: '0' }}>
              {expeditionDisplay}
            </ul>
          </div>
          <div>
            <h1>Discard Pile</h1>
            <ul style={{ overflow: 'auto', whiteSpace: 'nowrap', paddingInlineStart: '0' }}>
              {discardPile}
            </ul>
          </div>
          
          {activePlayerDisplay}
        </div>
      </div>
    );
  }
}

export default Board;