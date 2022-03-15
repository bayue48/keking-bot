const Discord = require('discord.js');
const bar = require(`stylish-text`);

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

    function toReadableTime(given) {
      var time = given;
      var minutes = '0' + Math.floor(time / 60);
      var seconds = '0' + (time - minutes * 60);
      return minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    const current = Math.floor(queue.currentTime / 1000);
    const end = song.duration;

    const value = (current * (100 / end)) / 5;

    bar.default.full = '█';
    bar.default.empty = ' - ';
    bar.default.start = '';
    bar.default.end = '';
    bar.default.text = '{bar}';

    const embed = new Discord.MessageEmbed()
      .setTitle(name)
      .setURL(link)
      .setDescription(`${toReadableTime(current)} - [${bar.progress(20, value)}] - ${toReadableTime(end)}`)
      .setColor('BLURPLE')
      .setThumbnail(`${tn}`)
      .setTimestamp();

    try {
      message.channel.send({ embeds: [embed] });
    } catch (e) {
      message.channel.send(`There was an issue: \n\`${e}\``);
    }
  }
};
