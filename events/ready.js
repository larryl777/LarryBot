module.exports = {          //export the file 
    name: 'ready',
    once: true,
    async execute(c){
        console.log(`Logged in as Bot ${c.user.tag}`);      //noti when log onto bot
    }
}