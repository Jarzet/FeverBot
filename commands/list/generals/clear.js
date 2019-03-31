async function run(bot, message, args)
{
    if(conf.channelType === "all" || conf.channelType === message.channel.type)
    {
        command(bot, message, args);
    }
}

async function command(bot, message, args)
{
    if(!message.guild) return;
    if(!message.guild.members.get(message.author.id).hasPermission("ADMINISTRATOR") && message.author.id != "159729640317911041") return;

    if(args.length == 1)
    {
        if(!isNaN(args[0]))
        {
            if(args[0] > 100)
                message.channel.send("```Number of deleted messages cannot exceed 100.```").catch(console.error);
            else
            {
                message.channel.fetchMessages({limit : (Number(args[0])+1)})
                    .then(async function(list)
                    {
                        message.channel.bulkDelete(list);
                        var msg = await message.channel.send("```" + `${list.size} ` +  "message(s) have been deleted. (Deleted in 5 seconds)```").catch(console.error);
                        setTimeout(function() 
                        {
                            msg.delete();
                        }, 5000);
                    }).catch(console.error);
            }
        }
        else
            message.channel.send("```Parameter requires to be a number.```").catch(console.error);
    }
    else if(args.length > 1)
        message.channel.send("```Command only requires the number of messages to be deleted.```").catch(console.error);
    else
        message.channel.send("```Command requires the number of messages to be deleted.```").catch(console.error);
    
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
    name: `clear`,
    description: help(),
    usage: `clear`
}

module.exports =
{
    run : run,
    conf : conf,
    info : info
}