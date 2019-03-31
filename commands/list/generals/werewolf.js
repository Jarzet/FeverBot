async function run(bot, message, args)
{
    if(conf.channelType === "all" || conf.channelType === message.channel.type)
    {
        command(bot, message, args);
    }
}

function command(bot, message, args)
{
    if(args.length > 0)
    {
        switch(args[0])
        {
            case 'create' :
                werewolfCreate(bot, message, args)
                break;
            case 'delete' :
                werewolfDelete(bot, message, args)
                break;
            case 'modify' :
                werewolfModify(bot, message, args)
                break;
            default :
                message.channel.send(help()).catch(console.error);
                break;
        }
    }
    else
        message.channel.send(help()).catch(console.error);
}

function help()
{
    return  "```.```";
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
    name: `werewolf`,
    description: help(),
    usage: `werewolf`
}

module.exports =
{
    run : run,
    conf : conf,
    info : info
}

function werewolfCreate(bot, message, args)
{
    if(args.length == 1)
    {
        
    }
    else if(args.length > 1)
        message.channel.send(help()).catch(console.error);
    else
        message.channel.send(help()).catch(console.error);
}