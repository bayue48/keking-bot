const { MessageEmbed } = require('discord.js');
const findLyrics = require('@j0r6it0/lyricsfinder');

module.exports = {
  name: 'lyrics',
  aliases: ['ly'],
  description: 'Finds lyrics for a song',
  inVoiceChannel: true,
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) return message.channel.send('There are no songs in the queue.');
    if (!queue && !client.distube.isPlaying(message)) return 'There is nothing playing.';

    const song = queue.songs[0];
    const name = song.name;
    const link = song.url;
    const tn = song.thumbnail;

    let embed = new MessageEmbed()
      .setDescription(
        ` ${client.emotes.load} **Please wait, im looking for the Lyrics, It can take \`few \` seconds**.`
      )
      .setColor('BLURPLE');

    const msg = await message.channel.send({ embeds: [embed] });

    try {
      const title = await findLyrics(name, {
        useGenius: true,
        useGoogle: true,
        geniusToken: `${process.env.API}`
      });

      let embed = new MessageEmbed().setDescription(` ${client.emotes.error} **Lyrics not found**`).setColor('#c1abff');

      if (title === false) return msg.edit({ embeds: [embed] });

      const lyrics = title.lyrics;

      if (lyrics.length > 4095) {
        msg.delete();
        return message.channel.send('Lyrics are too long to be returned as embed');
      }

      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setTitle(name)
          .setURL(link)
          .setDescription(lyrics.trim())
          .setColor('BLURPLE')
          .setThumbnail(`${tn}`)
          .setTimestamp();

        return msg.edit({ embeds: [lyricsEmbed] });
      } else {
        const firstLyricsEmbed = new MessageEmbed()
          .setTitle(name)
          .setURL(link)
          .setDescription(lyrics.slice(0, 2048))
          .setColor('BLURPLE')
          .setThumbnail(`${tn}`)
          .setTimestamp();

        const secondLyricsEmbed = new MessageEmbed()
          .setTitle(name)
          .setURL(link)
          .setDescription(lyrics.slice(2048, lyrics.length))
          .setColor('BLURPLE')
          .setThumbnail(`${tn}`)
          .setTimestamp();
        msg.edit({ embeds: [firstLyricsEmbed] });

        message.channel.send({ embeds: [secondLyricsEmbed] });
        return;
      }
    } catch (e) {
      embed.setDescription('Got err : ' + e);
      msg.edit({ embeds: [embed] });
      console.log(e);
    }
  }
};
