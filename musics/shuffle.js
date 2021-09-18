module.exports = {
  name: "shuffle",
  inVoiceChannel: true,
  async execute(message, args, client) {
    client.distube.shuffle(message);
    message.channel.send(
      `${client.emotes.success} | Successfully shuffle playlist.`
    );
  },
};
