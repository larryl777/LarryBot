const {Client, GatewayIntentBits} = require('discord.js');     
const {token} = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [            //Client is the main class representing the Discord Bot
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ]
});       

const eventpath = path.join(__dirname, 'events');                         //construct a path to the `events` directory
const eventFiles = fs.readdirSync(eventpath).filter(file => file.endsWith('.js'));  //read in .js files from the event directory

for(const file of eventFiles){                      //for each file in the `events` directory...
    const filepath = path.join(eventpath, file);    //load files from the directory, each file should have an
    const event = require(filepath);                //event name and its arguments that will execute when an event is called/triggered

    if (typeof event.execute !== 'function') {                //error handle/log if event file is missing execute function
        console.warn(`Event file ${file} is missing an execute function.`);
        continue;
    }

    if(event.once){                                  //events that will run only once when the bot starts; i.e "ready message" when logging on
        client.once(event.name, (...args) => event.execute(...args, client));
    }
    else{                                            //events that trigger everytime an event is created; i.e ban, kick, creating interaction
        client.on(event.name, (...args) => event.execute(...args, client));
    }

}

//log onto bot
client.login(token);

