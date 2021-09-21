module.exports = {
  name: "shuffle",
  description: "Shuffle playlist.",
  inVoiceChannel: true,
  async execute(message, args, client) {
    client.distube.shuffle(message);
    message.channel.send(
      `${client.emotes.success} | Successfully shuffle playlist.`
    );
  },
};
