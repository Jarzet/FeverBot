//const logs = require(`../utils/logs.js`);
//const commandsConfig = require(`../../commands/config.js/index.js`);

module.exports = function(bot)
{
    checkGuildsAdd(bot);
    checkGuildsRemove(bot);
    checkMembers(bot);
    checkMembersOnGuildsAdd(bot);
    checkMembersOnGuildsRemove(bot);
    
    setInterval(function()
    {
        checkGuildsAdd(bot);
        checkGuildsRemove(bot);
        checkMembers(bot);
        checkMembersOnGuildsAdd(bot);
        checkMembersOnGuildsRemove(bot);
    }, 
    600000);

    checkInactivity(bot);
    setInterval(function()
    {
        checkInactivity(bot);
    }, 
    3600000);

    global.isServerOfflineSended = false;
    
    //bot.utils.verifyAutoRole(bot);
    bot.utils.showPlayersCount(bot);
    //require('../utils/list/isServerAlive')(bot);
    setInterval(function()
    {
        bot.utils.showPlayersCount(bot);
        //require('../utils/list/isServerAlive')(bot);
    }, 
    60000);
    
    //logs.logsBotInfo(`${Config.name} -> Online`);

    console.log("Bot Ready.")
}

function checkGuildsAdd(bot)
{
    for (var i = 0 ; i < bot.guilds.array().length; i++) 
    {
        var guild_db = bot.jsonQuery(`guild[identifier=${bot.guilds.array()[i].id}]`, {data: bot.db.guild().getData("/") }).value;

        if(!guild_db)
            bot.db.guild().push(`/guild[]`, { id: bot.db.guild().getData("/").guild.length, 
                                                identifier: bot.guilds.array()[i].id, 
                                                name: bot.guilds.array()[i].name, 
                                                added: true});
        else if(!guild_db.added || guild_db.name != bot.guilds.array()[i].name)
            bot.db.guild().push(`/guild[${guild_db.id}]`, { id: guild_db.id, 
                                                            identifier: guild_db.identifier, 
                                                            name: bot.guilds.array()[i].name, 
                                                            added: true});
    }
}


function checkGuildsRemove(bot)
{
    var guilds_db = bot.jsonQuery(`guild[**]`, {data: bot.db.guild().getData("/") }).value;

    for (var i = 1 ; i < guilds_db.length; i++) 
    {
        var guild_bot = bot.guilds.array().filter(function(value) { return (value.id == guilds_db[i].identifier) } );

        if(guild_bot.length == 0)
        {
            bot.db.guild().push(`/guild[${guilds_db[i].id}]`, { id: guilds_db[i].id, 
                                                                identifier: guilds_db[i].identifier, 
                                                                name: guilds_db[i].name, 
                                                                added: false});
        }
    }
}


function checkMembers(bot)
{
    for (var i = 0 ; i < bot.guilds.array().length; i++) 
    {
        for (var j = 0 ; j < bot.guilds.array()[i].members.array().length; j++)
        {
            var member = bot.jsonQuery(`member[identifier=${bot.guilds.array()[i].members.array()[j].id}]`, {data: bot.db.member().getData("/") }).value;

            if(!member)
                bot.db.member().push(`/member[]`, { id: bot.db.member().getData("/").member.length, 
                                                    identifier: bot.guilds.array()[i].members.array()[j].id, 
                                                    username: bot.guilds.array()[i].members.array()[j].user.username});
            else if(member.username != bot.guilds.array()[i].members.array()[j].user.username)
                bot.db.member().push(`/member[${member.id}]`, { id: member.id, 
                                                                identifier: member.identifier, 
                                                                username: bot.guilds.array()[i].members.array()[j].user.username});
        }
    }
}

