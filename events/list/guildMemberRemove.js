

module.exports = function(member, bot)
{
    var guild_db = bot.jsonQuery(`guild[identifier=${member.guild.id}]`, {data: bot.db.guild().getData("/") }).value;
    var member_db = bot.jsonQuery(`member[identifier=${member.id}]`, {data: bot.db.member().getData("/") }).value;

    if(guild_db && member_db)
    {
        var member_on_guild = bot.jsonQuery(`member_on_guild[id_member=${member_db.id} && id_guild=${guild_db.id}]`, {data: bot.db.member_on_guild().getData("/") }).value;

        if(member_on_guild)
            bot.db.member_on_guild().push(`/member_on_guild[${member_on_guild.id}]`, {  id: member_on_guild.id,
                                                                                        id_member: member_on_guild.id_member, 
                                                                                        id_guild: member_on_guild.id_guild, 
                                                                                        lastActivityTimestamp: Date.now(), 
                                                                                        on: false});
    }
}