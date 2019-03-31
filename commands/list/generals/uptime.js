//const commandsConfig = require(`../../utils/commands/config.js`);
const prettyMs = require('pretty-ms');

async function run(bot, message, args)
{
    if(conf.channelType === "all" || conf.channelType === message.channel.type)
    {
        command(bot, message, args);
    }
}

async function command(bot, message, args)
{
    //var text = commandsConfig.get_text(help.name, bot, message);
    message.channel.send(`Online since : ${prettyMs(bot.uptime)}`).catch(console.error);
}

function help()
{
    return  "";
}

var conf =
{
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    channelType: `all`
}

var info = 
{
    name: `uptime`,
    description: help(),
    usage: `uptime`
}

module.exports =
{
    run : run,
    conf : conf,
    info : info
}
