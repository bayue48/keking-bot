module.exports = {
  name: "loop",
  aliases: ["repeat", "l"],
  description: "Looping through song or playlist.",
  inVoiceChannel: true,
  async execute(message, args, client) {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing playing!`
      );
    let mode = null;
    switch (args[0]) {
      case "off":
        mode = 0;
        break;
      case "song":
        mode = 1;
        break;
      case "queue":
        mode = 2;
        break;
    }
    mode = client.distube.setRepeatMode(message, mode);
    mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
    message.channel.send(
      `${client.emotes.repeat} | Set repeat mode to \`${mode}\``
    );
  },
};
