require('dotenv').config();
// const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { CLIENT, GUILD, TOKEN } = process.env;
console.log(CLIENT, GUILD, TOKEN);

// const commands = [];
// const commandFolders = fs.readdirSync('./src/commands');

// for (const folder of commandFolders) {
//   const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
//   for (const file of commandFiles) {
//     const command = require(`./src/commands/${folder}/${file}`);
//     // commands.push(command.data.toJSON())
//     // commands.push(command.data)
//     commands.push(JSON.stringify(command.data));
//   }
// }
const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!')
  // new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  // new SlashCommandBuilder().setName('user').setDescription('Replies with user info!')
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(CLIENT, GUILD), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
