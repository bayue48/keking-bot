module.exports = {
  name: "server",
  description: "Show a server info",
  execute(message) {
    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated at: ${message.guild.createdAt}\nRegion: ${message.guild.region}`
    );
  },
};
