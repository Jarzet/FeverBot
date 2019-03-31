//const logs = require(`../utils/logs.js`);

module.exports = function(message, bot)
{    
    if(message.author.bot) return;
    if(message.channel.type === "text" || message.channel.type === "dm" || message.channel.type === "group") 
    {
        verifyMessage(message, bot);
        lastActivityTimestampUpdate(message, bot);
    }
    else
    {
        return;
    }
}

function verifyMessage(message, bot)
{
    /*
    if(/(?:https?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content))
    {
        message.delete();
        return;
    }
    */

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(command.startsWith(bot.conf().getData("/prefix"))) 
    {
        /*
        let limit = bot.ratelimits.get(message.author.id);
        let now = Date.now();
        let timeLimit = 2000;

        if(limit != null)
        {
            if(limit >= now - timeLimit)
            {
                message.delete();
                message.channel.send(`You are being ratelimited. Try again in '${(Math.abs((now - limit) - timeLimit) / 1000).toFixed(2)}' seconds`).then(function(m) { m.delete(2000) });
                return;
            }
            else
            {
                bot.ratelimits.set(message.author.id, now);
            }
        }
        else
        {
            bot.ratelimits.set(message.author.id, now);
        }
        */
        let cmd = command.slice(bot.conf().getData("/prefix").length);
        let hasCmd = bot.commands.get(cmd);
        
        if(hasCmd)
        { 
            hasCmd.run(bot, message, args);
        }
        else
        {   
            if(message.guild)
            {
                var guild_db = bot.jsonQuery(`guild[identifier=${message.guild.id}]`, {data: bot.db.guild().getData("/") }).value;

                if(guild_db)
                {
                    var custom_command = bot.jsonQuery(`custom_command[id_guild=${guild_db.id} & name=${cmd}]`, {data: bot.db.custom_command().getData("/") }).value;
                    if(custom_command)
                        message.channel.send(custom_command.message);
                    else
                        message.channel.send("```Command" + ` "${cmd}" `+  "does not exist.```");
                }
            }
        }
    }
    else
    { 
        if(command == "?test") { test(message, bot)}
        twitter(message, bot);
        /*if(message.isMentioned(bot.user))
        {
            let cmd = commandChannelType.get("aide");
            cmd.aide(message, []);
        }
        return;*/
    }
}

function useCommand()
{
    
}

function twitter(message, bot)
{
    if(message.guild)
    {
        var twitter_channel = message.guild.channels.find(x => x.name === "fever");

        if(twitter_channel)
        {
            if(message.channel.id == twitter_channel.id)
            {
                message.react("❤")
                .then(() => message.react('🔁'))
                .catch(() => console.error('One of the emojis failed to react.'));;
            }
            
        }
    }
}

function test(message, bot)
{
    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    for(var i = 0 ; i < message.mentions.members.array().length ; i++)
    {
        console.log(message.mentions.members.array()[i].id)
    }
}

function lastActivityTimestampUpdate(message, bot)
{
    if(message.guild)
    {
        var guild_db = bot.jsonQuery(`guild[identifier=${message.guild.id}]`, {data: bot.db.guild().getData("/") }).value;
        var member_db = bot.jsonQuery(`member[identifier=${message.author.id}]`, {data: bot.db.member().getData("/") }).value;

        if(guild_db && member_db)
        {
            var member_on_guild = bot.jsonQuery(`member_on_guild[id_member=${member_db.id} && id_guild=${guild_db.id}]`, {data: bot.db.member_on_guild().getData("/") }).value;

            if(member_on_guild)
                bot.db.member_on_guild().push(`/member_on_guild[${member_on_guild.id}]`, {  id: member_on_guild.id,
                                                                                            id_member: member_on_guild.id_member, 
                                                                                            id_guild: member_on_guild.id_guild, 
                                                                                            lastActivityTimestamp: Date.now(), 
                                                                                            on: true});
        }
    }
}