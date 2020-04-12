# Port Royal

This is an open source implementation of the card game Port Royal. *It does not contain any graphics and fonts*.

## Start multiplayer server

### `node -r esm src/server.js`

You can edit the following line in  `src/App.js` to point to your server's address:
```
multiplayer: SocketIO({ server: 'localhost:8000' }),
```

## Start game

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Change number of players

Currently, this is still a lot of manual work. Change the following line to set the number of players in `src/App.js`:
```
  numPlayers: 2,
```
And add more buttons to chose the current player:
```
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
```
