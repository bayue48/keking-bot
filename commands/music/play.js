module.exports = {
  name: "play",
  aliases: ["p"],
  description: "Play a song.",
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
      console.log("Erorr", e);
    }
  },
};
