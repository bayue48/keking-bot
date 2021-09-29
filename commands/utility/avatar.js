module.exports = {
  name: "avatar",
  usage: "or -avatar @<user>",
  description: "Get the avatar URL of the tagged user(s), or your own avatar.",
  aliases: ["icon", "pfp"],
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
