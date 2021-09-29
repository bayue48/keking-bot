module.exports = {
  name: "beep",
  cooldown: 5,
  description: "Beep!",
  execute(message) {
    message.channel.send("Boop.");
  },
};
