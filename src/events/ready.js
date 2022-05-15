module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setActivity({
      type: 'PLAYING',
      name: `-help for list of commands | ${client.guilds.cache.size} servers | ${client.users.cache.size} users`
    });
    console.log(`Ready! Logged in as ${client.user.tag}`);
  }
};
