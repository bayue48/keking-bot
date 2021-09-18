const Discord = require("discord.js");

module.exports = {
  name: "help",
  async execute(message, args, client) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Commands")
      .setDescription(
        client.commands.map((cmd) => `\`${cmd.name}\``).join(", ")
      )
      .setColor("#F8AA2A")
      .setTimestamp();
    message.channel.send(embed);
  },
};
