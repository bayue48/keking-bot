const util = require('../../helpers/embed');

module.exports = {
  name: 'anonymous',
  cooldown: 5,
  aliases: ['anon'],
  isDmCommand: true,
  usage: 'anon <channel_id> <message>',
  description: 'send anonymous to channel!',
  execute: async (client, message, args) => {
    // console.log("args",args)
    if (message.guild) return;

    // #nsfw in tomi club
    const groupId = isNaN(args[0]) ? 'channel_id' : args[0];

    // Find the group channel by ID
    const groupChannel = client.channels.cache.get(groupId);

    // Check if the group channel exists
    if (!groupChannel) {
        return message.channel.send('Group channel not found!');
    }

    // Send the message to the group channel
    const content = isNaN(args[0]) ? args.join(' ') : args.slice(1).join(' ');
    groupChannel.send(content || "keqing pengen resign");
  }
};
