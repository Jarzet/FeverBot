

module.exports = function(event, bot)
{
    switch(event.t)
    {
        case "MESSAGE_REACTION_ADD":
            MESSAGE_REACTION_ADD(event, bot);
            break;
        default:
            break;
    }

}

function MESSAGE_REACTION_ADD(event, bot)
{
    twitter(event, bot)
}

function twitter(event, bot)
{
    let guild = bot.guilds.get(event.d.guild_id);
    let channel = guild.channels.get(event.d.channel_id);
    let user = guild.members.get(event.d.user_id);
    
    if(guild && channel && user)
    {
        if(channel.name == "twitter" && (event.d.emoji.name != "❤" && event.d.emoji.name != "🔁"))
        {
            channel.fetchMessage(event.d.message_id)
                .then(message =>
                    {
                        message.reactions.find(x => x._emoji.name === event.d.emoji.name).remove(user);
                    })
                .catch(console.error);
        }   
    }

    
}