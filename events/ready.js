module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setActivity({
      type: "PLAYING",
      name: `ngoding sama Yu - http://keking.live`,
    });
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
