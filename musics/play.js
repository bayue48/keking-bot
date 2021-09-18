module.exports = {
  name: "play",
  inVoiceChannel: true,
  async execute(message, args, client) {
    const string = args.join(" ");
    if (!string)
      return message.channel.send(
        `${client.emotes.error} | Please enter a song url or query to search.`
      );
    try {
      client.distube.play(message, string);
    } catch (e) {
      message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
    }
  },
};
