const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')  
        .setDescription('reply with hello')
        .addUserOption((option) =>
            option  
            .setName('user')
            .setDescription('say hi to another user')
            .setRequired(false)
    ),  
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        interaction.reply(`Hello ${user}!`);
    }
};