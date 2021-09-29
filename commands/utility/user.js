module.exports = {
  name: "user",
  description: "Display info about yourself.",
  execute(message) {
    message.channel.send(
      `Your username: ${message.author.username}\nCreated at: ${
        message.author.createdAt
      }\nAvatar: ${message.author.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 512,
      })}`
    );
  },
};
