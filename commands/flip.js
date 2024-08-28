const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('flip').setDescription('Flip a coin').setDMPermission(false),

    async execute(interaction){
      let rand = Math.floor(Math.random() * 2) + 1;     //choose a number between 1 and 2
        if(rand == 1){                      //1 = heads, 2 = tails
            interaction.reply('heads');
        }
        else{
        interaction.reply('tails');
        }
    
    }
}