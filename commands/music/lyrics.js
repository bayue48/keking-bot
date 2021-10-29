const { MessageEmbed } = require("discord.js");
const findLyrics = require("@j0r6it0/lyricsfinder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Finds lyrics for a song",
  inVoiceChannel: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message);

    if (!queue) return message.channel.send("There are no songs in the queue.");
    if (!queue && !client.distube.isPlaying(message))
      return "There is nothing playing.";

    const song = queue.songs[0];
    const name = song.name;
    const user = song.user.tag;
    const avatar = song.user.displayAvatarURL({ dynamic: true, format: "png" });
    const link = song.url;
    const tn = song.thumbnail;

    let embed = new MessageEmbed()
      .setDescription(
        ` ${client.emotes.load} **Please wait, im looking for the Lyrics, It can take \`few \` seconds**.`
      )
      .setColor("#c1abff");

    const msg = await message.channel.send(embed);

    try {
      const title = await findLyrics(name, {
        useGenius: true,
        useGoogle: true,
        geniusToken: `${process.env.API}`,
      });

      if (title === false) return message.channel.send("Lyrics not found");

      const lyrics = title.lyrics;

      if (lyrics.length > 4095) {
        msg.delete();
        return message.channel.send(
          "Lyrics are too long to be returned as embed"
        );
      }

      if (lyrics.length < 2048) {
        const lyricsEmbed = new MessageEmbed()
          .setTitle(name)
          .setURL(link)
          .setDescription(lyrics.trim())
          .setTimestamp()
          .setColor("#c1abff")
          .setThumbnail(`${tn}`)
          .setFooter(user, avatar)
          .setTimestamp();

        return msg.edit(lyricsEmbed);
      } else {
        const firstLyricsEmbed = new MessageEmbed()
          .setTitle(name)
          .setURL(link)
          .setDescription(lyrics.slice(0, 2048))
          .setColor("#c1abff")
          .setThumbnail(`${tn}`)
          .setFooter(user, avatar)
          .setTimestamp();

        const secondLyricsEmbed = new MessageEmbed()
          .setTitle(name)
          .setURL(link)
          .setDescription(lyrics.slice(2048, lyrics.length))
          .setColor("#c1abff")
          .setThumbnail(`${tn}`)
          .setFooter(user, avatar)
          .setTimestamp();
        msg.edit(firstLyricsEmbed);

        message.channel.send(secondLyricsEmbed);
        return;
      }
    } catch (e) {
      embed.setDescription("Got err : " + e);
      msg.edit(embed);
      console.log(e);
    }
  },
};
