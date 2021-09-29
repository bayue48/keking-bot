module.exports = {
  name: "args",
  description: "Information about the arguments provided.",
  usage: "<argument>",
  args: true,
  execute(message, args) {
    if (args[0] === "foo") {
      return message.channel.send("bar");
    }

    message.channel.send(`First argument: ${args[0]}`);
  },
};
