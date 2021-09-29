module.exports = {
  name: "pause",
  description: "Pause a song.",
  inVoiceChannel: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );
    if (queue.pause) {
      client.distube.resume(message);
      return message.channel.send(
        `${client.emotes.play} | Resumed the song for you :)`
      );
    }
    client.distube.pause(message);
    message.channel.send(`${client.emotes.pause} | Paused the song for you :)`);
  },
};
