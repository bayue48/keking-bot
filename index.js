require("dotenv").config();
const fs = require("fs");

const DisTube = require("distube");
const Discord = require("discord.js");
const { prefix, emoji } = require("./config.json");

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.distube = new DisTube(client, {
  searchSongs: false,
  emitNewSongOnly: true,
  leaveOnFinish: false,
  searchCooldown: 30,
  leaveOnEmpty: false,
  emptyCooldown: 0,
  leaveOnStop: false,
});
client.aliases = new Discord.Collection();
client.emotes = emoji;

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

fs.readdir("./musics/", (err, files) => {
  if (err) return console.log("Could not find any commands!");
  const jsFiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("Could not find any commands!");
  jsFiles.forEach((file) => {
    const cmd = require(`./musics/${file}`);
    console.log(`Loaded ${file}`);
    client.commands.set(cmd.name, cmd);
  });
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filter || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
client.distube
  .on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 100;
  })
  .on("playSong", (message, queue, song) =>
    message.channel.send(
      `${client.emotes.play} | Playing \`${song.name}\` - \`${
        song.formattedDuration
      }\`\nRequested by: ${song.user}\n${status(queue)}`
    )
  )
  .on("addSong", (message, queue, song) =>
    message.channel.send(
      `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    )
  )
  .on("playList", (message, queue, playlist, song) =>
    message.channel.send(
      `${client.emotes.play} | Play \`${playlist.title}\` playlist (${
        playlist.total_items
      } songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${
        song.formattedDuration
      }\`\n${status(queue)}`
    )
  )
  .on("addList", (message, queue, playlist) =>
    message.channel.send(
      `${client.emotes.success} | Added \`${playlist.title}\` playlist (${
        playlist.total_items
      } songs) to queue\n${status(queue)}`
    )
  )
  // DisTubeOptions.searchSongs = true
  .on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(
      `**Choose an option from below**\n${result
        .map(
          (song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
        )
        .join("\n")}\n*Enter anything else or wait 30 seconds to cancel*`
    );
  })
  // DisTubeOptions.searchSongs = true
  .on("searchCancel", (message) =>
    message.channel.send(`${client.emotes.error} | Searching canceled`)
  )
  .on("error", (message, err) =>
    message.channel.send(
      `${client.emotes.error} | An error encountered: ${err}`
    )
  )
  .on("empty", (message) =>
    message.channel.send("Channel is empty. Leaving the channel")
  )
  .on("finish", (message) => message.channel.send("No more song in queue"))
  .on("noRelated", (message) =>
    message.channel.send(
      "Can't find related video to play. Stop playing music."
    )
  );

client.login(process.env.TOKEN);

// if (command === "args-info") {
//   if (!args.length) {
//     return message.channel.send(
//       `You didn't provide any arguments, ${message.author}!`
//     );
//   }

//   message.channel.send(`Command name: ${command}\nArguments: ${args}`);
// }
