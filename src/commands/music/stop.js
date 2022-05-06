module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave', 'dc'],
  inVoiceChannel: true,
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    queue.stop();
    message.channel.send(`${client.emotes.success} | Stopped!`);
  }
};
