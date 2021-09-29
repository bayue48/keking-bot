module.exports = {
  name: "resume",
  description: "Resume a song.",
  inVoiceChannel: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );
    client.distube.resume(message);
    message.channel.send(`${client.emotes.play} | Resumed the song for you :)`);
  },
};
