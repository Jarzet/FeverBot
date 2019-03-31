//const logs = require(`../utils/logs.js`);

module.exports = function(oldMember, newMember, bot)
{
    lastActivityTimestampUpdate(newMember, bot);
    /*let guild = newMember.guild;
    let channelOld = guild.channels.get(oldMember.voiceChannelID);
    let channelCurrent = guild.channels.get(newMember.voiceChannelID);
    let channelPerso = guild.channels.find(`name`, newMember.user.username);
    let channelCustom = guild.channels.find(`name`, Config.channelCustom);

    if(!oldMember.voiceChannelID && newMember.voiceChannelID) 
    {
        let message = `[${newMember.user.username}] voice connected : ${channelCurrent.name}`;
        logs.logsAction(guild, message);
    }

    if(oldMember.voiceChannelID && newMember.voiceChannelID)
    {
        let message = `[${oldMember.user.username}] voice switched : ${channelOld.name} -> ${channelCurrent.name}`;
        logs.logsAction(guild, message);
    }

    if(oldMember.voiceChannelID && !newMember.voiceChannelID)
    {
        let message = `[${oldMember.user.username}] voice disconnected : ${channelOld.name}`;
        logs.logsAction(guild, message);
    }

    if (oldMember.voiceChannelID === newMember.voiceChannelID) return;

    if(channelCustom && channelCurrent)
    {
        if (channelCustom.id === channelCurrent.id)
        {
            let name = `${newMember.user.username}`;
            let channelNew = guild.channels.find(`name`, name);
            if(!channelNew)
            {
                guild.createChannel(name, `voice`)
                        .then(channel => 
                        {
                            newMember.setVoiceChannel(channel);
                        })
                        .catch(console.error);
            }
            else
            {
                newMember.setVoiceChannel(channelNew);
            }
        }  
    }

    if(channelOld && channelPerso)
    {
        if(channelCurrent && channelCustom) if(channelCurrent.id === channelCustom.id) return;

        if (channelPerso.id === channelOld.id)
        {
            channelPerso.delete();
        } 
    }*/
}

function lastActivityTimestampUpdate(member, bot)
{
    if(member.guild)
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
                                                                                            on: true});
        }
    }
}