async function run(bot, message, args)
{
    if(conf.channelType === "all" || conf.channelType === message.channel.type)
    {
        command(bot, message, args);
    }
}

function command(bot, message, args)
{
    var msg = "";
    if(args.length > 0)
    {
        switch(args[0])
        {
            case 'contactStaff' :
                msg = getHelp("contactStaff");
                break;
            case 'reboot' :
                msg = getHelp("reboot");
                break;
            default :
                msg = help();
                break;
        }
    }
    else
    {
        msg = help();
    }
    message.channel.send(msg).catch(console.error);
}

function help()
{
    return  "```!aide [commande]\n - contactStaff\n - reboot```";
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
    name: `aide`,
    description: help(),
    usage: `aide`
}

module.exports =
{
    run : run,
    conf : conf,
    info : info
}

function getHelp(command)
{
    return require(`../${command}`).help.description;
}