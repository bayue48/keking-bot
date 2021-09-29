const Discord = require("discord.js");
const { prefix } = require("../../config.json");

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  usage: "[command name]",
  cooldown: 5,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push(commands.map((command) => command.name).join(", "));
      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
      );

      const embed = new Discord.MessageEmbed()
        .setTitle("Commands")
        .setDescription(data)
        .setColor("#c1abff")
        .setTimestamp();
      message.channel.send(embed);
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    const embed = new Discord.MessageEmbed()
      .setTitle("Commands")
      .setDescription(data, { split: true })
      .setColor("#c1abff")
      .setTimestamp();
    message.channel.send(embed);
  },
};
