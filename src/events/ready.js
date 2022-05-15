module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setActivity({
      type: 'PLAYING',
      name: `type '-help' for list of commands
      | onlines: ${client.guilds.cache.size} servers
      | servers: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}
      | version: ${client.version}
      | ${client.users.cache.size} users`,
    });
    console.log(`Ready! Logged in as ${client.user.tag}`);
  }
};
