
import { PlayerView } from 'boardgame.io/core';

function ShuffleDrawPile(G, ctx) {
  G.secret.drawPile = ctx.random.Shuffle(G.secret.drawPile);
}

function DbgGetCoins(G, ctx, amount) {
  if (amount !== null && amount !== undefined)
    G.playerCoins[ctx.currentPlayer] += amount;
}

function DbgGetSwords(G, ctx, amount) {
  if (amount !== null && amount !== undefined)
    G.playerSwords[ctx.currentPlayer] += amount;
}

function TradeShip(G, ctx, cardIndex) {
  if ((G.drawCount > 0) && (cardIndex < G.harborDisplayShips.length)) {
    let tradedShip = G.harborDisplayShips[cardIndex];

    // Add coins to player and check whether there are cards to take
    G.playerCoins = G.playerCoins.slice();
    G.playerCoins[ctx.currentPlayer] += tradedShip.coins;

    // if other players take cards, one coin needs to be given to the active player.
    if (G.activePlayer !== ctx.currentPlayer) {
      G.playerCoins[ctx.currentPlayer]--;
      G.playerCoins[G.activePlayer]++;
    }

    if (tradedShip.color === 'green') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumGreenTraders[ctx.currentPlayer];
    } else if (tradedShip.color === 'blue') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumBlueTraders[ctx.currentPlayer];
    } else if (tradedShip.color === 'red') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumRedTraders[ctx.currentPlayer];
    } else if (tradedShip.color === 'black') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumBlackTraders[ctx.currentPlayer];
    } else if (tradedShip.color === 'yellow') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumYellowTraders[ctx.currentPlayer];
    }
    
    // Add Ship to discard pile
    G.discardPile = G.discardPile.concat([ tradedShip ]);

    // Remove ship from harbor display
    G.harborDisplayShips = G.harborDisplayShips.slice();
    G.harborDisplayShips.splice(cardIndex, 1);

    // Reduce counter of cards that could be taken
    G.drawCount--;
  }
}

