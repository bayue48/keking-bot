module.exports = {
  name: 'queue',
  aliases: ['q'],
  execute: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`);
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n');
    if (q.length > 2000) {
      slice = q.slice(0, 500);
      message.channel.send(`${client.emotes.queue} | **Server Queue**\n${slice}`);
    } else {
      message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`);
    }
  }
};
