module.exports = {
  name: "jump",
  inVoiceChannel: true,
  async execute(message, args, client) {
    let queue = client.distube.getQueue(message);
    if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
      // message.channel.send(
      //   `${client.emotes.play} Successfully jumped to number ${parseInt(
      //     args[0]
      //   )} songs!`
      // );
      return client.distube
        .jump(message, parseInt(args[0]))
        .catch((err) =>
          message.channel.send(
            err,
            `${client.emotes.error} | Invalid song number.`
          )
        );
    } else {
      message.channel.send(
        `${
          client.emotes.error
        } | Invalid song number. Please use a number between **${
          queue.songs[0]
        }** and **${(queue.songs.length - 1)}**`
      );
    }
    // client.distube
    //   .jump(message, parseInt(args[0]))
    //   .catch((err) =>
    //     message.channel.send(
    //       err,
    //       `${client.emotes.error} | Invalid song number.`
    //     )
    //   );
  },
};
