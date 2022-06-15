const { Constants } = require('discord.js');
const util = require('../../helpers/embed');

module.exports = {
  name: 'join',
  aliases: ['move'],
  inVoiceChannel: true,
  usage: 'join',
  description: 'Join bot to voice channel',
  execute: async (client, message, args) => {
    let voiceChannel = message.member.voice.channel;
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0]);
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send({
          embeds: [util.createTextEmbed(`${client.emotes.error} | ${args[0]} is not a valid voice channel!`)]
        });
      }
    }
    if (!voiceChannel) {
      return message.channel.send({
        embeds: [
          util.createTextEmbed(`${client.emotes.error} | You must be in a voice channel or enter a voice channel id!`)
        ]
      });
    }
    client.distube.voices.join(voiceChannel);
  }
};
