module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    if (client.inVoiceChannel) {
      const server = client.voice.connections.size;
      client.user.setActivity({
        type: "PLAYING",
        name: `music on ${server} servers`,
      });
    } else {
      client.user.setPresence({
        activity: { name: "ngoding sama Yu", type: "WATCHING" },
        status: "dnd",
      });
    }

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
