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
    cardList.push(<Card ship={props.cards[i]} onClick={ () => { if (props.onClick) props.onClick(i) } } />);
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
    this.props.moves.TradeShip(cardIndex, playerId);
  }

  hirePerson(cardIndex) {
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
      if (parseInt(this.props.G.activePlayer) === parseInt(this.props.playerID)) {
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
        if (parseInt(this.props.ctx.currentPlayer) === parseInt(this.props.playerID)) {
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
            {(this.props.ctx.gameover) ? '' : ((parseInt(this.props.ctx.currentPlayer) === i) ? <span>&#x1f449;</span> : '')} Player {i} {(this.props.ctx.gameover) ? ((this.props.ctx.gameover.winners.includes(i)) ? <span>&#x1f3c6;</span> : '') : <span>{((parseInt(this.props.G.activePlayer) === i) ? <span>&#x1f34c;</span> : '')} {((parseInt(this.props.ctx.currentPlayer) === i) ? <span>({ (this.props.ctx.activePlayers !== null) ? this.props.ctx.activePlayers[i] : '' }{((parseInt(this.props.G.activePlayer) === i) ? <span onClick={() => this.props.moves.EndStage()}> &#x27A1;</span> : '')}, &#x1f590;: {this.props.G.drawCount})</span> : '')}</span>},
            &nbsp;<img style={{ height: '1em' }} title="Victory Points" alt="Victory Points" src={require('./images/points.png')} />: {this.props.G.playerVictoryPoints[i]},
            &nbsp;<img style={{ height: '1em' }} title="Coins" alt="Coins" src={require('./images/coin.png')} />: {this.props.G.playerCoins[i]},
            &nbsp;<img style={{ height: '1em' }} title="Swords" alt="Swords" src={require('./images/sword.png')} />: {this.props.G.playerSwords[i]},
            &nbsp;<img style={{ height: '1em' }} title="Admirals" alt="Admirals" src={require('./images/admiral.png')} />: {this.props.G.playerNumAdmirals[i]},
            &nbsp;<img style={{ height: '1em' }} title="Vice Admirals" alt="Vice Admirals" src={require('./images/vice_admiral.png')} />: {this.props.G.playerNumViceAdmirals[i]},
            &nbsp;<img style={{ height: '1em' }} title="Gunners" alt="Gunners" src={require('./images/gunner.png')} />: {this.props.G.playerNumGunners[i]},
            &nbsp;<img style={{ height: '1em' }} title="Jesters" alt="Jesters" src={require('./images/jester.png')} />: {this.props.G.playerNumJesters[i]},
            &nbsp;<img style={{ height: '1em' }} title="Mademoiselles" alt="Mademoiselles" src={require('./images/mademoiselle.png')} />: {this.props.G.playerNumMademoiselles[i]},
            &nbsp;<img style={{ height: '1em' }} title="Governors" alt="Governors" src={require('./images/governor.png')} />: {this.props.G.playerNumGovenors[i]},
            &nbsp;<img style={{ height: '1em' }} title="Gamblers" alt="Gamblers" src={require('./images/gambler.png')} />: {this.props.G.playerNumGamblers[i]},
            &nbsp;<img style={{ height: '1em' }} title="Captains" alt="Captains" src={require('./images/anchor.png')} />: {this.props.G.playerNumCaptains[i]},
            &nbsp;<img style={{ height: '1em' }} title="Priests" alt="Priests" src={require('./images/cross.png')} />: {this.props.G.playerNumPriests[i]},
            &nbsp;<img style={{ height: '1em' }} title="Settlers" alt="Settlers" src={require('./images/hut.png')} />: {this.props.G.playerNumSettlers[i]},
            &nbsp;<img style={{ height: '1em' }} title="Jack of all trades" alt="Jack of all trades" src={require('./images/anchor.png')} /><img style={{ height: '1em' }} title="Jack of all trades" alt="Jack of all trades" src={require('./images/cross.png')} /><img style={{ height: '1em' }} title="Jack of all trades" alt="Jack of all trades" src={require('./images/hut.png')} />: {this.props.G.playerNumJackOfAllTrades[i]},
            Traders: <span style={{color: '#008211'}}>{this.props.G.playerNumGreenTraders[i]}</span> + <span style={{color: '#003d82'}}>{this.props.G.playerNumBlueTraders[i]}</span> + <span style={{color: '#bf0000'}}>{this.props.G.playerNumRedTraders[i]}</span> + <span style={{color: 'black'}}>{this.props.G.playerNumBlackTraders[i]}</span> + <span style={{color: '#fcdb03'}}>{this.props.G.playerNumYellowTraders[i]}</span>,
            Clerks: <span style={{color: '#008211'}}>{this.props.G.playerNumGreenClerks[i]}</span> + <span style={{color: '#003d82'}}>{this.props.G.playerNumBlueClerks[i]}</span> + <span style={{color: '#bf0000'}}>{this.props.G.playerNumRedClerks[i]}</span> + <span style={{color: 'black'}}>{this.props.G.playerNumBlackClerks[i]}</span> + <span style={{color: '#fcdb03'}}>{this.props.G.playerNumYellowClerks[i]}</span>,
            &nbsp;<img style={{ height: '1em' }} title="Whole Salers" alt="Whole Salers" src={require('./images/whole_saler.png')} />: <span style={{color: '#008211'}}>{this.props.G.playerNumGreenWholeSalers[i]}</span> + <span style={{color: '#003d82'}}>{this.props.G.playerNumBlueWholeSalers[i]}</span> + <span style={{color: '#bf0000'}}>{this.props.G.playerNumRedWholeSalers[i]}</span> + <span style={{color: 'black'}}>{this.props.G.playerNumBlackWholeSalers[i]}</span> + <span style={{color: '#fcdb03'}}>{this.props.G.playerNumYellowWholeSalers[i]}</span>
          </CardDisplayWithHeader>
        </div>
      );
    }

    return (
      <div>
        <div style={{ padding: '1em 1em 1em 1em', backgroundColor: '#990000' }} >
          <img style={{ height: '4em' }} src={require('./images/titlelogo.png')} />
          <div style={{ display: 'inline-block' }}>
            You are: Player {this.props.playerID}
          </div>
        </div>
        <div className="board">
          {playerList}

          <CardDisplayWithHeader cards={this.props.G.expeditionDisplay} onClick={() => this.setState({ displayExpedition: !this.state.displayExpedition })} cardsOnClick={ (cardIdx) => this.fulfillExpedition(cardIdx) } overflow='auto' displayCards={this.state.displayExpedition}>Expeditions ({this.props.G.expeditionDisplay.length})</CardDisplayWithHeader>
          <CardDisplayWithHeader cards={this.props.G.discardPile} onClick={() => this.setState({ displayDiscardPile: !this.state.displayDiscardPile })} overflow='auto' displayCards={this.state.displayDiscardPile}>Discard Pile ({this.props.G.discardPile.length})</CardDisplayWithHeader>
          <CardDisplayWithHeader cards={(this.props.G.secret !== undefined) ? this.props.G.secret.drawPile : null} overflow="auto" displayComponent={this.props.G.secret !== undefined}>Draw Pile</CardDisplayWithHeader>

          <div>
            <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                <h1>Draw Pile ({this.props.G.drawPileLength})</h1>
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