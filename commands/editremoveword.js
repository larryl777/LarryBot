const { SlashCommandBuilder } = require('discord.js');
const cussWords = require('../models/cussWords');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('editremove')
        .setDescription('Edit or delete a cuss word in the databank!')
        .addStringOption((option) =>
            option
            .setName('action')
            .setDescription('What do you want to do?')
            .setRequired(true)
            .addChoices(
                { name: 'Edit', value: 'edit' },
                { name: 'Delete', value: 'delete' }
            )
        )
        .addStringOption((option) =>
            option
            .setName('word')
            .setDescription('The cuss word')
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName('newword')
            .setDescription('The new word (required if editing)')
            .setRequired(false)
        ),
    async execute(interaction) {
        const action = interaction.options.getString('action');
        const word = interaction.options.getString('word');
        const newWord = interaction.options.getString('newword');
        const guildId = interaction.guild.id; 
  
        try {
           if (action === 'edit') {
                if (!newWord) {
                    return interaction.reply(`You must provide a new word to replace the old one.`);
                }
                const [rowsUpdated] = await cussWords.update(       //create an array to store updated words, 
                    { word: newWord },                              //.update returns an array where the first element is the # of rows being changed
                    { where: { word, guildId } }
                );
                if (rowsUpdated > 0) {          //if this array has elements, this means that the table in the db has been edited
                    return interaction.reply(`"${word}" has been updated to "${newWord}".`);
                } else {
                    return interaction.reply(`"${word}" could not be found in the data, please see if the word you are editing exists.`);
                }
            } 
            
            else if (action === 'delete') {
                if(newWord){                //trying to use newword with delete command should not do anything
                    return interaction.reply(`Cannot use 'newword' if you want to delete something!`);
                }
                const result = await cussWords.destroy({    //remove entry from table
                    where: { word, guildId }
                });
                if (result) {
                    return interaction.reply(`"${word}" has been deleted`);
                } else {
                    return interaction.reply(`"${word}" could not be found in the data, please see if the word you are editing exists.`);
                }
            } 
        } catch (error) {
            console.error('Error:', error);
            return interaction.reply({content: 'There was an error proccessing your request.', ephemeral: true});
        }
    }
};