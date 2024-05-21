module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    let statuses = [`Prefix : ${client.prefix}`
      , `${client.guilds.cache.size} Servers`
      , `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`
    ];
    setInterval(function () {
      let status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: 'WATCHING' });
    }, 10000)

    client.guilds.cache.forEach(guild => {
      console.log(`${guild.name} | ${guild.id}`, "ready");
    });

    console.log(`Ready! Logged in as ${client.user.tag} on ${client.guilds.cache.size} Servers`)
  }
};