function checkMembersOnGuildsAdd(bot)
{
    for (var i = 0 ; i < bot.guilds.array().length; i++) 
    {
        for (var j = 0 ; j < bot.guilds.array()[i].members.array().length; j++)
        {
            var guild = bot.jsonQuery(`guild[identifier=${bot.guilds.array()[i].id}]`, {data: bot.db.guild().getData("/") }).value;
            var member = bot.jsonQuery(`member[identifier=${bot.guilds.array()[i].members.array()[j].id}]`, {data: bot.db.member().getData("/") }).value;

            if(guild && member)
            {
                var member_on_guild = bot.jsonQuery(`member_on_guild[id_member=${member.id} && id_guild=${guild.id}]`, {data: bot.db.member_on_guild().getData("/") }).value;

                if(!member_on_guild)
                    bot.db.member_on_guild().push(`/member_on_guild[]`, {   id: bot.db.member_on_guild().getData("/").member_on_guild.length,
                                                                            id_member: member.id, 
                                                                            id_guild: guild.id, 
                                                                            lastActivityTimestamp: Date.now(), 
                                                                            on: true});
                else if(!member_on_guild.on)
                    bot.db.member_on_guild().push(`/member_on_guild[${member_on_guild.id}]`, {  id: member_on_guild.id,
                                                                                                id_member: member_on_guild.id_member, 
                                                                                                id_guild: member_on_guild.id_guild, 
                                                                                                lastActivityTimestamp: member_on_guild.lastActivityTimestamp, 
                                                                                                on: true});
            }
        }
    }    
}

function checkMembersOnGuildsRemove(bot)
{
    var members_on_guilds = bot.jsonQuery(`member_on_guild[**]`, {data: bot.db.member_on_guild().getData("/") }).value;

    for (var i = 1 ; i < members_on_guilds.length; i++) 
    {
        var guild_db = bot.jsonQuery(`guild[identifier=${members_on_guilds[i].id_guild}]`, {data: bot.db.guild().getData("/") }).value;
        var member = bot.jsonQuery(`member[identifier=${members_on_guilds[i].id_member}]`, {data: bot.db.member().getData("/") }).value;

        if(guild_db && member)
        {
            var guild_bot = bot.guilds.array().filter(function(value) { return value.id == guild_db.identifier } )
            if(guild_bot.length == 1)
            {
                guild_bot = guild_bot[0];
                var member_bot = guild_bot.members.array().filter(function(value) { return value.id == member.identifier } )

                if(member_bot.length == 0)
                {
                    bot.db.member_on_guild().push(`/member_on_guild[${members_on_guilds[i].id}]`, { id: members_on_guilds[i].id,
                                                                                                    id_member: members_on_guilds[i].id_member, 
                                                                                                    id_guild: members_on_guilds[i].id_guild, 
                                                                                                    lastActivityTimestamp: members_on_guilds[i].lastActivityTimestamp, 
                                                                                                    on: false});
                }
            }
        }
    }
}

function checkInactivity(bot)
{
    for (var i = 0 ; i < bot.guilds.array().length; i++) 
    {
        for (var j = 0 ; j < bot.guilds.array()[i].members.array().length; j++)
        {
            var guild = bot.jsonQuery(`guild[identifier=${bot.guilds.array()[i].id}]`, {data: bot.db.guild().getData("/") }).value;
            var member = bot.jsonQuery(`member[identifier=${bot.guilds.array()[i].members.array()[j].id}]`, {data: bot.db.member().getData("/") }).value;

            if(guild && member)
            {
                var member_on_guild = bot.jsonQuery(`member_on_guild[id_member=${member.id} && id_guild=${guild.id}]`, {data: bot.db.member_on_guild().getData("/") }).value;
                if(member_on_guild)
                {
                    if((bot.guilds.array()[i].members.array()[j].roles.find(x => x.name === "Touriste") || bot.guilds.array()[i].members.array()[j].roles.array().length == 0) 
                        && bot.guilds.array()[i].members.array()[j].kickable)
                    {
                        var current = bot.moment(Date.now());
                        var previous = bot.moment(member_on_guild.lastActivityTimestamp);
                        var duration = bot.moment.duration(current.diff(previous))

                        var max = 30

                        if(duration._data.days >= max)
                        {
                            member.kick().catch(console.error);
                        }
                        else if(duration._data.days == (max-1) && duration._data.hours == 0)
                        {
                            member.send(`You've been inactive for ${(max-1)} days, you're going to be kicking in 1 day`).catch(console.error);
                        }
                        else if(duration._data.days == (max-2) && duration._data.hours == 0)
                        {
                            member.send(`You've been inactive for ${(max-2)} days, you're going to be kicking in 2 day`).catch(console.error);
                        }
                        else if(duration._data.days == (max-7) && duration._data.hours == 0)
                        {
                            member.send(`You've been inactive for ${(max-7)} days, you're going to be kicking in 7 day`).catch(console.error);
                        }
                    }
                }
            }
        }
    }    
}