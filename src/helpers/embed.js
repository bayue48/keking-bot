const { MessageEmbed } = require('discord.js');

module.exports = {
  createMessageEmbed: (title, link, description, image, fields) => {
    const embed = new MessageEmbed()
      .setTitle(title)
      .setURL(link)
      .setDescription(description)
      .setColor('BLURPLE')
      .setThumbnail(image)
      .setTimestamp();
    if (fields) {
      for (const field of fields) {
        embed.addFields(field.name, field.value, field.inline);
      }
    }
    return embed;
  },
  createTextEmbed: description => {
    const embed = new MessageEmbed().setDescription(description).setColor('BLURPLE');
    return embed;
  },
  createQueueEmbed: queue => {
    let embeds = [];
    let k = 10;

    for (let i = 0; i < queue.length; i += 10) {
      const current = queue.slice(i, k);
      let j = i;
      k += 10;
      const info = current
        .map(
          track =>
            `**${++j}.** [${track.name}](${track.url}) - \`${track.formattedDuration}\` - Requested by: ${track.user}`
        )
        .join('\n');
      const embed = new MessageEmbed()
        .setTitle('🎵 Server Queue')
        .setColor('BLURPLE')
        .setTimestamp()
        .setDescription(
          `**Current Song: [${queue[0].name}](${queue[0].url}) - \`${queue[0].formattedDuration}\` - Requested by: ${queue[0].user}**\n\n${info}`
        );
      embeds.push(embed);
    }
    //returning the Embed
    return embeds;
  }
};
