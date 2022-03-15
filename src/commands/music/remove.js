module.exports = {
  name: 'remove',
  aliases: ['delete', 'rm', 'del', 'd'],
  description: 'Removes a song from the queue.',
  inVoiceChannel: true,
  execute: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send('There is no queue.');
    if (!args[0]) return message.channel.send('Please specify a song to remove.');
    const song = queue.songs[args];
    if (!song) return message.channel.send('Could not find that song.');
    queue.songs.splice(queue.songs.indexOf(song), 1);
    message.channel.send(`Removed ${song.title} from the queue.`);
  }
};
