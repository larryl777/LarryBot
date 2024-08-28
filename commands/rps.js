const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rockpaperscissors')  
        .setDescription('Play Rock Paper Scissors with the Bot').setDMPermission(false),  
    
        async execute(interaction) {
    const embed = new EmbedBuilder()        //add embeded message
        .setTitle("RPS")
        .setDescription("Choose Rock Paper or Scissors")   
        .setColor("#00ff00")  
    const row = new ActionRowBuilder().addComponents(       //3 options for user to choose
        new ButtonBuilder()
            .setCustomId("rock")
            .setEmoji("🪨")
            .setStyle(1),
            new ButtonBuilder()
            .setCustomId("paper")
            .setEmoji("📝")
            .setStyle(1),
            new ButtonBuilder()
            .setCustomId("scissors")
            .setEmoji("✂️")
            .setStyle(1),
    );
    await interaction.reply({embeds: [embed], components: [row]});       //send the embedded message

    const selector = i => i.user.id === interaction.user.id;            //only user who started the game can click options
    const readmessage = interaction.channel.createMessageComponentCollector({ selector, componentType: ComponentType.Button, time: 30000 }); //read in choice

    readmessage.on('collect', async i=> {
        const userc = i.customId;                   //user's choice
        const botc = ['rock', 'paper', 'scissors'][Math.floor(Math.random()*3)]; //bot chooses random option of 3

        let result; 
        if(userc === botc){                 //same choices
            result = 'Tie!';
        }
        else if                                     //rock > scissors, paper > rock, scissors > paper
        ((userc === 'rock' && botc === 'scissors') || 
        (userc === 'paper' && botc === 'rock') || 
        (userc === 'scissors'&& botc === 'paper')){
            result = 'You win!';
        }
        else{
            result = 'You lose!';
        }

        const embedresult = new EmbedBuilder()          //embeded message that displays the result
            .setTitle("RPS Results!")
            .setDescription(`You chose ${userc}. \n LarryBot chose ${botc}. \n \n **${result}**`) 
            .setColor(result === 'You win!' ? "#00ff00" : "#ff0000"); 
           
        await i.update({ embeds: [embedresult], components: [] });  // update the message with the result and disable choices
        readmessage.stop();                                         // end reader after successful interaction
    });

    readmessage.on('end', collected => {                //game times out after 30 seconds
        if (collected.size === 0) {
            interaction.editReply({ content: "Game timed out... choose faster next time.", components: [] });
        }
    });
    }
};