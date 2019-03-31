async function run(bot, message, args)
{
    if(conf.channelType === "all" || conf.channelType === message.channel.type)
    {
        command(bot, message, args);
    }
}

async function command(bot, message, args)
{
    let msg = await message.channel.send("Wait for ping...").catch(console.error);

    await message.channel.send(`Pong ! \`| ${Date.now() - message.createdTimestamp} ms |\``).catch(console.error);

    msg.delete();
}

function help()
{
    return  "Ping/Pong command.";
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
    name: `ping`,
    description: help(),
    usage: `ping`
}

module.exports =
{
    run : run,
    conf : conf,
    info : info
}

