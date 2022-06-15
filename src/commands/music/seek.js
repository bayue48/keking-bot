const util = require('../../helpers/embed');

module.exports = {
  name: 'seek',
  aliases: ['to'],
  inVoiceChannel: true,
  usage: 'seek <time>',
  description: 'Seek to a certain time',
  execute: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing in the queue right now!`)]
      });
    if (!args[0]) {
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | Please provide position (in seconds) to seek!`)]
      });
    }
    const time = Number(args[0]);
    if (isNaN(time))
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | Please enter a valid number!`)]
      });
    queue.seek(time);
    message.channel.send({ embeds: [util.createTextEmbed(`Seeked to ${time}!`)] });
  }
};
