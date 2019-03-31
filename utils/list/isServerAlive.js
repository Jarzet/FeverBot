const ping = require('node-http-ping')

module.exports = function(bot)
{
    ping(`${bot.conf().getData("/ip")}`, 80 /* optional */)
        .then(() => choice(bot, true))
        .catch(() => choice(bot, false))
}

function choice(bot, isAlive)
{
    if(isAlive && global.isServerOfflineSended)
    {
        global.isServerOfflineSended = false;
    }
    else if(!isAlive && !global.isServerOfflineSended)
    {
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();

        if(!((hour == 3 || hour == 13 || hour == 17) && minute == 59) && !((hour == 4 || hour == 14 || hour == 18) && minute <= 5))
        {
            sendAlert(bot);
            global.isServerOfflineSended = true;
        }
    }
}

function sendAlert(bot)
{
    let guild = bot.guilds.get("419995379786842112");
    let user = guild.members.get("179695522435694592");
    let channel = guild.channels.find(x => x.name === "🌡message-bot");
    let message = `Attention !\nLe serveur vient de passer hors-ligne en dehors des plages de reboot.`;

    channel.send(message).catch(console.error);
    user.send(message).catch(console.error);
}