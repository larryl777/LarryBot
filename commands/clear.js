const {SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear X amount of messages')
    .addIntegerOption(option => option
        .setName('amount')
        .setDescription('Number of messages to be deleted')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true))
        .setDMPermission(false),
    async execute(interaction, client){
        const amount = interaction.options.getInteger('amount');
        const channel = interaction.channel;

        if(!interaction.member.permissions.has(PermissionsBitField.ManageMessages)){
            return await interaction.reply({content: 'You do not have permission to delete messages', ephemeral: true});
        }
        if(!amount){
            return await interaction.reply({content: 'Please specify a number', ephemeral: true});
        }
        if(amount < 1 || amount > 100){
            return await interaction.reply({content: 'Please specify a number between 1 and 100', ephemeral: true});
        }

        await channel.bulkDelete(amount);
        const embed = new EmbedBuilder()
            .setColor("#0000FF")
            .setDescription(`Deleted ${amount} messages.`)
        
        await interaction.reply({embeds: [embed] });
    }
}

