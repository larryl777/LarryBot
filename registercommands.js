const fs = require('node:fs');
const { REST } = require('@discordjs/rest')
const { Routes} = require('discord.js');

const{ clientid, token, guildid } = require('./config.json');

function getfiles(dir){                                     //function to get files from a directory
    const files = fs.readdirSync(dir,{withFileTypes: true});        //read contents of directory (commands) synchronously
    let cmdfiles = [];
    
    for(const file of files){                   //for each of the files, if the file is a directory....
        const filepath = `${dir}/${file.name}`;
        if(file.isDirectory()){                                         
            cmdfiles = [...cmdfiles, ...getfiles(filepath)]        //recursive calls to add/load each .js file 
        }                                                                       //in commands folder into cmdfiles array
        else if(file.name.endsWith(".js")){
            cmdfiles.push(filepath);
        }
    }
    return cmdfiles;                    //return the array with all of the .js files from the directory
}

const commandfiles = getfiles('./commands');        //call getfiles to get .js files of the command folder
const commands = commandfiles.map(file => {         //convert .js -> JSON files and load it into commands using map
    const cmd = require(file);
    return cmd.data.toJSON();
    }); 


const rest = new REST({version: '10'}).setToken(token);                 //create rest client to send .put request to discord api

//register inputted commands with discord api
(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientid, guildid),
            { body: commands }
        );
        console.log('Successfully registered guild commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
})();

    //global commands to be use in ANY server
    //make another rest with applicationGUILDcommands for guild-only commands

// "guildid": "193875933654941696" - test server id