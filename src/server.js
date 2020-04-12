const Server = require('boardgame.io/server').Server;
const PortRoyal = require('./game').default;
const server = Server({ games: [PortRoyal] });
server.run(8000);
