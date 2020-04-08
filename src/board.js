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

  componentWillMount() {
    setInterval(() => {
      if (this.props.G.endTurnAutomatically[this.props.ctx.currentPlayer] === true) {
        this.props.events.endTurn();
      }
    }, 100);
  }

  fulfillExpedition(cardIndex) {
    this.props.moves.FulfillExpedition(cardIndex);
  }

  tradeShip(cardIndex, playerId) {
    if (this.props.ctx.activePlayers[this.props.playerID] === 'discover') {
      this.props.moves.EndStage();
    }

    this.props.moves.TradeShip(cardIndex, playerId);
  }

  hirePerson(cardIndex) {
    if (this.props.ctx.activePlayers[this.props.playerID] === 'discover') {
      this.props.moves.EndStage();
    }

    this.props.moves.HirePerson(cardIndex);
  }

  render() {

    let drawPileDisplay = [];
    if (this.props.G.secret !== undefined) {
      let drawPile = [];
      for (let i = 0; i < this.props.G.secret.drawPile.length; i++) {
        drawPile.push(<li className='card'><img className='cardImage' src={require('./images/' + this.props.G.secret.drawPile[i].imageFilename)} /></li>);
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
      if (this.props.G.activePlayer === this.props.playerID) {
        shipToRepel.push(<li className='card' style={{ position: 'relative' }}><img className='cardImageLarge' src={require('./images/' + this.props.G.shipToRepel.imageFilename)} /><input style={{ position: 'absolute', left: '0px', bottom: '4em', width: '100%' }} type="button" value="Repel" onClick={() => this.props.moves.RepelShip(true)} /><input style={{ position: 'absolute', left: '0px', bottom: '6em', width: '100%' }} type="button" value="Keep" onClick={() => this.props.moves.RepelShip(false)} /></li>);
      } else {
        shipToRepel.push(<li className='card' style={{ position: 'relative' }}><img className='cardImage' src={require('./images/' + this.props.G.shipToRepel.imageFilename)} /></li>);
      }
    }

    let drawnTaxIncrease = [];
    if (this.props.G.drawnTaxIncrease !== null) {
      drawnTaxIncrease.push(<li className='card' style={{ position: 'relative' }}><img className='cardImage' src={require('./images/' + this.props.G.drawnTaxIncrease.imageFilename)} /></li>);
    }

    let harborDisplayShips = [];
    for (let i = 0; i < this.props.G.harborDisplayShips.length; i++) {
      if (this.props.G.harborDisplayShips[i].extraCoin === true) {
        let buttons = [];
        let distanceCounter = 0;
        for (let j = 0; j < this.props.ctx.numPlayers; j++) {
          if (j !== parseInt(this.props.ctx.currentPlayer)) {
            buttons.push(<input style={{ position: 'absolute', left: '0px', bottom: ((4 + 2 * distanceCounter++) + 'em'), width: '100%' }} type="button" value={ "Player " + j } onClick={() => this.tradeShip(i, j)} />);
          }
        }
        if (this.props.G.activePlayer === this.props.playerID) {
          harborDisplayShips.push(<li className='card' style={{ position: 'relative' }}><img className='cardImageLarge' src={require('./images/' + this.props.G.harborDisplayShips[i].imageFilename)} />{buttons}</li>);
        } else {
          harborDisplayShips.push(<li className='card' style={{ position: 'relative' }}><img className='cardImage' src={require('./images/' + this.props.G.harborDisplayShips[i].imageFilename)} /></li>);
        }
      } else {
        harborDisplayShips.push(<li className='card'><img onClick={() => this.tradeShip(i) } className='cardImage' src={require('./images/' + this.props.G.harborDisplayShips[i].imageFilename)} /></li>);
      }
    }

    let harborDisplayNonShips = [];
    for (let i = 0; i < this.props.G.harborDisplayNonShips.length; i++) {
      harborDisplayNonShips.push(<li className='card'><img onClick={() => this.hirePerson(i) } className='cardImage' src={require('./images/' + this.props.G.harborDisplayNonShips[i].imageFilename)} /></li>);
    }

    let expeditionDisplay = [];
    for (let i = 0; i < this.props.G.expeditionDisplay.length; i++) {
      expeditionDisplay.push(<li className='card'><img onClick={() => this.fulfillExpedition(i) } className='cardImage' src={require('./images/' + this.props.G.expeditionDisplay[i].imageFilename)} /></li>);
    }

    let discardPile = [];
    for (let i = 0; i < this.props.G.discardPile.length; i++) {
      discardPile.push(<li className='card'><img className='cardImage' src={require('./images/' + this.props.G.discardPile[i].imageFilename)} /></li>);
    }

    let otherPlayerDisplays = [];
    for (let i = 0; i < this.props.ctx.numPlayers; i++) {
      if (i !== parseInt(this.props.playerID)) {
        let playerDisplay = [];
        for (let j = 0; j < this.props.G.playerDisplays[i].length; j++) {
          playerDisplay.push(
            <li className='card'>
              <img className='cardImage' src={require('./images/' + this.props.G.playerDisplays[i][j].imageFilename)} />
            </li>
          );
        }
        otherPlayerDisplays.push(
          <div>
            <h1>{(parseInt(this.props.ctx.currentPlayer) === i) ? <span>&#x1f449;</span> : ''} Player {i} {(parseInt(this.props.G.activePlayer) === i) ? <span>&#x1f34c;</span> : ''},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/points.png')} />: {this.props.G.playerVictoryPoints[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/coin.png')} />: {this.props.G.playerCoins[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/sword.png')} />: {this.props.G.playerSwords[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/admiral.png')} />: {this.props.G.playerNumAdmirals[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/jester.png')} />: {this.props.G.playerNumJesters[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/mademoiselle.png')} />: {this.props.G.playerNumMademoiselles[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/governor.png')} />: {this.props.G.playerNumGovenors[i]},
              Traders: {this.props.G.playerNumGreenTraders[i] + this.props.G.playerNumBlueTraders[i] + this.props.G.playerNumRedTraders[i] + this.props.G.playerNumBlackTraders[i] + this.props.G.playerNumYellowTraders[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/vice_admiral.png')} />: {this.props.G.playerNumViceAdmirals[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/gunner.png')} />: {this.props.G.playerNumGunners[i]},
              Clerks: {this.props.G.playerNumGreenClerks[i] + this.props.G.playerNumBlueClerks[i] + this.props.G.playerNumRedClerks[i] + this.props.G.playerNumBlackClerks[i] + this.props.G.playerNumYellowClerks[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/whole_saler.png')} />: {this.props.G.playerNumGreenWholeSalers[i] + this.props.G.playerNumBlueWholeSalers[i] + this.props.G.playerNumRedWholeSalers[i] + this.props.G.playerNumBlackWholeSalers[i] + this.props.G.playerNumYellowWholeSalers[i]},
              &nbsp;<img style={{ height: '1em' }} src={require('./images/gambler.png')} />: {this.props.G.playerNumGamblers[i]},
            </h1>
            <ul style={{ overflow: 'auto', whiteSpace: 'nowrap', paddingInlineStart: '0' }}>
              {playerDisplay}
            </ul>
          </div>
        );
      }
    }

    let activePlayerDisplay = [];
    if (this.props.playerID !== null) {
      let playerDisplay = [];
      if (this.props.playerID !== null) {
        for (let i = 0; i < this.props.G.playerDisplays[this.props.playerID].length; i++) {
          if (this.props.G.playerDisplays[this.props.playerID][i].subtype === 'Gambler') {
            playerDisplay.push(<li className='card'><img className='cardImage' src={require('./images/' + this.props.G.playerDisplays[this.props.playerID][i].imageFilename)} onClick={() => this.props.moves.DrawCard(true)} /></li>);
          } else {
            playerDisplay.push(<li className='card'><img className='cardImage' src={require('./images/' + this.props.G.playerDisplays[this.props.playerID][i].imageFilename)} /></li>);
          }
        }
      }
      activePlayerDisplay.push(
        <div>
          <h1>{(this.props.ctx.currentPlayer === this.props.playerID) ? <span>&#x1f449;</span> : ''} Player {this.props.playerID} {(this.props.G.activePlayer === this.props.playerID) ? <span>&#x1f34c;</span> : ''},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/points.png')} />: {this.props.G.playerVictoryPoints[this.props.playerID]}, 
            &nbsp;<img style={{ height: '1em' }} src={require('./images/coin.png')} />: {this.props.G.playerCoins[this.props.playerID]},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/sword.png')} />: {this.props.G.playerSwords[this.props.playerID]},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/admiral.png')} />: {this.props.G.playerNumAdmirals[this.props.playerID]},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/jester.png')} />: {this.props.G.playerNumJesters[this.props.playerID]},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/mademoiselle.png')} />: {this.props.G.playerNumMademoiselles[this.props.playerID]},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/governor.png')} />: {this.props.G.playerNumGovenors[this.props.playerID]},
            Traders: {this.props.G.playerNumGreenTraders[this.props.playerID] + this.props.G.playerNumBlueTraders[this.props.playerID] + this.props.G.playerNumRedTraders[this.props.playerID] + this.props.G.playerNumBlackTraders[this.props.playerID] + this.props.G.playerNumYellowTraders[this.props.playerID]},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/vice_admiral.png')} />: {this.props.G.playerNumViceAdmirals[this.props.playerID]},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/gunner.png')} />: {this.props.G.playerNumGunners[this.props.playerID]},
            Clerks: {this.props.G.playerNumGreenClerks[this.props.playerID] + this.props.G.playerNumBlueWholeSalers[this.props.playerID] + this.props.G.playerNumRedWholeSalers[this.props.playerID] + this.props.G.playerNumBlackWholeSalers[this.props.playerID] + this.props.G.playerNumYellowWholeSalers[this.props.playerID]},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/whole_saler.png')} />: {this.props.G.playerNumGreenWholeSalers[this.props.playerID] + this.props.G.playerNumBlueClerks[this.props.playerID] + this.props.G.playerNumRedClerks[this.props.playerID] + this.props.G.playerNumBlackClerks[this.props.playerID] + this.props.G.playerNumYellowClerks[this.props.playerID]},
            &nbsp;<img style={{ height: '1em' }} src={require('./images/gambler.png')} />: {this.props.G.playerNumGamblers[this.props.playerID]},
          </h1>
          <ul style={{ overflow: 'auto', whiteSpace: 'nowrap', paddingInlineStart: '0' }}>
            {playerDisplay}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <div style={{ padding: '1em 1em 1em 1em', backgroundColor: '#990000' }} >
          <img style={{ height: '4em' }} src={require('./images/titlelogo.png')} />
          <div>
            Currently in: { (this.props.ctx.activePlayers !== null) ? this.props.ctx.activePlayers[this.props.playerID] : '' }&nbsp;
            <input type="button" value="continue" onClick={() => this.props.moves.EndStage()} />
          </div>
        </div>
        <div className="board">
          {otherPlayerDisplays}

          {drawPileDisplay}

          <div>
            <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                <h1>Draw Pile</h1>
                <ul style={{ paddingInlineStart: '0' }}>
                  <li className='card'><img className='cardImageSmall' src={require('./images/cardback.png')} onClick={() => this.props.moves.DrawCard(false)} /></li>
                </ul>
              </div>
              <div style={{ display: 'inline-block', paddingInlineStart: '2em', verticalAlign: 'top' }}>
                <h1>Harbor Display</h1>
                <ul style={{ display: 'inline', paddingInlineStart: '0' }}>
                  {drawnTaxIncrease}
                </ul>
                <ul style={{ display: 'inline', paddingInlineStart: '0' }}>
                  {shipToRepel}
                </ul>
                <ul style={{ display: 'inline', paddingInlineStart: '0' }}>
                  {harborDisplayShips}
                </ul>
                <ul style={{ display: 'inline', paddingInlineStart: '0' }}>
                  {harborDisplayNonShips}
                </ul>
              </div>
            </div>
          </div>
          <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
              <h1>Expeditions</h1>
              <ul style={{ paddingInlineStart: '0' }}>
                {expeditionDisplay}
              </ul>
            </div>
            <div style={{ display: 'inline-block', paddingInlineStart: '2em', verticalAlign: 'top' }}>
              <h1>Discard Pile</h1>
              <ul style={{ paddingInlineStart: '0' }}>
                {discardPile}
              </ul>
            </div>
          </div>
          
          {activePlayerDisplay}
        </div>
      </div>
    );
  }
}

export default Board;