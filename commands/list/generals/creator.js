async function run(bot, message, args)
{
    if(conf.channelType === "all" || conf.channelType === message.channel.type)
    {
        command(bot, message, args);
    }
}

function command(bot, message, args)
{
    message.channel.send("```Bot created by Jarzet.```").catch(console.error);
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
    name: `creator`,
    description: help(),
    usage: `creator`
}

module.exports =
{
    run : run,
    conf : conf,
    info : info
}
