const { SlashCommandBuilder } = require('discord.js');
const UserProfile = require('../models/UserProfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setprofile')
        .setDescription('Set an About Me')
        .setDMPermission(false)
        .addStringOption((option) =>
            option
            .setName('name')
            .setDescription('Set Your Name')
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName('bday')
            .setDescription('Set Your Birthday')
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName('favfood')
            .setDescription('Favorite Food?')
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName('favgame')
            .setDescription('Favorite Game to Play')
            .setRequired(true)
        ),

    async execute(interaction) {
        const userProfile = {
            userID: interaction.user.id,
            name: interaction.options.getString('name'),
            bday: interaction.options.getString('bday'),
            favoritefood: interaction.options.getString('favfood'),
            favoritegame: interaction.options.getString('favgame')
        };

        try {
            let profileExists = await UserProfile.findOne({ where: { userID: userProfile.userID } });
            if (profileExists) {
                await profileExists.update(userProfile);
                await profileExists.save();
            } else {
                await UserProfile.create(userProfile);
            }
            interaction.reply(`Profile Set`);
        } catch (error) {
            console.error('Error setting profile:', error);
            interaction.reply({ content: 'There was an error setting your profile', ephemeral: true });
        }
    }
}