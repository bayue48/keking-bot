module.exports = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  inVoiceChannel: true,
  execute: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);
    const volume = parseInt(args[0]);
    if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`);
    queue.setVolume(volume);
    message.channel.send(`${client.emotes.success} | Volume set to \`${volume}\``);
  }
};
