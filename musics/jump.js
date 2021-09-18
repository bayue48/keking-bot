module.exports = {
  name: "jump",
  inVoiceChannel: true,
  async execute(message, args, client) {
    client.distube
      .jump(message, parseInt(args[0]))
      .catch(() =>
        message.channel.send(`${client.emotes.error} | Invalid song number.`)
      );
  },
};
