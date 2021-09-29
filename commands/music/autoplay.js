module.exports = {
  name: "autoplay",
  description: "Toggle autoplay on or off.",
  inVoiceChannel: true,
  async execute(message, args, client) {
    let mode = client.distube.toggleAutoplay(message);
    message.channel.send(
      "Set autoplay mode to `" + (mode ? "On" : "Off") + "`"
    );
  },
};
