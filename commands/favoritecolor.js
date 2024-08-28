const { SlashCommandBuilder } = require('discord.js');
const Color = require('../models/color');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setcolor')
        .setDescription('Set your favorite color')
        .addStringOption((option) =>
            option
            .setName('color')
            .setDescription('Your favorite color')
            .setRequired(true)
        ),
    async execute(interaction) {
        const color = interaction.options.getString('color');
        const userID = interaction.user.id;

        try {
            // Check if the user already has a favorite color stored
            let favoriteColor = await Color.findOne({ where: { userID } });

            if (favoriteColor) {
                // Update the existing record
                favoriteColor.color = color;
                await favoriteColor.save();
            } else {
                // Create a new record
                await Color.create({
                    userID,
                    color,
                });
            }

            interaction.reply(`Your favorite color has been set to ${color}!`);
        } catch (error) {
            console.error('Error storing favorite color:', error);
            interaction.reply('There was an error saving your favorite color. Please try again later.');
        }
    }
};