module.exports = {
  name: "ping",
  cooldown: 5,
  description: "Ping!",
  execute(message, args, client) {
    message.channel.send(`Pong! ${client.ws.ping}ms`);
  },
};
