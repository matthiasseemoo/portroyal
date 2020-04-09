import React from 'react';
import PropTypes from 'prop-types';
import './board.css'
import './font.css'

function Card(props) {
  return (
    <li className='card'>
      <img onClick={props.onClick} className='cardImage' src={require('./images/' + props.ship.imageFilename)} />
    </li>
  );
}

function CardDisplay(props) {
  let cardList = [];
  
  for (let i = 0; i < props.cards.length; i++) {
    cardList.push(<Card ship={props.cards[i]} onClick={ () => props.onClick(i) } />);
  }

  return (
    <ul style={{ overflow: props.overflow, whiteSpace: 'nowrap', paddingInlineStart: '0', height: '12em' }}>
      {cardList}
    </ul>
  );
}

function CardDisplayWithHeader(props) {
  if (props.displayComponent) {
    if (props.displayCards) {
      return (
        <div>
          <h1 onClick={props.onClick} style={{cursor: 'pointer'}}>{props.children}</h1>
          <CardDisplay cards={props.cards} overflow={props.overflow} onClick={props.cardsOnClick} />
        </div>
      );
    } else {
      return (
        <div>
          <h1 onClick={props.onClick} style={{cursor: 'pointer'}}>{props.children}</h1>
        </div>
      );
    }  
  } else {
    return null;
  }
}
CardDisplayWithHeader.defaultProps = {
  overflow: 'visible',
  displayCards: true,
  displayComponent: true,
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayExpedition: true,
      displayDiscardPile: false,
      displayPlayerId: 0,
    };
  }

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

  handlePlayerCardClick(card) {
    if (card.subtype === 'Gambler') {
      // Gamble: draw four cards at once
      this.props.moves.DrawCard(true);
    }
  }

  render() {

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

    let discardPile = [];
    for (let i = 0; i < this.props.G.discardPile.length; i++) {
      discardPile.push(<li className='card'><img className='cardImage' src={require('./images/' + this.props.G.discardPile[i].imageFilename)} /></li>);
    }

    let playerList = [];
    for (let i = 0; i < this.props.ctx.numPlayers; i++) {
      playerList.push(
        <div>
          <CardDisplayWithHeader cards={this.props.G.playerDisplays[i]} onClick={() => this.setState({ displayPlayerId: i }) } cardsOnClick={(cardIdx) => this.handlePlayerCardClick(this.props.G.playerDisplays[i][cardIdx])} overflow="auto" displayCards={this.state.displayPlayerId === i}>
            {(parseInt(this.props.ctx.currentPlayer) === i) ? <span>&#x1f449;</span> : ''} Player {i} {(parseInt(this.props.G.activePlayer) === i) ? <span>&#x1f34c;</span> : ''},
            &nbsp;<img style={{ height: '1em' }} title="Victory Points" alt="Victory Points" src={require('./images/points.png')} />: {this.props.G.playerVictoryPoints[i]},
            &nbsp;<img style={{ height: '1em' }} title="Coins" alt="Coins" src={require('./images/coin.png')} />: {this.props.G.playerCoins[i]},
            &nbsp;<img style={{ height: '1em' }} title="Swords" alt="Swords" src={require('./images/sword.png')} />: {this.props.G.playerSwords[i]},
            &nbsp;<img style={{ height: '1em' }} title="Admirals" alt="Admirals" src={require('./images/admiral.png')} />: {this.props.G.playerNumAdmirals[i]},
            &nbsp;<img style={{ height: '1em' }} title="Jesters" alt="Jesters" src={require('./images/jester.png')} />: {this.props.G.playerNumJesters[i]},
            &nbsp;<img style={{ height: '1em' }} title="Mademoiselles" alt="Mademoiselles" src={require('./images/mademoiselle.png')} />: {this.props.G.playerNumMademoiselles[i]},
            &nbsp;<img style={{ height: '1em' }} title="Governors" alt="Governors" src={require('./images/governor.png')} />: {this.props.G.playerNumGovenors[i]},
            Traders: {this.props.G.playerNumGreenTraders[i] + this.props.G.playerNumBlueTraders[i] + this.props.G.playerNumRedTraders[i] + this.props.G.playerNumBlackTraders[i] + this.props.G.playerNumYellowTraders[i]},
            &nbsp;<img style={{ height: '1em' }} title="Vice Admirals" alt="Vice Admirals" src={require('./images/vice_admiral.png')} />: {this.props.G.playerNumViceAdmirals[i]},
            &nbsp;<img style={{ height: '1em' }} title="Gunners" alt="Gunners" src={require('./images/gunner.png')} />: {this.props.G.playerNumGunners[i]},
            Clerks: {this.props.G.playerNumGreenClerks[i] + this.props.G.playerNumBlueClerks[i] + this.props.G.playerNumRedClerks[i] + this.props.G.playerNumBlackClerks[i] + this.props.G.playerNumYellowClerks[i]},
            &nbsp;<img style={{ height: '1em' }} title="Whole Salers" alt="Whole Salers" src={require('./images/whole_saler.png')} />: {this.props.G.playerNumGreenWholeSalers[i] + this.props.G.playerNumBlueWholeSalers[i] + this.props.G.playerNumRedWholeSalers[i] + this.props.G.playerNumBlackWholeSalers[i] + this.props.G.playerNumYellowWholeSalers[i]},
            &nbsp;<img style={{ height: '1em' }} title="Gamblers" alt="Gamblers" src={require('./images/gambler.png')} />: {this.props.G.playerNumGamblers[i]},
          </CardDisplayWithHeader>
        </div>
      );
    }

    return (
      <div>
        <div style={{ padding: '1em 1em 1em 1em', backgroundColor: '#990000' }} >
          <img style={{ height: '4em' }} src={require('./images/titlelogo.png')} />
          <div>
            You are: Player {this.props.playerID}&nbsp;
            Currently in: { (this.props.ctx.activePlayers !== null) ? this.props.ctx.activePlayers[this.props.playerID] : '' }&nbsp;
            <input type="button" value="continue" onClick={() => this.props.moves.EndStage()} />
          </div>
        </div>
        <div className="board">
          {playerList}

          <CardDisplayWithHeader cards={this.props.G.expeditionDisplay} onClick={() => this.setState({ displayExpedition: !this.state.displayExpedition })} overflow='auto' displayCards={this.state.displayExpedition}>Expeditions</CardDisplayWithHeader>
          <CardDisplayWithHeader cards={this.props.G.discardPile} onClick={() => this.setState({ displayDiscardPile: !this.state.displayDiscardPile })} overflow='auto' displayCards={this.state.displayDiscardPile}>Discard Pile</CardDisplayWithHeader>
          <CardDisplayWithHeader cards={this.props.G.secret.drawPile} overflow="auto" displayComponent={this.props.G.secret !== undefined}>Draw Pile</CardDisplayWithHeader>

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
                <ul style={{ display: 'inline', paddingInlineStart: '0', height: '12em' }}>
                  {drawnTaxIncrease}
                </ul>
                <ul style={{ display: 'inline', paddingInlineStart: '0', height: '12em' }}>
                  {shipToRepel}
                </ul>
                <ul style={{ display: 'inline', paddingInlineStart: '0', height: '12em' }}>
                  {harborDisplayShips}
                </ul>
                <ul style={{ display: 'inline', paddingInlineStart: '0', height: '12em' }}>
                  {harborDisplayNonShips}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;