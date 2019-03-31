

module.exports = function(member, bot)
{
    let message = `Bonjour et bienvenu sur le discord de Fever RP\n` + 
                    `\n` +
                    `Comment rejoindre le serveur ?\n`+
                    `C’est simple !\n`+
                    ` - Être majeur. (+18)\n`+
                    ` - Avoir GTAV installé sur son ordinateur.\n`+
                    ` - Avoir Five M installé sur son ordinateur.\n`+
                    ` - Aller lire les règles sur le site internet. https://www.fever-rp.fr/\n`+
                    ` - Poster ta candidature sur ce même site. \n`+
                    `Tu seras contacté en mp si ta candidature n'est pas retenue, et tu obtiendras le grade candidats dans le cas inverse. Reste attentif au canal général et active les notifications, nous informons via ce biais de l'ouverture des entretiens WL.`;
    
    member.send(message).catch(console.error);
    member.addRole(`492649196759941140`);
    //member.send(``);

    var member_db = bot.jsonQuery(`member[identifier=${member.id}]`, {data: bot.db.member().getData("/") }).value;

    if(!member_db)
        bot.db.member().push(`/member[]`, { id: bot.db.member().getData("/").member.length, 
                                            identifier: member.id, 
                                            username: member.user.username});
    else if(member_db.username != member.user.username)
        bot.db.member().push(`/member[${member.id}]`, { id: member_db.id, 
                                                        identifier: member_db.identifier, 
                                                        username: member.user.username});

    var guild_db = bot.jsonQuery(`guild[identifier=${member.guild.id}]`, {data: bot.db.guild().getData("/") }).value;
    member_db = bot.jsonQuery(`member[identifier=${member.id}]`, {data: bot.db.member().getData("/") }).value;

    if(guild_db && member_db)
    {
        var member_on_guild = bot.jsonQuery(`member_on_guild[id_member=${member_db.id} && id_guild=${guild_db.id}]`, {data: bot.db.member_on_guild().getData("/") }).value;

        if(!member_on_guild)
            bot.db.member_on_guild().push(`/member_on_guild[]`, { id: bot.db.member_on_guild().getData("/").member_on_guild.length,
                                                                    id_member: member_db.id, 
                                                                    id_guild: guild_db.id, 
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