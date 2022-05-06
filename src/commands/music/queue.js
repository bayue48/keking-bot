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
      q.slice(0, 2000);
      message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`);
    }
    message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`);
  }
};
