const Discord = require('discord.js');
const prettyMilliseconds = require('pretty-ms');
const { porgressBar } = require("music-progress-bar");

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  description: 'Show the currently playing song.',
  inVoiceChannel: true,
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) return message.channel.send('There are no songs in the queue.');
    if (!queue && !client.distube.isPlaying(message)) return 'There is nothing playing.';

    const song = queue.songs[0];
    const name = song.name;
    const link = song.url;
    const tn = song.thumbnail;

    const current = queue.currentTime * 1000
    const formated = prettyMilliseconds(current, { colonNotation: true, secondsDecimalDigits: 0 });

    const embed = new Discord.MessageEmbed()
      .setTitle(name)
      .setURL(link)
      .setDescription(`${formated} - ${porgressBar({currentPositon:queue.currentTime,endPositon:song.duration,width:28,barStyle:"=",currentStyle:"🔘"}, {format:" [ <bar> ] <precent> <%>"})} - ${song.formattedDuration}`)
      .setColor('BLURPLE')
      .setThumbnail(`${tn}`)
      .setTimestamp()

    try {
      message.channel.send({ embeds: [embed] });
    } catch (e) {
      message.channel.send(`There was an issue: \n\`${e}\``);
    }
  }
};
