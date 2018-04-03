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
  path: '/ping',
  method: 'GET',
  handler: (request, reply) => {
    reply('pong');
  },
}, {
  path: '/static/js/main.7dc2daf4.js',
  method: 'GET',
  handler: {
    file: path.join(__dirname, './build/static/js/main.7dc2daf4.js'),
  },
}, {
  path: '/static/css/main.e89898b5.css',
  method: 'GET',
  handler: {
    file: path.join(__dirname, './build/static/css/main.e89898b5.css'),
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

