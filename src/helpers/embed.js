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
        embed.addField(field.name, field.value, field.inline);
      }
    }
    return embed;
  },
  createTextEmbed: description => {
    const embed = new MessageEmbed().setDescription(description).setColor('BLURPLE');
    return embed;
  }
};