function HirePerson(G, ctx, cardIndex) {
  // Check whether another card can be taken and check whether there are cards to take
  if ((G.drawCount > 0) && (cardIndex < G.harborDisplayNonShips.length)) {
    let hiredPerson = G.harborDisplayNonShips[cardIndex];
    let extracost = -G.playerNumMademoiselles[ctx.currentPlayer];
    if (G.activePlayer === ctx.currentPlayer) extracost += 1;

    if (hiredPerson.hireingCosts + extracost <= G.playerCoins[ctx.currentPlayer]) {
      // Remove Person from harbor display
      G.harborDisplayNonShips = G.harborDisplayNonShips.slice();
      G.harborDisplayNonShips.splice(cardIndex, 1);

      // Add hired person to player display
      G.playerDisplays = G.playerDisplays.slice();
      G.playerDisplays[ctx.currentPlayer] = G.playerDisplays[ctx.currentPlayer].concat([ hiredPerson ]);

      // Increase player's Victory Points
      G.playerVictoryPoints[ctx.currentPlayer] += hiredPerson.victoryPoints;

      // Increase player's Swords
      if (hiredPerson.subtype === 'Sailor' || hiredPerson.subtype === 'Pirate') {
        G.playerSwords[ctx.currentPlayer] += hiredPerson.swords;
      }
      
      // Remove coins from player
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] -= hiredPerson.hireingCosts;

      // if other players take cards, one coin needs to be given to the active player.
      if (G.activePlayer !== ctx.currentPlayer) {
        G.playerCoins[ctx.currentPlayer]--;
        G.playerCoins[G.activePlayer]++;
      }

      // Count persons with special abilities
      if (hiredPerson.subtype === 'Govenor') {
        G.playerNumGovenors = G.playerNumGovenors.slice();
        G.playerNumGovenors[ctx.currentPlayer]++;
        G.drawCount++;
      } else if (hiredPerson.subtype === 'Mademoiselle') {
        G.playerNumMademoiselles = G.playerNumMademoiselles.slice();
        G.playerNumMademoiselles[ctx.currentPlayer]++;
      } else if (hiredPerson.subtype === 'Jester') {
        G.playerNumJesters = G.playerNumJesters.slice();
        G.playerNumJesters[ctx.currentPlayer]++;
      } else if (hiredPerson.subtype === 'Admiral') {
        G.playerNumAdmirals = G.playerNumAdmirals.slice();
        G.playerNumAdmirals[ctx.currentPlayer]++;
      } else if (hiredPerson.subtype === 'Trader') {
        if (hiredPerson.color === 'green') {
          G.playerNumGreenTraders = G.playerNumGreenTraders.slice();
          G.playerNumGreenTraders[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'blue') {
          G.playerNumBlueTraders = G.playerNumBlueTraders.slice();
          G.playerNumBlueTraders[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'red') {
          G.playerNumRedTraders = G.playerNumRedTraders.slice();
          G.playerNumRedTraders[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'black') {
          G.playerNumBlackTraders = G.playerNumBlackTraders.slice();
          G.playerNumBlackTraders[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'yellow') {
          G.playerNumYellowTraders = G.playerNumYellowTraders.slice();
          G.playerNumYellowTraders[ctx.currentPlayer]++;
        }
      }

      // Reduce counter of cards that could be taken
      G.drawCount--;
    }
  }
}

function RepelShip(G, ctx, doRepel) {
  let drawnCard = G.shipToRepel;
  G.shipToRepel = null;

  if (doRepel === true || doRepel === 1) {
    G.discardPile = G.discardPile.concat([drawnCard]);
    ctx.events.setStage('discover');
  } else {
    let discardHarborDisplay = false;
    
    for (const ship of G.harborDisplayShips) {
      if (ship.color === drawnCard.color) {
        discardHarborDisplay = true;
        break;
      }
    }

    if (discardHarborDisplay) {
      G.discardPile = G.discardPile.concat([drawnCard]);
      G.discardPile = G.discardPile.concat(G.harborDisplayNonShips);
      G.harborDisplayNonShips = [];
      G.discardPile = G.discardPile.concat(G.harborDisplayShips);
      G.harborDisplayShips = [];
      // Get one coin for each Jester
      if (G.playerNumJesters > 0) {
        G.playerCoins = G.playerCoins.slice();
        G.playerCoins[ctx.currentPlayer] += G.playerNumJesters[ctx.currentPlayer];
      }
      ctx.events.endTurn();
    } else {
      G.harborDisplayShips  = G.harborDisplayShips.concat([drawnCard]);
      ctx.events.setStage('discover');
    }
  }
}

function DrawCard(G, ctx) {
  // TODO: slice?
  let drawnCard = G.secret.drawPile[0];
  G.secret.drawPile = G.secret.drawPile.slice(1);

  if (drawnCard.type === 'Expedition') {
    G.expeditionDisplay = G.expeditionDisplay.concat([drawnCard]);
  } else if (drawnCard.type === 'Person') {
    G.harborDisplayNonShips = G.harborDisplayNonShips.concat([drawnCard]);
  } else if (drawnCard.type === 'Ship') {
    if (drawnCard.swords <= G.playerSwords[ctx.currentPlayer]) {
      G.shipToRepel = drawnCard;
      ctx.events.setStage('repelShip');
    } else {
      let discardHarborDisplay = false;
      
      for (const ship of G.harborDisplayShips) {
        if (ship.color === drawnCard.color) {
          discardHarborDisplay = true;
          break;
        }
      }

      if (discardHarborDisplay) {
        G.discardPile = G.discardPile.concat([drawnCard]);
        G.discardPile = G.discardPile.concat(G.harborDisplayNonShips);
        G.harborDisplayNonShips = [];
        G.discardPile = G.discardPile.concat(G.harborDisplayShips);
        G.harborDisplayShips = [];
        // Get one coin for each Jester
        if (G.playerNumJesters > 0) {
          G.playerCoins = G.playerCoins.slice();
          G.playerCoins[ctx.currentPlayer] += G.playerNumJesters[ctx.currentPlayer];
        }
        ctx.events.endTurn();
      } else {
        G.harborDisplayShips  = G.harborDisplayShips.concat([drawnCard]);
      }
    }
  } else if (drawnCard.type === 'TaxIncrease') {
    let minVictoryPoints = Infinity;
    let maxSwords = 0;

    let newPlayerCoins = G.playerCoins.slice();

    // Count min. victory points and max. swords and remove cards from players with more than or equal to 12 cards
    for (let i = 0; i < ctx.numPlayers; i++) {
      if (G.playerVictoryPoints[i] < minVictoryPoints) {
        minVictoryPoints = G.playerVictoryPoints[i];
      }

      if (G.playerSwords[i] > maxSwords) {
        maxSwords = G.playerSwords[i];
      }

      if (G.playerCoins[i] >= 12) {
        newPlayerCoins[i] = Math.round(G.playerCoins[i] / 2);
      }
    }

    if (drawnCard.subtype === 'minVictoryPoints') {
      for (let i = 0; i < ctx.numPlayers; i++) {
        if (G.playerVictoryPoints[i] === minVictoryPoints) {
          newPlayerCoins[i]++;
        }
      }
    }

    if (drawnCard.subtype === 'maxSwords') {
      for (let i = 0; i < ctx.numPlayers; i++) {
        if (G.playerSwords[i] === maxSwords) {
          newPlayerCoins[i]++;
        }
      }
    }

    G.playerCoins = newPlayerCoins;

    G.discardPile = G.discardPile.concat([drawnCard]);
  }
}

function BeginTurn(G, ctx) {
  let turnmod = (ctx.turn - 1) % (ctx.numPlayers * (ctx.numPlayers + 1));

  // Count how many cards a player can draw
  G.drawCount = 1;
  G.drawCount += G.playerNumGovenors[ctx.currentPlayer];
  if ((ctx.currentPlayer === G.activePlayer) && (G.harborDisplayShips.length >= 4)) {
    G.drawCount += G.harborDisplayShips.length - 3;
  }

  if (turnmod === ctx.currentPlayer * (1 + ctx.numPlayers)) {
    G.activePlayer = ctx.currentPlayer;
    // Start with discover followed by trade&hire
    ctx.events.setStage('discover');
  } else if (turnmod === ctx.currentPlayer * (1 + ctx.numPlayers) + ctx.numPlayers) {
    // Discard harbor display cards and end turn
    G.discardPile = G.discardPile.concat(G.harborDisplayNonShips);
    G.harborDisplayNonShips = [];
    G.discardPile = G.discardPile.concat(G.harborDisplayShips);
    G.harborDisplayShips = [];
    // We somehow should end the turn
    ctx.events.endTurn();
  } else {
    // Get one coin for each Jester
    if ((G.playerNumJesters > 0) && (G.harborDisplayShips === 0) && (G.harborDisplayNonShips === 0)) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumJesters[ctx.currentPlayer];
    }

    let numCardsInHarborDisplays = G.harborDisplayShips.length + G.harborDisplayNonShips.length;
    // Get two coins for each Admiral if 5 or more cards in harbor display
    if (G.playerNumAdmirals > 0 && numCardsInHarborDisplays >= 5) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumAdmirals[ctx.currentPlayer] * 2;
    }

    // Only trade&hire
    ctx.events.setStage('tradeAndHire');
  }
}

function EndStage(G, ctx) {
  let currentStage = ctx.activePlayers[ctx.currentPlayer];

  if (currentStage === 'discover') {
    // tradeAndHire onBegin equivalent (only for the currentPlayer)
    let numCardsInHarborDisplays = G.harborDisplayShips.length + G.harborDisplayNonShips.length;
    // Get two coins for each Admiral if 5 or more cards in harbor display
    if (G.playerNumAdmirals > 0 && numCardsInHarborDisplays >= 5) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumAdmirals[ctx.currentPlayer] * 2;
    }

    ctx.events.setStage('tradeAndHire');
  } else if (currentStage === 'repelShip') {
    RepelShip(G, ctx, false);
  } else if (currentStage === 'tradeAndHire') {
    ctx.events.endTurn();
  }
}

