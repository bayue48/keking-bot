module.exports = {
  name: "stop",
  aliases: ["leave", "bye"],
  description: "Stop playing and leave channel.",
  inVoiceChannel: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );
    client.distube.stop(message);
    message.channel.send(`${client.emotes.success} | Stopped!`);
  },
};
