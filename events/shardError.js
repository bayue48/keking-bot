module.exports = {
  name: "shardError",
  once: true,
  execute(error) {
    console.error("The websocket connection encountered an error:", error);
  },
};
