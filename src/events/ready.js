module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setActivity({
      type: 'PLAYING',
      name: `type '-help' for list of commands
      | watching ${client.guilds.cache.size} servers`
    });
    console.log(`Ready! Logged in as ${client.user.tag}`);
  }
};
