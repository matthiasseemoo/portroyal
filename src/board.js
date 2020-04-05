import React from 'react';
import PropTypes from 'prop-types';
import './board.css'

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

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
	        <ul style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
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
    	harborDisplayShips.push(<li style={{ display: 'inline' }}><img style={{ height: '8em' }} src={require('./images/' + this.props.G.harborDisplayShips[i].imageFilename)} /></li>);
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
	  if (this.props.playerID !== null) {
	  	for (let i = 0; i < this.props.ctx.numPlayers; i++) {
		  	if (i !== parseInt(this.props.playerID)) {
					let playerDisplay = [];
			    for (let j = 0; j < this.props.G.playerDisplays[i].length; j++) {
			    	playerDisplay.push(<li style={{ display: 'inline' }}><img style={{ height: '8em' }} src={require('./images/' + this.props.G.playerDisplays[i][j].imageFilename)} /></li>);
			    }
			  	otherPlayerDisplays.push(
			  		<div>
		        	<h1>Player {i} (Victory Points: {this.props.G.playerVictoryPoints[i]}, Coins: {this.props.G.playerCoins[i]})</h1>
			        <ul style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
			        	{playerDisplay}
			        </ul>
		        </div>
			  	);
			  }
		  }
	  }

    return (
      <div id="board">
      	{otherPlayerDisplays}

      	{drawPileDisplay}

        <div>
	        <h1>Draw Pile and Harbor Display</h1>
	        <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
	        	<ul style={{ display: 'inline' }}>
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
	        <ul style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
	        	{expeditionDisplay}
	        </ul>
        </div>
        <div>
        	<h1>Discard Pile</h1>
	        <ul style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
	        	{discardPile}
	        </ul>
        </div>
        <div>
        	<h1>Player {this.props.playerID} (Victory Points: {this.props.G.playerVictoryPoints[this.props.playerID]}, Coins: {this.props.G.playerCoins[this.props.playerID]})</h1>
	        <ul style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
	        	{playerDisplay}
	        </ul>
        </div>
      </div>
    );
  }
}

export default Board;