
module.exports = function(guild, bot)
{
    var guild_db = bot.jsonQuery(`guild[identifier=${guild.id}]`, {data: bot.db.guild().getData("/") }).value;

    if(guild_db)
    {
        bot.db.guild().push(`/guild[${guild_db.id}]`, {id: guild_db.id, identifier: guild.id, name: guild.name, added: false});
    }
    else
    {
        bot.db.guild().push(`/guild[]`, {id: bot.db.guild().getData("/").guild.length, identifier: guild.id, name: guild.name, added: false});
    }
}