module.exports = {
  name: "avatar",
  description: "Show users avatar",
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `Your avatar: ${message.author.displayAvatarURL({
          format: "png",
          dynamic: true,
          size: 512,
        })}`
      );
    }

    const avatarList = message.mentions.users.map((user) => {
      return `${user.username}'s avatar: ${user.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 512,
      })}`;
    });

    message.channel.send(avatarList);
  },
};
