const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Show all commands",
  async execute(message, args, client) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Commands")
      .setDescription(
        client.commands.map((cmd) => `\`${cmd.name}\``).join(", ")
      )
      .setColor("#c1abff")
      .setTimestamp();
    message.channel.send(embed);
  },
};
