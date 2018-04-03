const Hapi = require('hapi');
const inert = require('inert');
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, './build/index.html');
const server = new Hapi.Server();

server.connection({
  port: 8080,
  host: '0.0.0.0',
});
server.register(inert);
server.route([{
  path: '/static/media/{gif}',
  method: 'GET',
  handler: (request, reply) => {
    reply.file(path.join(__dirname, `./build/static/media/${request.params.gif}`));
  },
}, {
  path: '/ping',
  method: 'GET',
  handler: (request, reply) => {
    reply('pong');
  },
}, {
  path: '/js',
  method: 'GET',
  handler: {
    file: path.join(__dirname, './build/static/js/main.c727f7ae.js'),
  },
}, {
  path: '/css',
  method: 'GET',
  handler: {
    file: path.join(__dirname, './build/static/css/main.1d606759.css'),
  },
}, {
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply.file(fileName);
  },
}, {
  path: '/song',
  method: 'GET',
  handler: (request, reply) => {
    const songName = request.query.name;
    reply.file(`./songs/${songName}.mp3`);
  },
}, {
  path: '/songsList',
  method: 'GET',
  handler: (request, reply) => {
    let songsList = [];
    songsList = fs.readdirSync('./songs/');
    reply(songsList);
  },
}]);
server.start((error) => {
  if (error) {
    console.log(error);
    process.exit();
  }
  console.log(`server started ${server.info.uri}`);
});

