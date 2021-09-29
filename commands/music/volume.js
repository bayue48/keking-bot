module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Increase or decrease volume.",
  inVoiceChannel: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );
    const volume = parseInt(args[0]);
    if (isNaN(volume))
      return message.channel.send(
        `${client.emotes.error} | Please enter a valid number!`
      );
    client.distube.setVolume(message, volume);
    message.channel.send(
      `${client.emotes.success} | Volume set to \`${volume}\``
    );
  },
};
