import { Client } from 'boardgame.io/react';

function ShuffleDrawPile(G, ctx) {
  G.drawPile = ctx.random.Shuffle(G.drawPile);
}

function DrawCard(G, ctx) {
  let drawnCard = G.drawPile[0];
  G.drawPile = G.drawPile.slice(1);

  if (drawnCard.type === 'Expedition') {
    G.expeditionDisplay = G.expeditionDisplay.concat([drawnCard]);
  } else if (drawnCard.type === 'Person') {
    G.harborDisplayNonShips = G.harborDisplayNonShips.concat([drawnCard]);
  } else if (drawnCard.type === 'Ship') {
    G.harborDisplayShips  = G.harborDisplayShips.concat([drawnCard]);
  } else if (drawnCard.type === 'TaxIncrease') {
    G.discardPile  = G.discardPile.concat([drawnCard]);
  }
}

const TicTacToe = {
  setup: (ctx, setupData) => ({
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
      { type: 'Person', subtype: 'Sailor', victoryPoints: 1, hireingCosts : 3, imageFilename: 'card_zoom-49.png' },
      { type: 'Person', subtype: 'Sailor', victoryPoints: 2, hireingCosts : 5, imageFilename: 'card_zoom-51.png' },
      { type: 'Person', subtype: 'Sailor', victoryPoints: 3, hireingCosts : 7, imageFilename: 'card_zoom-52.png' },
      { type: 'Person', subtype: 'Pirate', victoryPoints: 1, hireingCosts : 5, imageFilename: 'card_zoom-53.png' },
      { type: 'Person', subtype: 'Pirate', victoryPoints: 2, hireingCosts : 7, imageFilename: 'card_zoom-54.png' },
      { type: 'Person', subtype: 'Pirate', victoryPoints: 3, hireingCosts : 9, imageFilename: 'card_zoom-55.png' },
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
    discardPile: Array(),
    harborDisplayShips: Array(),
    harborDisplayNonShips: Array(),
    expeditionDisplay: Array()
  }),

  phases: {
    discover: {
      moves: { DrawCard },
      start: true,
      next: 'tradeAndHire',
    },

    tradeAndHire: {
      moves: {  },
    },
  },

  moves: {
    ShuffleDrawPile,
  },
};

const App = Client({ game: TicTacToe });

export default App;
