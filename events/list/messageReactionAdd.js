

module.exports = function(messageReaction, user, bot)
{
    twitter(messageReaction, user);
}

function twitter(messageReaction, user)
{
    if(messageReaction.message.channel.name == "twitter" && (messageReaction.emoji.name != "❤" && messageReaction.emoji.name != "🔁"))
    {
        messageReaction.remove(user);
    }
}