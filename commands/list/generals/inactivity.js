async function run(bot, message, args)
{
    if(conf.channelType === "all" || conf.channelType === message.channel.type)
    {
        command(bot, message, args);
    }
}

function command(bot, message, args)
{
    var msg= "";
    
    if(args.length > 0)
    {
        var memberSearch = null;
        let name = "";
        if(message.mentions.members.array().length == 0)
        {
            for(var i = 0 ; i < args.length ; i++ )
            {
                name += (i != (args.length-1)) ? `${args[i]} ` : args[i];
            }
            memberSearch = message.guild.members.find(x => x.user.username == name);
        }
        else if(message.mentions.members.array().length == 1 && args.length == 1)
            memberSearch = message.mentions.members.array()[0];

        if(memberSearch)
        {
            var guild = bot.jsonQuery(`guild[identifier=${message.guild.id}]`, {data: bot.db.guild().getData("/") }).value;
            var member = bot.jsonQuery(`member[identifier=${memberSearch.id}]`, {data: bot.db.member().getData("/") }).value;

            if(guild && member)
            {
                var member_on_guild = bot.jsonQuery(`member_on_guild[id_member=${member.id} && id_guild=${guild.id}]`, {data: bot.db.member_on_guild().getData("/") }).value;
                if(member_on_guild)
                {
                    /*var current = bot.moment(Date.now());
                    var previous = bot.moment(member_on_guild.lastActivityTimestamp);
                    var duration = bot.moment.duration(current.diff(previous))

                    msg += (duration._data.years == 0) ? "": ((duration._data.years == 1) ? `${duration._data.years } year ` : `${duration._data.years } years `);
                    msg += (duration._data.months == 0) ? "": ((duration._data.months == 1) ? `${duration._data.months } month ` : `${duration._data.months } months `);
                    msg += (duration._data.days == 0) ? "": ((duration._data.days == 1) ? `${duration._data.days } day ` : `${duration._data.days } days `);
                    msg += (duration._data.hours == 0) ? "": ((duration._data.hours == 1) ? `${duration._data.hours } hour ` : `${duration._data.hours } hours `);
                    msg += (duration._data.minutes == 0) ? "": ((duration._data.minutes == 1) ? `${duration._data.minutes } minute ` : `${duration._data.minutes } minutes `);
                    msg += (duration._data.seconds == 0) ? "": ((duration._data.seconds == 1) ? `${duration._data.seconds } second ` : `${duration._data.seconds } seconds `);*/

                    msg = bot.utils.duration.toString(member_on_guild.lastActivityTimestamp);
                }
                else
                    msg = "```Member" + ` "${name}" `+  "inactivity is not found.```";
            }
            else   
                msg = "```Member" + ` "${name}" `+  "inactivity is not found.```";
        }
        else if(message.mentions.members.array().length == 1 && args.length > 1)
            msg = "```Please, only specify the tag.```";
        else
            msg = "```Member" + ` "${name}" `+  "does not exist.```";
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
    channelType: `text`
}

var info = 
{
    name: `inactivity`,
    description: help(),
    usage: `inactivity`
}

module.exports =
{
    run : run,
    conf : conf,
    info : info
}
