require('dotenv').config();
const database = require('../database.json');

let current;
const {Client, IntentsBitField} = require('discord.js');

const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready',(c) => {
    console.log("Bonjour à tous ! Prêts pour la contrepèterie du jour ?");
});

client.on('interactionCreate',(interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction .commandName === 'hey')
    {
        interaction.reply("hey!");
    }

    if (interaction .commandName === 'ping')
    {
        interaction.reply("pong!");
    }

    if (interaction.commandName === 'contrepeterie')
    {
        if (current == null)
        {
            current = database[Math.floor(Math.random() * database.length)];
        }
        interaction.reply(current.phrase);
    }

    if (interaction.commandName === 'reponse')
    {
        interaction.reply('||' + current.contrepeterie + '||');
        current = null;
    }
})

client.on('messageCreate',(message) => {
    if (message.author.bot) {
        return;
    }
   if (message.content === "Salut")
   {
        message.reply("Hey !");
   }
})

client.login(process.env.TOKEN);
