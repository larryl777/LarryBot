const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const UserProfile = require('../models/UserProfile');

module.exports ={
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Display Your User Profile!')
        .setDMPermission(false),

    async execute(interaction){
        const userinfo = await UserProfile.findOne({ where: { userID: interaction.user.id } });

        if(userinfo){
            const embed = new EmbedBuilder()        //add embeded message
            .setTitle(`${userinfo.name}'s Profile:`)
            .setColor("White") 
            .setThumbnail(interaction.user.displayAvatarURL({dynamic: true }))
            .addFields(
                { name: 'Name', value: userinfo.name, inline: true },
                { name: 'Birthday', value: userinfo.bday, inline: true },
                { name: 'Favorite Food', value: userinfo.favoritefood, inline: true },
                { name: 'Favorite Game', value: userinfo.favoritegame, inline: true }
            )
            .setFooter({ text: 'Profile Information', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }) 
            .setTimestamp(new Date());

            await interaction.reply({embeds: [embed]});
        }
        else{
            interaction.reply({content: `You have not set up a profile! Use /setprofile to continue`, ephemeral: true});
        }
    }
}