module.exports = {
  name: "seek",
  inVoiceChannel: true,
  async execute(message, args, client) {
    client.distube.seek(message, Number(args[0]));
    // .catch((e) =>
    //   message.channel.send(`${client.emotes.error} | Must be number.`)
    // );
  },
};
