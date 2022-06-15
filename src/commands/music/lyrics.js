const { MessageEmbed } = require('discord.js');
const findLyrics = require('@j0r6it0/lyricsfinder');
const util = require('../../helpers/embed');

module.exports = {
  name: 'lyrics',
  aliases: ['ly'],
  inVoiceChannel: true,
  usage: 'lyrics',
  description: 'Finds lyrics for a song',
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed('There are no songs in the queue.')]
      });
    if (!queue && !client.distube.isPlaying(message))
      return {
        embeds: [util.createTextEmbed('There is nothing playing.')]
      };

    const song = queue.songs[0];
    const name = song.name;
    const link = song.url;
    const tn = song.thumbnail;

    const msg = await message.channel.send({
      embeds: [
        util.createTextEmbed(
          ` ${client.emotes.load} **Please wait, im looking for the Lyrics, It can take \`few \` seconds**.`
        )
      ]
    });

    try {
      const title = await findLyrics(name, {
        useGenius: true,
        useGoogle: true,
        geniusToken: `${process.env.API}`
      });

      if (title === false)
        return msg.edit({ embeds: [util.createTextEmbed(`${client.emotes.error} **Lyrics not found**`)] });

      const lyrics = title.lyrics;

      if (lyrics.length > 4095) {
        msg.delete();
        return message.channel.send({ embeds: [util.createTextEmbed('Lyrics are too long to be returned as embed')] });
      }

      if (lyrics.length < 2048) {
        return msg.edit({ embeds: [util.createMessageEmbed(name, link, lyrics.trim(), tn)] });
      } else {
        msg.edit({ embeds: [util.createMessageEmbed(name, link, lyrics.slice(0, 2048), tn)] });

        message.channel.send({ embeds: [util.createMessageEmbed(name, link, lyrics.slice(2048, lyrics.length), tn)] });
        return;
      }
    } catch (e) {
      msg.edit({ embeds: [util.createTextEmbed(`Got err : ${e}`)] });
      console.log(e);
    }
  }
};
