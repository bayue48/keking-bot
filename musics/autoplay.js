module.exports = {
  name: "autoplay",
  inVoiceChannel: true,
  async execute(message, args, client) {
    let mode = client.distube.toggleAutoplay(message);
    message.channel.send(
      "Set autoplay mode to `" + (mode ? "On" : "Off") + "`"
    );
  },
};
