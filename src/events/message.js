module.exports = {
  name: 'messageCreate',
  execute(message) {
    console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
  }
};
