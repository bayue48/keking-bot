module.exports = {
  name: "skip",
  aliases: ["s", "next", "n"],
  description: "Skip a song.",
  inVoiceChannel: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );
    try {
      client.distube.skip(message);
      message.channel.send(
        `${client.emotes.success} | Skipped! Now playing:\n${queue.songs[0].name}`
      );
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`);
    }
  },
};
