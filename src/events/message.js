module.exports = {
  name: 'messageCreate',
  execute(message) {    
    if (!message.guild) return
    console.log(
      `${message.author.tag} in server ${message.guild.name} and channel #${message.channel.name} said: ${message.content}`
    );
  }
};