const PortRoyal = {
//  playerView: PlayerView.STRIP_SECRETS,

  setup: (ctx, setupData) => ({
    secret: {
      drawPile: ctx.random.Shuffle([
        { type: 'Expedition', subtype: 'anchorCrossHouse', victoryPoints: 5, imageFilename: 'card_zoom-0.png' },
        { type: 'Expedition', subtype: 'doubleAnchor', victoryPoints: 4, imageFilename: 'card_zoom-1.png' },
        { type: 'Expedition', subtype: 'doubleCross', victoryPoints: 4, imageFilename: 'card_zoom-2.png' },
        { type: 'Expedition', subtype: 'doubleHouse', victoryPoints: 4, imageFilename: 'card_zoom-3.png' },
        { type: 'Expedition', subtype: 'doubleAnchorHouse', victoryPoints: 6, imageFilename: 'card_zoom-4.png' },
        { type: 'Expedition', subtype: 'doubleCrossHouse', victoryPoints: 6, imageFilename: 'card_zoom-5.png' },
        { type: 'Person', subtype: 'Admiral', victoryPoints: 1, hireingCosts : 5, imageFilename: 'card_zoom-6.png' },
        { type: 'Person', subtype: 'Admiral', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-9.png' },
        { type: 'Person', subtype: 'Admiral', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-10.png' },
        { type: 'Person', subtype: 'Mademoiselle', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-13.png' },
        { type: 'Person', subtype: 'Mademoiselle', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-15.png' },
        { type: 'Person', subtype: 'Jester', victoryPoints: 1, hireingCosts : 5, imageFilename: 'card_zoom-16.png' },
        { type: 'Person', subtype: 'Jester', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-17.png' },
        { type: 'Person', subtype: 'Jester', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-20.png' },
        { type: 'Person', subtype: 'Govenor', victoryPoints: 0, hireingCosts : 8, imageFilename: 'card_zoom-21.png' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'green', imageFilename: 'card_zoom-25.png' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'blue', imageFilename: 'card_zoom-27.png' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 2, hireingCosts : 5, color: 'blue', imageFilename: 'card_zoom-28.png' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'red', imageFilename: 'card_zoom-29.png' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'black', imageFilename: 'card_zoom-31.png' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'yellow', imageFilename: 'card_zoom-33.png' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 2, hireingCosts : 5, color: 'yellow', imageFilename: 'card_zoom-34.png' },
        { type: 'Person', subtype: 'JackOfAllTrades', victoryPoints: 1, hireingCosts : 6, imageFilename: 'card_zoom-35.png' },
        { type: 'Person', subtype: 'Captain', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-38.png' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 1, hireingCosts : 3, imageFilename: 'card_zoom-49.png' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 2, hireingCosts : 5, imageFilename: 'card_zoom-51.png' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 3, hireingCosts : 7, imageFilename: 'card_zoom-52.png' },
        { type: 'Person', subtype: 'Pirate', swords: 2, victoryPoints: 1, hireingCosts : 5, imageFilename: 'card_zoom-53.png' },
        { type: 'Person', subtype: 'Pirate', swords: 2, victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-54.png' },
        { type: 'Person', subtype: 'Pirate', swords: 2, victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-55.png' },
        { type: 'Person', subtype: 'Priest', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-56.png' },
        { type: 'Person', subtype: 'Settler', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-61.png' },
        { type: 'Ship', subtype: 'Skiff', swords: 1, coins : 1, color: 'green', imageFilename: 'card_zoom-66.png' },
        { type: 'Ship', subtype: 'Skiff', swords: 1, coins : 2, color: 'green', imageFilename: 'card_zoom-69.png' },
        { type: 'Ship', subtype: 'Skiff', swords: 3, coins : 2, color: 'green', imageFilename: 'card_zoom-70.png' },
        { type: 'Ship', subtype: 'Skiff', swords: 3, coins : 3, color: 'green', imageFilename: 'card_zoom-72.png' },
        { type: 'Ship', subtype: 'Skiff', swords: 3, coins : 5, color: 'green', imageFilename: 'card_zoom-73.png' },
        { type: 'Ship', subtype: 'Skiff', swords: 4, coins : 5, color: 'green', imageFilename: 'card_zoom-75.png' },
        { type: 'Ship', subtype: 'Flute', swords: 1, coins : 1, color: 'blue', imageFilename: 'card_zoom-76.png' },
        { type: 'Ship', subtype: 'Flute', swords: 1, coins : 2, color: 'blue', imageFilename: 'card_zoom-79.png' },
        { type: 'Ship', subtype: 'Flute', swords: 2, coins : 2, color: 'blue', imageFilename: 'card_zoom-80.png' },
        { type: 'Ship', subtype: 'Flute', swords: 2, coins : 3, color: 'blue', imageFilename: 'card_zoom-82.png' },
        { type: 'Ship', subtype: 'Flute', swords: 5, coins : 3, color: 'blue', imageFilename: 'card_zoom-83.png' },
        { type: 'Ship', subtype: 'Flute', swords: 5, coins : 4, color: 'blue', imageFilename: 'card_zoom-85.png' },
        { type: 'Ship', subtype: 'Frigate', swords: 1, coins : 1, color: 'red', imageFilename: 'card_zoom-86.png' },
        { type: 'Ship', subtype: 'Frigate', swords: 3, coins : 2, color: 'red', imageFilename: 'card_zoom-89.png' },
        { type: 'Ship', subtype: 'Frigate', swords: 6, coins : 3, color: 'red', imageFilename: 'card_zoom-92.png' },
        { type: 'Ship', subtype: 'Frigate', swords: 99, coins : 3, color: 'red', imageFilename: 'card_zoom-94.png' },
        { type: 'Ship', subtype: 'Frigate', swords: 99, coins : 4, color: 'red', imageFilename: 'card_zoom-95.png' },
        { type: 'Ship', subtype: 'Galleon', swords: 2, coins : 1, color: 'black', imageFilename: 'card_zoom-96.png' },
        { type: 'Ship', subtype: 'Galleon', swords: 4, coins : 2, color: 'black', imageFilename: 'card_zoom-99.png' },
        { type: 'Ship', subtype: 'Galleon', swords: 7, coins : 3, color: 'black', imageFilename: 'card_zoom-102.png' },
        { type: 'Ship', subtype: 'Galleon', swords: 99, coins : 3, color: 'black', imageFilename: 'card_zoom-104.png' },
        { type: 'Ship', subtype: 'Galleon', swords: 99, coins : 4, color: 'black', imageFilename: 'card_zoom-105.png' },
        { type: 'Ship', subtype: 'Pinace', swords: 1, coins : 1, color: 'yellow', imageFilename: 'card_zoom-106.png' },
        { type: 'Ship', subtype: 'Pinace', swords: 1, coins : 2, color: 'yellow', imageFilename: 'card_zoom-109.png' },
        { type: 'Ship', subtype: 'Pinace', swords: 2, coins : 2, color: 'yellow', imageFilename: 'card_zoom-110.png' },
        { type: 'Ship', subtype: 'Pinace', swords: 2, coins : 3, color: 'yellow', imageFilename: 'card_zoom-112.png' },
        { type: 'Ship', subtype: 'Pinace', swords: 4, coins : 3, color: 'yellow', imageFilename: 'card_zoom-113.png' },
        { type: 'Ship', subtype: 'Pinace', swords: 4, coins : 4, color: 'yellow', imageFilename: 'card_zoom-115.png' },
        { type: 'TaxIncrease', subtype: 'minVictoryPoints', imageFilename: 'card_zoom-116.png' },
        { type: 'TaxIncrease', subtype: 'maxSwords', imageFilename: 'card_zoom-118.png' },
      ]),
    },
    activePlayer: 0,
    drawCount: 0,
    playerDisplays: Array(ctx.numPlayers).fill([]),
    playerCoins: Array(ctx.numPlayers).fill(0),
    playerSwords: Array(ctx.numPlayers).fill(0),
    playerVictoryPoints: Array(ctx.numPlayers).fill(0),
    playerNumGovenors: Array(ctx.numPlayers).fill(0),
    playerNumMademoiselles: Array(ctx.numPlayers).fill(0),
    playerNumJesters: Array(ctx.numPlayers).fill(0),
    playerNumAdmirals: Array(ctx.numPlayers).fill(0),
    playerNumGreenTraders: Array(ctx.numPlayers).fill(0),
    playerNumBlueTraders: Array(ctx.numPlayers).fill(0),
    playerNumRedTraders: Array(ctx.numPlayers).fill(0),
    playerNumBlackTraders: Array(ctx.numPlayers).fill(0),
    playerNumYellowTraders: Array(ctx.numPlayers).fill(0),
    harborDisplayShips: [],
    harborDisplayNonShips: [],
    shipToRepel: null,
    expeditionDisplay: [],
    discardPile: [],
  }),

  turn: {
    onBegin: BeginTurn,

    stages: {
      discover: {
        moves: { EndStage, DrawCard, DbgGetCoins, DbgGetSwords },
        next: 'tradeAndHire',
      },

      repelShip: {
        moves: { EndStage, RepelShip },
        next: 'discover'
      },

      tradeAndHire: {
        moves: { EndStage, HirePerson, TradeShip },
      },
    },
  },

  moves: {
    ShuffleDrawPile,
  },

  events: {
    endStage: false,
  }
};

export default PortRoyal;
