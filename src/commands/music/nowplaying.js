const Discord = require('discord.js');
const prettyMilliseconds = require('pretty-ms');
const { porgressBar } = require('music-progress-bar');
const util = require('../../helpers/embed');

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  usage: 'nowplaying',
  description: 'Show the currently playing song.',
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) return message.channel.send({ embeds: [util.createTextEmbed('There are no songs in the queue.')] });
    if (!queue && !client.distube.isPlaying(message))
      return { embeds: [util.createTextEmbed('There is nothing playing.')] };

    const song = queue.songs[0];
    const name = song.name;
    const link = song.url;
    const tn = song.thumbnail;

    const current = queue.currentTime * 1000;
    const formated = prettyMilliseconds(current, { colonNotation: true, secondsDecimalDigits: 0 });

    try {
      message.channel.send({
        embeds: [
          util.createMessageEmbed(
            name,
            link,
            `${formated} - ${porgressBar(
              {
                currentPositon: queue.currentTime,
                endPositon: song.duration,
                width: 28,
                barStyle: '=',
                currentStyle: '🔘'
              },
              { format: ' [ <bar> ] <precent> <%>' }
            )} - ${song.formattedDuration}`,
            tn
          )
        ]
      });
    } catch (e) {
      message.channel.send({ embeds: [util.createTextEmbed(`There was an issue: \n\`${e}\``)] });
    }
  }
};
