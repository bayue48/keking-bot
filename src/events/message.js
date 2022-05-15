module.exports = {
  name: 'messageCreate',
  execute(message) {
    console.log(`${message.author.tag} in server ${message.guild.name} in channel #${message.channel.name} said: ${message.content}`);
  }
};
