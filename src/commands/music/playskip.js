const util = require('../../helpers/embed');

module.exports = {
  name: 'playskip',
  aliases: ['ps'],
  inVoiceChannel: true,
  usage: 'playskip',
  description: 'Play and skip current song',
  execute: async (client, message, args) => {
    const string = args.join(' ');
    if (!string) return message.channel.send({ embeds: [util.createTextEmbed(`${client.emotes.error} | Please enter a song url or query to search.`)] });
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      skip: true
    });
  }
};
