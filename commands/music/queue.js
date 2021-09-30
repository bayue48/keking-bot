const Discord = require("discord.js");

module.exports = {
  name: "queue",
  aliases: ["q"],
  description: "Show a playlist.",
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message);
    const song = queue.songs[0];
    const user = song.user.tag;
    const avatar = song.user.displayAvatarURL({ dynamic: true, format: "png" });

    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing playing!`
      );
    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
            song.formattedDuration
          }\``
      )
      .join("\n");

    const embed = new Discord.MessageEmbed()
      .setTitle("Server Queue")
      .setDescription(q)
      .setColor("#c1abff")
      .setFooter(user, avatar)
      .setTimestamp();
    message.channel.send(embed);
  },
};
