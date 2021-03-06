const util = require('../../helpers/embed');

module.exports = {
  name: 'remove',
  aliases: ['delete', 'rm', 'del', 'd'],
  inVoiceChannel: true,
  usage: 'remove <song number>',
  description: 'Removes a song from the queue.',
  execute: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send({ embeds: [util.createTextEmbed('There is no queue.')] });
    if (!args[0]) return message.channel.send({ embeds: [util.createTextEmbed('Please specify a song to remove.')] });
    const song = queue.songs[args];
    if (!song) return message.channel.send({ embeds: [util.createTextEmbed('Could not find that song.')] });
    queue.songs.splice(queue.songs.indexOf(song), 1);
    message.channel.send({ embeds: [util.createTextEmbed(`Removed ${song.title} from the queue.`)] });
  }
};
