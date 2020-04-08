import { PlayerView } from 'boardgame.io/core';
import { INVALID_MOVE } from 'boardgame.io/core';

// TODO: expedition (test if it is woring)
// TODO: game board
// TODO: skip turns automatically if nothing can be done
// TODO: handle invalid moves: https://boardgame.io/documentation/#/immutability?id=invalid-moves

function DbgShuffleDrawPile(G, ctx) {
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

function FulfillExpedition(G, ctx, cardIndex) {
  if ((cardIndex >= 0) && (cardIndex < G.expeditionDisplay.length)) {
    const expedition = G.expeditionDisplay[cardIndex];

    let captainIndices = [];
    let priestIndices = [];
    let settlerIndices = [];
    let jackOfAllTradesIndices = [];

    for (let i = 0; i < G.playerDisplays[ctx.currentPlayer]; i++) {
      if (G.playerDisplays[ctx.currentPlayer][i].subtype === 'Captain') {
        captainIndices.push(i);
      } else if (G.playerDisplays[ctx.currentPlayer][i].subtype === 'Priest') {
        priestIndices.push(i);
      } else if (G.playerDisplays[ctx.currentPlayer][i].subtype === 'Settler') {
        settlerIndices.push(i);
      } else if (G.playerDisplays[ctx.currentPlayer][i].subtype === 'JackOfAllTrades') {
        jackOfAllTradesIndices.push(i);
      }
    }

    let cardsToReplaceIndices = [];

    if (expedition.subtype === 'anchorCrossHouse') {
      if (captainIndices.length > 0) {
        cardsToReplaceIndices.push(captainIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }

      if (priestIndices.length > 0) {
        cardsToReplaceIndices.push(priestIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }

      if (settlerIndices.length > 0) {
        cardsToReplaceIndices.push(settlerIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }
    } else if (expedition.subtype === 'doubleAnchor') {
      if (captainIndices.length > 0) {
        cardsToReplaceIndices.push(captainIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }

      if (captainIndices.length > 0) {
        cardsToReplaceIndices.push(captainIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }
    } else if (expedition.subtype === 'doubleCross') {
      if (priestIndices.length > 0) {
        cardsToReplaceIndices.push(priestIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }

      if (priestIndices.length > 0) {
        cardsToReplaceIndices.push(priestIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }
    } else if (expedition.subtype === 'doubleHouse') {
      if (settlerIndices.length > 0) {
        cardsToReplaceIndices.push(settlerIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }

      if (settlerIndices.length > 0) {
        cardsToReplaceIndices.push(settlerIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }
    } else if (expedition.subtype === 'doubleAnchorHouse') {
      if (captainIndices.length > 0) {
        cardsToReplaceIndices.push(captainIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }

      if (captainIndices.length > 0) {
        cardsToReplaceIndices.push(captainIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }

      if (settlerIndices.length > 0) {
        cardsToReplaceIndices.push(settlerIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }
    } else if (expedition.subtype === 'doubleCrossHouse') {
      if (priestIndices.length > 0) {
        cardsToReplaceIndices.push(priestIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }

      if (priestIndices.length > 0) {
        cardsToReplaceIndices.push(priestIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }

      if (settlerIndices.length > 0) {
        cardsToReplaceIndices.push(settlerIndices.splice(0, 1));
      } else if (jackOfAllTradesIndices.length > 0) {
        cardsToReplaceIndices.push(jackOfAllTradesIndices.splice(0, 1));
      } else {
        return INVALID_MOVE;
      }
    }

    G.expeditionDisplay = G.expeditionDisplay.slice();
    G.playerDisplays[ctx.currentPlayer] = G.playerDisplays[ctx.currentPlayer].concat(G.expeditionDisplay.splice(cardIndex, 1));
    G.discardPile = G.discardPile.slice();
    for (const index of cardsToReplaceIndices) {
      G.discardPile.push(G.playerDisplays[ctx.currentPlayer].splice(index, 1));
      G.playerCoins[ctx.currentPlayer]++;
    }
  }
}

function TradeShip(G, ctx, cardIndex, playerId) {
  if ((G.drawCount > 0) && (cardIndex >= 0) && (cardIndex < G.harborDisplayShips.length)) {
    let tradedShip = G.harborDisplayShips[cardIndex];

    if (tradedShip.extraCoin === true) {
      if (!((playerId >= 0) && (playerId < ctx.numPlayers) && (playerId !== ctx.currentPlayer))) {
        // If ship has an extra coin for another player, playerId needs to be set to a valid value
        return INVALID_MOVE;
      }
    }

    // Add coins to player and check whether there are cards to take
    G.playerCoins = G.playerCoins.slice();
    G.playerCoins[ctx.currentPlayer] += tradedShip.coins;

    // Add extra coin to selected playerId
    G.playerCoins[playerId] += 1;

    // if other players take cards, one coin needs to be given to the active player.
    if (G.activePlayer !== ctx.currentPlayer) {
      G.playerCoins[ctx.currentPlayer]--;
      G.playerCoins[G.activePlayer]++;
    }

    if (tradedShip.color === 'green') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumGreenTraders[ctx.currentPlayer];
      G.drawCount += G.playerNumGreenClerks[ctx.currentPlayer];
      G.playerVictoryPoints[ctx.currentPlayer] += G.playerNumGreenWholeSalers[ctx.currentPlayer];
    } else if (tradedShip.color === 'blue') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumBlueTraders[ctx.currentPlayer];
      G.drawCount += G.playerNumBlueClerks[ctx.currentPlayer];
      G.playerVictoryPoints[ctx.currentPlayer] += G.playerNumBlueWholeSalers[ctx.currentPlayer];
    } else if (tradedShip.color === 'red') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumRedTraders[ctx.currentPlayer];
      G.drawCount += G.playerNumRedClerks[ctx.currentPlayer];
      G.playerVictoryPoints[ctx.currentPlayer] += G.playerNumRedWholeSalers[ctx.currentPlayer];
    } else if (tradedShip.color === 'black') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumBlackTraders[ctx.currentPlayer];
      G.drawCount += G.playerNumBlackClerks[ctx.currentPlayer];
      G.playerVictoryPoints[ctx.currentPlayer] += G.playerNumBlackWholeSalers[ctx.currentPlayer];
    } else if (tradedShip.color === 'yellow') {
      G.playerCoins[ctx.currentPlayer] += G.playerNumYellowTraders[ctx.currentPlayer];
      G.drawCount += G.playerNumYellowClerks[ctx.currentPlayer];
      G.playerVictoryPoints[ctx.currentPlayer] += G.playerNumYellowWholeSalers[ctx.currentPlayer];
    }
    
    // Add Ship to discard pile
    G.discardPile = G.discardPile.concat([ tradedShip ]);

    // Remove ship from harbor display
    G.harborDisplayShips = G.harborDisplayShips.slice();
    G.harborDisplayShips.splice(cardIndex, 1);

    // Reduce counter of cards that could be taken
    G.drawCount--;

    if (G.drawCount === 0) {
      ctx.events.endTurn();
    }
  } else {
    return INVALID_MOVE;
  }
}

function HirePerson(G, ctx, cardIndex) {
  // Check whether another card can be taken and check whether there are cards to take
  if ((G.drawCount > 0) && (cardIndex >= 0) && (cardIndex < G.harborDisplayNonShips.length)) {
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
      } else if (hiredPerson.subtype === 'Vice Admiral') {
        G.playerNumViceAdmirals = G.playerNumViceAdmirals.slice();
        G.playerNumViceAdmirals[ctx.currentPlayer]++;
      } else if (hiredPerson.subtype === 'Gunner') {
        G.playerNumGunners = G.playerNumGunners.slice();
        G.playerNumGunners[ctx.currentPlayer]++;
      } else if (hiredPerson.subtype === 'Gambler') {
        G.playerNumGamblers = G.playerNumGamblers.slice();
        G.playerNumGamblers[ctx.currentPlayer]++;
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
      } else if (hiredPerson.subtype === 'Clerk') {
        if (hiredPerson.color === 'green') {
          G.playerNumGreenClerks = G.playerNumGreenClerks.slice();
          G.playerNumGreenClerks[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'blue') {
          G.playerNumBlueClerks = G.playerNumBlueClerks.slice();
          G.playerNumBlueClerks[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'red') {
          G.playerNumRedClerks = G.playerNumRedClerks.slice();
          G.playerNumRedClerks[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'black') {
          G.playerNumBlackClerks = G.playerNumBlackClerks.slice();
          G.playerNumBlackClerks[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'yellow') {
          G.playerNumYellowClerks = G.playerNumYellowClerks.slice();
          G.playerNumYellowClerks[ctx.currentPlayer]++;
        }
      } else if (hiredPerson.subtype === 'Whole Saler') {
        if (hiredPerson.color === 'green') {
          G.playerNumGreenWholeSalers = G.playerNumGreenWholeSalers.slice();
          G.playerNumGreenWholeSalers[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'blue') {
          G.playerNumBlueWholeSalers = G.playerNumBlueWholeSalers.slice();
          G.playerNumBlueWholeSalers[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'red') {
          G.playerNumRedWholeSalers = G.playerNumRedWholeSalers.slice();
          G.playerNumRedWholeSalers[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'black') {
          G.playerNumBlackWholeSalers = G.playerNumBlackWholeSalers.slice();
          G.playerNumBlackWholeSalers[ctx.currentPlayer]++;
        } else if (hiredPerson.color === 'yellow') {
          G.playerNumYellowWholeSalers = G.playerNumYellowWholeSalers.slice();
          G.playerNumYellowWholeSalers[ctx.currentPlayer]++;
        }
      }

      // Reduce counter of cards that could be taken
      G.drawCount--;

      if (G.drawCount === 0) {
        ctx.events.endTurn();
      }
    }
  } else {
    return INVALID_MOVE;
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

    G.harborDisplayShips  = G.harborDisplayShips.concat([drawnCard]);
    if (discardHarborDisplay) {
      ctx.events.setStage('discoverFailed');
    } else {
      ctx.events.setStage('discover');
    }
  }
}

function DrawCard(G, ctx, gambling) {
  if ((G.gambleCount > 0) && !((gambling === true) || (gambling === 1))) {
    // only gambling is allowed
    return INVALID_MOVE;
  }

  let drawAmount = 1;
  if ((gambling === true) || (gambling === 1)) {
    if (G.gambleCount < G.playerNumGamblers[ctx.currentPlayer]) {
      drawAmount = 4;
      G.gambleCount++;
    } else {
      // not enough Gamblers to gamble again
      return INVALID_MOVE;
    }
  }

  let discardHarborDisplay = false;
  for (let d = 0; d < drawAmount; d++) {
    let drawnCard = G.secret.drawPile.slice(0,1)[0];
    G.secret.drawPile = G.secret.drawPile.slice(1);

    if (drawnCard.type === 'Expedition') {
      G.expeditionDisplay = G.expeditionDisplay.concat([drawnCard]);
    } else if (drawnCard.type === 'Person') {
      G.harborDisplayNonShips = G.harborDisplayNonShips.concat([drawnCard]);
    } else if (drawnCard.type === 'Ship') {
      // ships can only be repelled before the gambler is played
      if ((G.gambleCount === 0) && (drawnCard.swords <= G.playerSwords[ctx.currentPlayer])) {
        G.shipToRepel = drawnCard;
        ctx.events.setStage('repelShip');
      } else {
        for (const ship of G.harborDisplayShips) {
          if (ship.color === drawnCard.color) {
            discardHarborDisplay = true;
            break;
          }
        }

        G.harborDisplayShips  = G.harborDisplayShips.concat([drawnCard]);
        // only discard cards if we have drawn the last card that had to be drawn
        if (discardHarborDisplay && (d === (drawAmount - 1))) {
          ctx.events.setStage('discoverFailed');
        }
      }
    } else if (drawnCard.type === 'TaxIncrease') {
      G.drawnTaxIncrease = drawnCard;
      ctx.events.setStage('handleTaxIncrease');
    }

    if (G.secret.drawPile.length === 0) {
      if (G.discardPile.length > 0) {
        G.secret.drawPile = ctx.random.Shuffle(G.discardPile);
        G.discardPile = [];
      } else {
        ctx.events.endGame();
      }
    }
  }
}

function BeginTurn(G, ctx) {
  let turnmod = (ctx.turn - 1) % (ctx.numPlayers * (ctx.numPlayers + 1));
  G.endTurnAutomatically[ctx.currentPlayer] = Array(ctx.numPlayers).fill(0);

  // Count how many cards a player can draw
  G.drawCount = 1;
  G.drawCount += G.playerNumGovenors[ctx.currentPlayer];

  // Reset counter for gambling rounds
  G.gambleCount = 0;

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
    // A periodic task in the client will check for this value to decide whether to end a turn automatically
    G.endTurnAutomatically[ctx.currentPlayer] = true;
  } else {
    // Get one coin for each Jester
    if ((G.playerNumJesters > 0) && (G.harborDisplayShips === 0) && (G.harborDisplayNonShips === 0)) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumJesters[ctx.currentPlayer];
    }

    let numCardsInHarborDisplays = G.harborDisplayShips.length + G.harborDisplayNonShips.length;
    // Get two coins for each Admiral if 5 or more cards in harbor display
    if (G.playerNumAdmirals[ctx.currentPlayer] > 0 && numCardsInHarborDisplays >= 5) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumAdmirals[ctx.currentPlayer] * 2;
    }

    // Get one coin for each Vice Admiral if 3 or 4 cards in harbor display
    if (G.playerNumViceAdmirals[ctx.currentPlayer] > 0 && (numCardsInHarborDisplays === 3 || numCardsInHarborDisplays === 4)) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumViceAdmirals[ctx.currentPlayer];
    }

    // Get coins for ships in harbor display for each Gunner
    if (G.playerNumGunners[ctx.currentPlayer] > 0 && G.harborDisplayShips.length > 1) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumGunners[ctx.currentPlayer] * (G.harborDisplayShips.length - 1);
    }

    // Only trade&hire
    ctx.events.setStage('tradeAndHire');

    // Let the board automatically end the turn, if there are no meaningful cards left
    if ((G.harborDisplayShips.length === 0) && (G.harborDisplayNonShips.length === 0)) {
      G.endTurnAutomatically[ctx.currentPlayer] = true;
    }
  }
}

function EndStage(G, ctx) {
  let currentStage = ctx.activePlayers[ctx.currentPlayer];

  if ((currentStage === 'discover') || (currentStage === 'gambling')) {
    // tradeAndHire onBegin equivalent (only for the currentPlayer)
    let numCardsInHarborDisplays = G.harborDisplayShips.length + G.harborDisplayNonShips.length;
    // Get two coins for each Admiral if 5 or more cards in harbor display
    if (G.playerNumAdmirals[ctx.currentPlayer] > 0 && numCardsInHarborDisplays >= 5) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumAdmirals[ctx.currentPlayer] * 2;
    }

    // Get one coin for each Vice Admiral if 3 or 4 cards in harbor display
    if (G.playerNumViceAdmirals[ctx.currentPlayer] > 0 && (numCardsInHarborDisplays === 3 || numCardsInHarborDisplays === 4)) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumViceAdmirals[ctx.currentPlayer];
    }

    // Get coins for ships in harbor display for each Gunner
    if (G.playerNumGunners[ctx.currentPlayer] > 0 && G.harborDisplayShips.length > 1) {
      G.playerCoins = G.playerCoins.slice();
      G.playerCoins[ctx.currentPlayer] += G.playerNumGunners[ctx.currentPlayer] * (G.harborDisplayShips.length - 1);
    }

    if (G.harborDisplayShips.length >= 4) {
      G.drawCount += G.harborDisplayShips.length - 3;
    }
    ctx.events.setStage('tradeAndHire');
  } else if (currentStage === 'discoverFailed') {
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
  } else if (currentStage === 'handleTaxIncrease') {
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

    if (G.drawnTaxIncrease.subtype === 'minVictoryPoints') {
      for (let i = 0; i < ctx.numPlayers; i++) {
        if (G.playerVictoryPoints[i] === minVictoryPoints) {
          newPlayerCoins[i]++;
        }
      }
    }

    if (G.drawnTaxIncrease.subtype === 'maxSwords') {
      for (let i = 0; i < ctx.numPlayers; i++) {
        if (G.playerSwords[i] === maxSwords) {
          newPlayerCoins[i]++;
        }
      }
    }

    G.playerCoins = newPlayerCoins;

    G.discardPile = G.discardPile.concat([G.drawnTaxIncrease]);
    G.drawnTaxIncrease = null;
    // return to discovery
    ctx.events.endStage();
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
        { type: 'Expedition', subtype: 'anchorCrossHouse', victoryPoints: 5, imageFilename: 'card_zoom-0.png', game: 'base' },
        { type: 'Expedition', subtype: 'doubleAnchor', victoryPoints: 4, imageFilename: 'card_zoom-1.png', game: 'base' },
        { type: 'Expedition', subtype: 'doubleCross', victoryPoints: 4, imageFilename: 'card_zoom-2.png', game: 'base' },
        { type: 'Expedition', subtype: 'doubleHouse', victoryPoints: 4, imageFilename: 'card_zoom-3.png', game: 'base' },
        { type: 'Expedition', subtype: 'doubleAnchorHouse', victoryPoints: 6, imageFilename: 'card_zoom-4.png', game: 'base' },
        { type: 'Expedition', subtype: 'doubleCrossHouse', victoryPoints: 6, imageFilename: 'card_zoom-5.png', game: 'base' },
        { type: 'Person', subtype: 'Admiral', victoryPoints: 1, hireingCosts : 5, imageFilename: 'card_zoom-6.png', game: 'base' },
        { type: 'Person', subtype: 'Admiral', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-9.png', game: 'base' },
        { type: 'Person', subtype: 'Admiral', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-9.png', game: 'base' },
/*
        { type: 'Person', subtype: 'Admiral', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-9.png', game: 'base' },
        { type: 'Person', subtype: 'Admiral', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-10.png', game: 'base' },
        { type: 'Person', subtype: 'Admiral', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-10.png', game: 'base' },
        { type: 'Person', subtype: 'Mademoiselle', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-13.png', game: 'base' },
        { type: 'Person', subtype: 'Mademoiselle', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-13.png', game: 'base' },
        { type: 'Person', subtype: 'Mademoiselle', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-15.png', game: 'base' },
        { type: 'Person', subtype: 'Mademoiselle', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-15.png', game: 'base' },
        { type: 'Person', subtype: 'Jester', victoryPoints: 1, hireingCosts : 5, imageFilename: 'card_zoom-16.png', game: 'base' },
        { type: 'Person', subtype: 'Jester', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-17.png', game: 'base' },
        { type: 'Person', subtype: 'Jester', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-17.png', game: 'base' },
        { type: 'Person', subtype: 'Jester', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-17.png', game: 'base' },
        { type: 'Person', subtype: 'Jester', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-20.png', game: 'base' },
        { type: 'Person', subtype: 'Govenor', victoryPoints: 0, hireingCosts : 8, imageFilename: 'card_zoom-21.png', game: 'base' },
        { type: 'Person', subtype: 'Govenor', victoryPoints: 0, hireingCosts : 8, imageFilename: 'card_zoom-21.png', game: 'base' },
        { type: 'Person', subtype: 'Govenor', victoryPoints: 0, hireingCosts : 8, imageFilename: 'card_zoom-21.png', game: 'base' },
        { type: 'Person', subtype: 'Govenor', victoryPoints: 0, hireingCosts : 8, imageFilename: 'card_zoom-21.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'green', imageFilename: 'card_zoom-25.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'green', imageFilename: 'card_zoom-25.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'blue', imageFilename: 'card_zoom-27.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 2, hireingCosts : 5, color: 'blue', imageFilename: 'card_zoom-28.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'red', imageFilename: 'card_zoom-29.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'red', imageFilename: 'card_zoom-29.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'black', imageFilename: 'card_zoom-31.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'black', imageFilename: 'card_zoom-31.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 1, hireingCosts : 3, color: 'yellow', imageFilename: 'card_zoom-33.png', game: 'base' },
        { type: 'Person', subtype: 'Trader', victoryPoints: 2, hireingCosts : 5, color: 'yellow', imageFilename: 'card_zoom-34.png', game: 'base' },
        { type: 'Person', subtype: 'JackOfAllTrades', victoryPoints: 1, hireingCosts : 6, imageFilename: 'card_zoom-35.png', game: 'base' },
        { type: 'Person', subtype: 'JackOfAllTrades', victoryPoints: 1, hireingCosts : 6, imageFilename: 'card_zoom-35.png', game: 'base' },
        { type: 'Person', subtype: 'JackOfAllTrades', victoryPoints: 1, hireingCosts : 6, imageFilename: 'card_zoom-35.png', game: 'base' },
        { type: 'Person', subtype: 'Captain', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-38.png', game: 'base' },
        { type: 'Person', subtype: 'Captain', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-38.png', game: 'base' },
        { type: 'Person', subtype: 'Captain', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-38.png', game: 'base' },
        { type: 'Person', subtype: 'Captain', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-38.png', game: 'base' },
        { type: 'Person', subtype: 'Captain', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-38.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 1, hireingCosts : 3, imageFilename: 'card_zoom-49.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 1, hireingCosts : 3, imageFilename: 'card_zoom-49.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 1, hireingCosts : 3, imageFilename: 'card_zoom-49.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 1, hireingCosts : 3, imageFilename: 'card_zoom-49.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 1, hireingCosts : 3, imageFilename: 'card_zoom-49.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 1, hireingCosts : 3, imageFilename: 'card_zoom-49.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 1, hireingCosts : 3, imageFilename: 'card_zoom-49.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 2, hireingCosts : 5, imageFilename: 'card_zoom-51.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 2, hireingCosts : 5, imageFilename: 'card_zoom-51.png', game: 'base' },
        { type: 'Person', subtype: 'Sailor', swords: 1, victoryPoints: 3, hireingCosts : 7, imageFilename: 'card_zoom-52.png', game: 'base' },
        { type: 'Person', subtype: 'Pirate', swords: 2, victoryPoints: 1, hireingCosts : 5, imageFilename: 'card_zoom-53.png', game: 'base' },
        { type: 'Person', subtype: 'Pirate', swords: 2, victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-54.png', game: 'base' },
        { type: 'Person', subtype: 'Pirate', swords: 2, victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-55.png', game: 'base' },
        { type: 'Person', subtype: 'Priest', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-56.png', game: 'base' },
        { type: 'Person', subtype: 'Priest', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-56.png', game: 'base' },
        { type: 'Person', subtype: 'Priest', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-56.png', game: 'base' },
        { type: 'Person', subtype: 'Priest', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-56.png', game: 'base' },
        { type: 'Person', subtype: 'Priest', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-56.png', game: 'base' },
        { type: 'Person', subtype: 'Settler', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-61.png', game: 'base' },
        { type: 'Person', subtype: 'Settler', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-61.png', game: 'base' },
        { type: 'Person', subtype: 'Settler', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-61.png', game: 'base' },
        { type: 'Person', subtype: 'Settler', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-61.png', game: 'base' },
        { type: 'Person', subtype: 'Settler', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-61.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 1, coins : 1, color: 'green', imageFilename: 'card_zoom-66.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 1, coins : 1, color: 'green', imageFilename: 'card_zoom-66.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 1, coins : 1, color: 'green', imageFilename: 'card_zoom-66.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 1, coins : 1, color: 'green', imageFilename: 'card_zoom-66.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Skiff', swords: 1, coins : 2, color: 'green', imageFilename: 'card_zoom-69.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 1, coins : 2, color: 'green', imageFilename: 'card_zoom-69.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Skiff', swords: 3, coins : 2, color: 'green', imageFilename: 'card_zoom-70.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 3, coins : 2, color: 'green', imageFilename: 'card_zoom-70.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 3, coins : 2, color: 'green', imageFilename: 'card_zoom-70.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Skiff', swords: 3, coins : 3, color: 'green', imageFilename: 'card_zoom-72.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 5, coins : 3, color: 'green', imageFilename: 'card_zoom-73.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 5, coins : 3, color: 'green', imageFilename: 'card_zoom-73.png', game: 'base' },
        { type: 'Ship', subtype: 'Skiff', swords: 5, coins : 4, color: 'green', imageFilename: 'card_zoom-75.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 1, coins : 1, color: 'blue', imageFilename: 'card_zoom-76.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 1, coins : 1, color: 'blue', imageFilename: 'card_zoom-76.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 1, coins : 1, color: 'blue', imageFilename: 'card_zoom-76.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 1, coins : 1, color: 'blue', imageFilename: 'card_zoom-76.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Flute', swords: 1, coins : 2, color: 'blue', imageFilename: 'card_zoom-79.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 2, coins : 2, color: 'blue', imageFilename: 'card_zoom-80.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 2, coins : 2, color: 'blue', imageFilename: 'card_zoom-80.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 2, coins : 2, color: 'blue', imageFilename: 'card_zoom-80.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Flute', swords: 2, coins : 3, color: 'blue', imageFilename: 'card_zoom-82.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 5, coins : 3, color: 'blue', imageFilename: 'card_zoom-83.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 5, coins : 3, color: 'blue', imageFilename: 'card_zoom-83.png', game: 'base' },
        { type: 'Ship', subtype: 'Flute', swords: 5, coins : 3, color: 'blue', imageFilename: 'card_zoom-83.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Flute', swords: 5, coins : 4, color: 'blue', imageFilename: 'card_zoom-85.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 1, coins : 1, color: 'red', imageFilename: 'card_zoom-86.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 1, coins : 1, color: 'red', imageFilename: 'card_zoom-86.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 1, coins : 1, color: 'red', imageFilename: 'card_zoom-86.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 1, coins : 1, color: 'red', imageFilename: 'card_zoom-86.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Frigate', swords: 3, coins : 2, color: 'red', imageFilename: 'card_zoom-89.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 3, coins : 2, color: 'red', imageFilename: 'card_zoom-89.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 3, coins : 2, color: 'red', imageFilename: 'card_zoom-89.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 3, coins : 2, color: 'red', imageFilename: 'card_zoom-89.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Frigate', swords: 6, coins : 3, color: 'red', imageFilename: 'card_zoom-92.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 6, coins : 3, color: 'red', imageFilename: 'card_zoom-92.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 6, coins : 3, color: 'red', imageFilename: 'card_zoom-92.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Frigate', swords: 99, coins : 3, color: 'red', imageFilename: 'card_zoom-94.png', game: 'base' },
        { type: 'Ship', subtype: 'Frigate', swords: 99, coins : 4, color: 'red', imageFilename: 'card_zoom-95.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 2, coins : 1, color: 'black', imageFilename: 'card_zoom-96.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 2, coins : 1, color: 'black', imageFilename: 'card_zoom-96.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 2, coins : 1, color: 'black', imageFilename: 'card_zoom-96.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 2, coins : 1, color: 'black', imageFilename: 'card_zoom-96.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Galleon', swords: 2, coins : 1, color: 'black', imageFilename: 'card_zoom-96.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Galleon', swords: 4, coins : 2, color: 'black', imageFilename: 'card_zoom-99.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 4, coins : 2, color: 'black', imageFilename: 'card_zoom-99.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 4, coins : 2, color: 'black', imageFilename: 'card_zoom-99.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 7, coins : 3, color: 'black', imageFilename: 'card_zoom-102.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 7, coins : 3, color: 'black', imageFilename: 'card_zoom-102.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 99, coins : 3, color: 'black', imageFilename: 'card_zoom-104.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 99, coins : 4, color: 'black', imageFilename: 'card_zoom-105.png', game: 'base' },
        { type: 'Ship', subtype: 'Galleon', swords: 99, coins : 4, color: 'black', imageFilename: 'card_zoom-105.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Pinace', swords: 1, coins : 1, color: 'yellow', imageFilename: 'card_zoom-106.png', game: 'base' },
        { type: 'Ship', subtype: 'Pinace', swords: 1, coins : 1, color: 'yellow', imageFilename: 'card_zoom-106.png', game: 'base' },
        { type: 'Ship', subtype: 'Pinace', swords: 1, coins : 1, color: 'yellow', imageFilename: 'card_zoom-106.png', game: 'base' },
        { type: 'Ship', subtype: 'Pinace', swords: 1, coins : 1, color: 'yellow', imageFilename: 'card_zoom-106.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Pinace', swords: 1, coins : 2, color: 'yellow', imageFilename: 'card_zoom-109.png', game: 'base' },
        { type: 'Ship', subtype: 'Pinace', swords: 2, coins : 2, color: 'yellow', imageFilename: 'card_zoom-110.png', game: 'base' },
        { type: 'Ship', subtype: 'Pinace', swords: 2, coins : 2, color: 'yellow', imageFilename: 'card_zoom-110.png', game: 'base' },
        { type: 'Ship', subtype: 'Pinace', swords: 2, coins : 3, color: 'yellow', imageFilename: 'card_zoom-112.png', game: 'base' },
        { type: 'Ship', subtype: 'Pinace', swords: 4, coins : 3, color: 'yellow', imageFilename: 'card_zoom-113.png', game: 'base' },
        { type: 'Ship', subtype: 'Pinace', swords: 4, coins : 3, color: 'yellow', imageFilename: 'card_zoom-113.png', game: 'base' },
        { type: 'Ship', subtype: 'Pinace', swords: 4, coins : 3, color: 'yellow', imageFilename: 'card_zoom-113.png', game: 'unterwegs' },
        { type: 'Ship', subtype: 'Pinace', swords: 4, coins : 4, color: 'yellow', imageFilename: 'card_zoom-115.png', game: 'base' },
        { type: 'TaxIncrease', subtype: 'minVictoryPoints', imageFilename: 'card_zoom-116.png', game: 'base' },
        { type: 'TaxIncrease', subtype: 'minVictoryPoints', imageFilename: 'card_zoom-116.png', game: 'base' },
        { type: 'TaxIncrease', subtype: 'maxSwords', imageFilename: 'card_zoom-118.png', game: 'base' },
        { type: 'TaxIncrease', subtype: 'maxSwords', imageFilename: 'card_zoom-118.png', game: 'base' },
        { type: 'Person', subtype: 'Gunner', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-120.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Gunner', victoryPoints: 2, hireingCosts : 6, imageFilename: 'card_zoom-121.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Gunner', victoryPoints: 2, hireingCosts : 6, imageFilename: 'card_zoom-121.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Gunner', victoryPoints: 3, hireingCosts : 8, imageFilename: 'card_zoom-123.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Vice Admiral', victoryPoints: 1, hireingCosts : 5, imageFilename: 'card_zoom-124.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Vice Admiral', victoryPoints: 1, hireingCosts : 5, imageFilename: 'card_zoom-124.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Vice Admiral', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-126.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Vice Admiral', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-126.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Vice Admiral', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-128.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Clerk', victoryPoints: 3, hireingCosts : 9, color: 'green', imageFilename: 'card_zoom-129.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Clerk', victoryPoints: 2, hireingCosts : 6, color: 'blue', imageFilename: 'card_zoom-130.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Clerk', victoryPoints: 2, hireingCosts : 6, color: 'red', imageFilename: 'card_zoom-131.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Clerk', victoryPoints: 1, hireingCosts : 4, color: 'black', imageFilename: 'card_zoom-132.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Clerk', victoryPoints: 1, hireingCosts : 4, color: 'yellow', imageFilename: 'card_zoom-133.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Skiff', swords: 3, coins : 3, extraCoin: true, color: 'green', imageFilename: 'card_zoom-135.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Flute', swords: 5, coins : 3, extraCoin: true, color: 'blue', imageFilename: 'card_zoom-137.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Frigate', swords: 6, coins : 3, extraCoin: true, color: 'red', imageFilename: 'card_zoom-139.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Galleon', swords: 99, coins : 3, extraCoin: true, color: 'black', imageFilename: 'card_zoom-141.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Pinace', swords: 2, coins : 1, color: 'yellow', imageFilename: 'card_zoom-142.png', game: 'justOneMoreContract' },
        { type: 'Ship', subtype: 'Pinace', swords: 4, coins : 3, extraCoin: true, color: 'yellow', imageFilename: 'card_zoom-143.png', game: 'justOneMoreContract' },
        { type: 'Person', subtype: 'Passenger', victoryPoints: 2, hireingCosts : 4, imageFilename: 'card_zoom-144.png', game: 'unterwegs' },
        { type: 'Person', subtype: 'Passenger', victoryPoints: 2, hireingCosts : 4, imageFilename: 'card_zoom-144.png', game: 'unterwegs' },
        { type: 'Person', subtype: 'Passenger', victoryPoints: 2, hireingCosts : 4, imageFilename: 'card_zoom-144.png', game: 'unterwegs' },
        { type: 'Person', subtype: 'Passenger', victoryPoints: 2, hireingCosts : 4, imageFilename: 'card_zoom-144.png', game: 'unterwegs' },
        { type: 'Person', subtype: 'Passenger', victoryPoints: 2, hireingCosts : 4, imageFilename: 'card_zoom-144.png', game: 'unterwegs' },
        { type: 'Person', subtype: 'Gambler', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-149.png', game: 'gambler' },
        { type: 'Person', subtype: 'Gambler', victoryPoints: 1, hireingCosts : 4, imageFilename: 'card_zoom-149.png', game: 'gambler' },
        { type: 'Person', subtype: 'Gambler', victoryPoints: 2, hireingCosts : 6, imageFilename: 'card_zoom-151.png', game: 'gambler' },
        { type: 'Person', subtype: 'Gambler', victoryPoints: 3, hireingCosts : 8, imageFilename: 'card_zoom-152.png', game: 'gambler' },
        { type: 'Person', subtype: 'Whole Saler', victoryPoints: 2, hireingCosts : 6, color: 'green', imageFilename: 'card_zoom-153.png', game: 'unterwegs' },
        { type: 'Person', subtype: 'Whole Saler', victoryPoints: 3, hireingCosts : 8, color: 'blue', imageFilename: 'card_zoom-154.png', game: 'unterwegs' },
        { type: 'Person', subtype: 'Whole Saler', victoryPoints: 2, hireingCosts : 6, color: 'red', imageFilename: 'card_zoom-155.png', game: 'unterwegs' },
        { type: 'Person', subtype: 'Whole Saler', victoryPoints: 2, hireingCosts : 6, color: 'black', imageFilename: 'card_zoom-156.png', game: 'unterwegs' },
        { type: 'Person', subtype: 'Whole Saler', victoryPoints: 3, hireingCosts : 8, color: 'yellow', imageFilename: 'card_zoom-157.png', game: 'unterwegs' },
*/
      ]),
    },
    activePlayer: 0,
    drawCount: 0,
    gambleCount: 0,
    playerDisplays: Array(ctx.numPlayers).fill([]),
    playerCoins: Array(ctx.numPlayers).fill(3),
    playerSwords: Array(ctx.numPlayers).fill(0),
    playerVictoryPoints: Array(ctx.numPlayers).fill(0),
    playerNumGovenors: Array(ctx.numPlayers).fill(0),
    playerNumMademoiselles: Array(ctx.numPlayers).fill(0),
    playerNumJesters: Array(ctx.numPlayers).fill(0),
    playerNumAdmirals: Array(ctx.numPlayers).fill(0),
    playerNumViceAdmirals: Array(ctx.numPlayers).fill(0),
    playerNumGunners: Array(ctx.numPlayers).fill(0),
    playerNumGamblers: Array(ctx.numPlayers).fill(0),
    playerNumGreenTraders: Array(ctx.numPlayers).fill(0),
    playerNumBlueTraders: Array(ctx.numPlayers).fill(0),
    playerNumRedTraders: Array(ctx.numPlayers).fill(0),
    playerNumBlackTraders: Array(ctx.numPlayers).fill(0),
    playerNumYellowTraders: Array(ctx.numPlayers).fill(0),
    playerNumGreenClerks: Array(ctx.numPlayers).fill(0),
    playerNumBlueClerks: Array(ctx.numPlayers).fill(0),
    playerNumRedClerks: Array(ctx.numPlayers).fill(0),
    playerNumBlackClerks: Array(ctx.numPlayers).fill(0),
    playerNumYellowClerks: Array(ctx.numPlayers).fill(0),
    playerNumGreenWholeSalers: Array(ctx.numPlayers).fill(0),
    playerNumBlueWholeSalers: Array(ctx.numPlayers).fill(0),
    playerNumRedWholeSalers: Array(ctx.numPlayers).fill(0),
    playerNumBlackWholeSalers: Array(ctx.numPlayers).fill(0),
    playerNumYellowWholeSalers: Array(ctx.numPlayers).fill(0),
    harborDisplayShips: [],
    harborDisplayNonShips: [],
    shipToRepel: null,
    drawnTaxIncrease: null,
    expeditionDisplay: [],
    discardPile: [],
    endTurnAutomatically: Array(ctx.numPlayers).fill(false),
  }),

  turn: {
    onBegin: BeginTurn,

    stages: {
      discover: {
        moves: { EndStage, DrawCard: { move: DrawCard, client: false }, FulfillExpedition, DbgGetCoins, DbgGetSwords, DbgShuffleDrawPile },
        next: 'tradeAndHire',
      },

      discoverFailed: {
        moves: { EndStage },
      },

      handleTaxIncrease: {
        moves: { EndStage },
        next: 'discover',
      },

      repelShip: {
        moves: { EndStage, RepelShip },
        next: 'discover'
      },

      tradeAndHire: {
        moves: { EndStage, HirePerson, TradeShip, FulfillExpedition },
      },
    },
  },

  events: {
    endStage: false,
  }
};

export default PortRoyal;
