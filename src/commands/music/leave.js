module.exports = {
  name: 'leave',
  execute: async (client, message) => {
    client.distube.voices.leave(message);
  }
};
