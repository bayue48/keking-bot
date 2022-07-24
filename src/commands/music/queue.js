const util = require('../../helpers/embed');

module.exports = {
  name: 'queue',
  aliases: ['q'],
  inVoiceChannel: true,
  usage: 'queue',
  description: 'Show the queue',
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | There is nothing playing!`)]
      });

    const q = util.createQueueEmbed(queue.songs);
    q.forEach((e, i) => {
      e.footer = {
        text: `Page ${i + 1}/${q.length} | ${queue.songs.length} songs`
      };
    });

    emoji = [client.emotes.prev, client.emotes.next];
    current = 0;

    const m = await message.channel.send({
      embeds: [q[current]]
    });
    if (q.length > 1) {
      console.log(q.length);
      m.react(emoji[0]);
      m.react(emoji[1]);
    }

    try {
      const filter = (reaction, user) => {
        return emoji.includes(reaction.emoji.name) && user.id === message.author.id;
      };
      const collector = m.createReactionCollector(filter, {
        time: 120000
      });
      collector.on('collect', async (reaction, user) => {
        if (reaction.emoji.name === emoji[0]) {
          if (current === 0) return;
          current--;
          console.log(current);
          await m.edit({
            embeds: [q[current]]
          });
        } else if (reaction.emoji.name === emoji[1] && user.id === message.author.id) {
          if (current === q.length - 1) return;
          current++;
          console.log(current);
          await m.edit({
            embeds: [q[current]]
          });
        }
      });
      collector.on('end', async (collected, reason) => {
        if (reason === 'time') {
          console.log(collected);
          await m.reactions.removeAll();
          return message.channel.send({
            embeds: [util.createTextEmbed(`${client.emotes.error} | Timeout.`)]
          });
        }
      });
    } catch (e) {
      console.log(e);
      return message.channel.send({
        embeds: [util.createTextEmbed(`${client.emotes.error} | An error occured.`)]
      });
    }
  }
};
