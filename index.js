require('dotenv').config();
const { DisTube } = require('distube');
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ]
});
const fs = require('fs');
const { emoji, prefix } = require('./configs/prefix.json');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const express = require('express');
const app = express();
const { PORT, TOKEN, DEV } = process.env;
const server = PORT || 3000;
const util = require('./src/helpers/embed');

app.listen(server, () => {
  console.log(`Server is running at port ${PORT}`);
});

app.get('/', (_, res) => {
  res.send("Made with love by bayue#1015");
});

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  savePreviousSongs: true,
  searchSongs: 5,
  nsfw: true,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
  youtubeDL: false
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = emoji;
client.prefix = prefix;

const commandFolders = fs.readdirSync('./src/commands');

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const cmd = require(`./src/commands/${folder}/${file}`);
    console.log(`Loaded ${file}`);
    client.commands.set(cmd.name, cmd);
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
  }
}

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send({
      embeds: [util.createTextEmbed(`${client.emotes.error} | You must be in a voice channel to use this command.`)]
    });
  }
  try {
    cmd.execute(client, message, args);
  } catch (e) {
    console.error(e);
    message.channel.send({
      embeds: [
        util.createTextEmbed(`${client.emotes.error} | An error occured while executing this command. | \`${e}\``)
      ]
    });
  }
});

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

client.distube
  .on('playSong', (queue, song) => {
    queue.textChannel.send({
      embeds: [
        util.createMessageEmbed('🎵 Playing', null, `[${song.name}](${song.url})`, song.thumbnail, [
          { name: 'Requested By', value: `${song.user}`, inline: true },
          { name: 'Duration', value: `${song.formattedDuration.toString()}`, inline: true },
          { name: 'Status', value: status(queue) }
        ])
      ]
    });
  })
  .on('addSong', (queue, song) => {
    queue.textChannel.send({
      embeds: [
        util.createMessageEmbed('🎵 Added to Queue', null, `[${song.name}](${song.url})`, song.thumbnail, [
          { name: 'Requested By', value: `${song.user}`, inline: true },
          { name: 'Duration', value: `${song.formattedDuration.toString()}`, inline: true },
          { name: 'Status', value: status(queue) }
        ])
      ]
    });
  })
  .on('addList', (queue, playlist) => {
    queue.textChannel.send({
      embeds: [
        util.createMessageEmbed(
          '🎵 PlayList Added to Queue',
          null,
          `[${playlist.name} (${playlist.songs.length} songs)](${playlist.url})`,
          playlist.thumbnail,
          [
            { name: 'Requested By', value: `${playlist.user}`, inline: true },
            { name: 'Duration', value: `${playlist.formattedDuration.toString()}`, inline: true },
            { name: 'Status', value: status(queue) }
          ]
        )
      ]
    });
  })
  .on('noRelated', queue => queue.textChannel.send("Can't find related video to play."))
  .on('error', (channel, e) => {
    console.error(e);
    channel.send({
      embeds: [util.createTextEmbed(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)]
    });
  })
  .on('empty', queue =>
    queue.textChannel.send({
      embeds: [util.createTextEmbed('Voice channel is empty! Leaving the channel...')]
    })
  )
  .on('searchNoResult', (message, query) =>
    message.channel.send({
      embeds: [util.createTextEmbed(`${client.emotes.error} | No result found for \`${query}\`!`)]
    })
  )
  .on('finish', queue =>
    queue.textChannel.send({
      embeds: [util.createTextEmbed('No more song in queue')]
    })
  )
  // DisTubeOptions.searchSongs = true
  .on('searchResult', (message, result) => {
    let i = 0;
    message.channel.send({
      embeds: [
        util.createTextEmbed(
          `**Choose an option from below**\n${result
            .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
            .join('\n')}\n*Enter anything else or wait 60 seconds to cancel*`
        )
      ]
    });
  })
  .on('searchCancel', message =>
    message.channel.send({
      embeds: [util.createTextEmbed(`${client.emotes.error} | Searching canceled`)]
    })
  )
  .on('searchInvalidAnswer', message =>
    message.channel.send({
      embeds: [
        util.createTextEmbed(
          `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
        )
      ]
    })
  )
  .on('searchDone', () => {});

client.login(TOKEN);
