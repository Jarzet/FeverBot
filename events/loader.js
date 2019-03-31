const fs = require('fs');

/*function reqEvent(event)
{ 
    return require(`./list/${event}`)
}*/

module.exports = function(bot)
{
    fs.readdir('./events/list/', function(err, files)
    {
        if (err)
        {
            console.error(err);
        }
        
        let jsfiles = files.filter(function(f) 
        {
            return f.split(".").pop() === "js";
        });


        if(jsfiles.length <= 0)
        {
            console.log(`No events to load.`);
        }
        else
        {
            console.log(`Loading a total of ${jsfiles.length} events :`);

            jsfiles.forEach(function(file, i)
            {
                let eventHandler = require(`./list/${file}`);
                let eventName = file.split('.')[0];
                console.log(`- ${i + 1}: Event loaded: ${eventName}`)
                bot.on(eventName, function(...args) { eventHandler(...args, bot) })          
            });
        }
    });

    /*
    bot.on(`channelCreate`,                 function(channel)                 { reqEvent(`channelCreate`)                .event(channel, bot)                });
    bot.on(`channelDelete`,                 function(channel)                 { reqEvent(`channelDelete`)                .event(channel, bot)                });
    bot.on(`channelPinsUpdate`,             function(channel, time)           { reqEvent(`channelPinsUpdate`)            .event(channel, time, bot)          });
    bot.on(`channelUpdate`,                 function(oldChannel, newChannel)  { reqEvent(`channelUpdate`)                .event(oldChannel, newChannel, bot) });
    bot.on(`clientUserGuildSettingsUpdate`, function(clientUserGuildSettings) { reqEvent(`clientUserGuildSettingsUpdate`).event(clientUserGuildSettings, bot)});
    bot.on(`clientUserSettingsUpdate`,      function(clientUserSettings)      { reqEvent(`clientUserSettingsUpdate`)     .event(clientUserSettings, bot)     });
    bot.on(`debug`,                         function(info)                    { reqEvent(`debug`)                        .event(info, bot)                   });
    bot.on(`disconnect`,                    function(event)                   { reqEvent(`disconnect`)                   .event(event, bot)                  });
    bot.on(`emojiCreate`,                   function(emoji)                   { reqEvent(`emojiCreate`)                  .event(emoji, bot)                  });
    bot.on(`emojiDelete`,                   function(emoji)                   { reqEvent(`emojiDelete`)                  .event(emoji, bot)                  });
    bot.on(`emojiUpdate`,                   function(oldEmoji, newEmoji)      { reqEvent(`emojiUpdate`)                  .event(oldEmoji, newEmoji, bot)     });
    bot.on(`error`,                         function(error)                   { reqEvent(`error`)                        .event(error, bot)                  });
    bot.on(`guildBanAdd`,                   function(guild, user)             { reqEvent(`guildBanAdd`)                  .event(guild, user, bot)            });
    bot.on(`guildBanRemove`,                function(guild, user)             { reqEvent(`guildBanRemove`)               .event(guild, user, bot)            });
    bot.on(`guildCreate`,                   function(guild)                   { reqEvent(`guildCreate`)                  .event(guild, bot)                  });
    bot.on(`guildDelete`,                   function(guild)                   { reqEvent(`guildDelete`)                  .event(guild, bot)                  });
    bot.on(`guildMemberAdd`,                function(member)                  { reqEvent(`guildMemberAdd`)               .event(member, bot)                 });
    bot.on(`guildMemberAvailable`,          function(member)                  { reqEvent(`guildMemberAvailable`)         .event(member, bot)                 });
    bot.on(`guildMemberRemove`,             function(member)                  { reqEvent(`guildMemberRemove`)            .event(member, bot)                 });
    bot.on(`guildMembersChunk`,             function(member)                  { reqEvent(`guildMembersChunk`)            .event(member, bot)                 });
    bot.on(`guildMemberSpeaking`,           function(member, speaking)        { reqEvent(`guildMemberSpeaking`)          .event(member, speaking, bot)       });
    bot.on(`guildMemberUpdate`,             function(oldMember, newMember)    { reqEvent(`guildMemberUpdate`)            .event(oldMember, newMember, bot)   });
    bot.on(`guildUnavailable`,              function(guild)                   { reqEvent(`guildUnavailable`)             .event(guild, bot)                  });
    bot.on(`guildUpdate`,                   function(oldGuild, newGuild)      { reqEvent(`guildUpdate`)                  .event(oldGuild, newGuild, bot)     });
    bot.on(`message`,                       function(message)                 { reqEvent(`message`)                      .event(message, bot)                });
    bot.on(`messageDelete`,                 function(message)                 { reqEvent(`messageDelete`)                .event(message, bot)                });
    bot.on(`messageDeleteBulk`,             function(message)                 { reqEvent(`messageDeleteBulk`)            .event(message, bot)                });
    bot.on(`messageReactionAdd`,            function(messageReaction, user)   { reqEvent(`messageReactionAdd`)           .event(messageReaction, user, bot)  });
    bot.on(`messageReactionRemove`,         function(messageReaction, user)   { reqEvent(`messageReactionRemove`)        .event(messageReaction, user, bot)  });
    bot.on(`messageReactionRemoveAll`,      function(messageReaction)         { reqEvent(`messageReactionRemoveAll`)     .event(messageReaction, bot)        });
    bot.on(`messageUpdate`,                 function(oldMessage, newMessage)  { reqEvent(`messageUpdate`)                .event(oldMessage, newMessage, bot) });
    bot.on(`presenceUpdate`,                function(oldMember, newMember)    { reqEvent(`presenceUpdate`)               .event(oldMember, newMember, bot)   });
    bot.on(`rateLimit`,                     function(rateLimitInfo)           { reqEvent(`rateLimit`)                    .event(rateLimitInfo, bot)          });
    bot.on(`raw`,                           function(event)                   { reqEvent(`raw`)                          .event(event, bot)                  });
    bot.on(`ready`,                         function()                        { reqEvent(`ready`)                        .event(bot, bot)                    });
    bot.on(`reconnecting`,                  function()                        { reqEvent(`reconnecting`)                 .event(bot, bot)                    });
    bot.on(`resume`,                        function(replayed)                { reqEvent(`resume`)                       .event(replayed, bot)               });
    bot.on(`roleCreate`,                    function(role)                    { reqEvent(`roleCreate`)                   .event(role, bot)                   });
    bot.on(`roleDelete`,                    function(role)                    { reqEvent(`roleDelete`)                   .event(role, bot)                   });
    bot.on(`roleUpdate`,                    function(oldRole, newRole)        { reqEvent(`roleUpdate`)                   .event(oldRole, newRole, bot)       });
    bot.on(`typingStart`,                   function(channel, user)           { reqEvent(`typingStart`)                  .event(channel, user, bot)          });
    bot.on(`typingStop`,                    function(channel, user)           { reqEvent(`typingStop`)                   .event(channel, user, bot)          });
    bot.on(`userNoteUpdate`,                function(user, oldNote, newNote)  { reqEvent(`userNoteUpdate`)               .event(user, oldNote, newNote, bot) });
    bot.on(`userUpdate`,                    function(oldUser, newUser)        { reqEvent(`userUpdate`)                   .event(oldUser, newUser, bot)       });
    bot.on(`voiceStateUpdate`,              function(oldMember, newMember)    { reqEvent(`voiceStateUpdate`)             .event(oldMember, newMember, bot)   });
    bot.on(`warn`,                          function(info)                    { reqEvent(`warn`)                         .event(info, bot)                   });*/
}