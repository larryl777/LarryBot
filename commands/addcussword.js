const { SlashCommandBuilder } = require('discord.js');
const cussWords = require('../models/cussWords');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addcussword')
        .setDescription('Add a cuss word to the databank!')
        .addStringOption((option) =>
            option
            .setName('word')
            .setDescription('Which Word')
            .setRequired(true)
        ),
        async execute(interaction) {
            const cword = interaction.options.getString('word');
            const gid = interaction.guild.id; 
            try {
                const wordadd = await cussWords.findOne({ where: { word: cword, guildId: gid } });
        
                if (wordadd) {
                    // If word already exists, return
                    return interaction.reply('Word already exists');
                } else {
                    // Create a new record
                    await cussWords.create({
                        word: cword,
                        guildId: gid
                    });
                }
        
                interaction.reply(`"${cword}" has been added!`);
            } catch (error) {  
                console.error('Error storing word:', error);
                interaction.reply('There was an error saving your word. Please try again later.');
            }
        }
};