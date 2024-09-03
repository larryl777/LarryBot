const cussWords = require('../models/cussWords');
const cussTrack = require('../models/cussTrack');

module.exports = {
    name: 'messageCreate',
    async execute(interaction) {
        if (interaction.author.bot) {
            return;
        }
        const guildId = interaction.guild.id; 
        const user = interaction.author.id;    

        try {
            const cswrds = await cussWords.findAll({ where: { guildId }, attributes: ['word'] });   ////find all cuss words stored in table
            const messageContent = interaction.content.toLowerCase();                               // convert user message to lowercase
            const findcussword = cswrds.some(cussWord =>                //see if there is at least one cuss word    
                messageContent.includes(cussWord.word.toLowerCase())    //from the table/array in user's mesasge using .some
            );
            
            if (findcussword) {
                let userRecords = await cussTrack.findOne({ where: { userID: user, guildId } });    //find if user info is already logged in tracker
                if (userRecords) {                                                //if user already exists, just increment counter
                    userRecords.counter += 1;
                    await userRecords.save();
                } else {                                                //if user does not exist, create a new record
                    userRecords = await cussTrack.create({              //with user id, counter, and guild (to make each server unique)
                        userID: user,   
                        counter: 1,     
                        guildId: guildId 
                    });
                }
                interaction.reply(`Refrain from cussing! You have been flagged. Counter: ${userRecords.counter}`);
            }
        } catch (error) {
            console.error('Error checking message for cuss words:', error);
        }
    }
};