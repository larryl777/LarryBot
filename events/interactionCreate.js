const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs')
const path = require('node:path')
const client = new Client({intents: [GatewayIntentBits.Guilds] });

client.commands = getCommands('./commands');       //get the command

module.exports = {                          //create the "message" that the bot will send when user inputs slash command
    name: 'interactionCreate',
    async execute(interaction){
        if(!interaction.isChatInputCommand()){      //if not a valid chat input
            return;
        }
        let command = client.commands.get(interaction.commandName); //get the name of command
        if(!command){
            return;
        }

        try{
            if(interaction.replied){        //bot replying to itself
                return;
            }
            await command.execute(interaction);       //execute interaction/command
        }
        catch(error){
            console.error(error);
        }
    }
}
function getCommands(dir){
    let commands = new Collection();        //create a new collection to store command(s) being used
    const commandFiles = getfiles(dir);     //get files from directory

    for(const cmdfile of commandFiles){
        const command = require(path.resolve(cmdfile));       //load files commandFile array, resolve to remove '.' and '..' 
        commands.set(command.data.name, command);          //add loaded commands into the collection
    }
    return commands;
}

//same method to get files from directory, read deploy-commands.js for details on functions
function getfiles(dir){
    const files = fs.readdirSync(dir,{withFileTypes: true});
    let cmdfiles = [];

    for(const file of files){
        const filepath = `${dir}/${file.name}`;
        if(file.isDirectory()){
            cmdfiles = [...cmdfiles, ...getfiles(filepath)]
        }
        else if(file.name.endsWith(".js")){
            cmdfiles.push(filepath);
        }
    }
    return cmdfiles;
}
