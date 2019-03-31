const Discord = require('discord.js');
var JsonDB = require('node-json-db');

const bot = new Discord.Client();

bot.jsonQuery = require('json-query');
bot.moment = require('moment');

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.ratelimits = new Discord.Collection();

bot.conf = function() { return new JsonDB("config.json", true, true); }
bot.db = 
{
    guild:           function() { return new JsonDB("./data/database/guild.json",           true, true); },
    custom_command:  function() { return new JsonDB("./data/database/custom_command.json",  true, true); },
    member:          function() { return new JsonDB("./data/database/member.json",          true, true); },
    member_on_guild: function() { return new JsonDB("./data/database/member_on_guild.json", true, true); }
}
bot.utils = 
{
    duration: require('./utils/list/duration.js'),
    isServerAlive: require('./utils/list/isServerAlive.js'),
    showPlayersCount: require('./utils/list/showPlayersCount.js'),
    verifyAutoRole: require('./utils/list/verifyAutoRole.js')
}

bot.login(bot.conf().getData("/token"));

console.log("**************************************************")
var date = new Date();
console.log(    `${(date.getDate() < 10) ? "0"+date.getDate() : date.getDate()}/`+
                `${((date.getMonth()+1) < 10) ? "0"+(date.getMonth()+1) : (date.getMonth()+1)}/`+
                `${date.getFullYear()} `+
                `${(date.getHours() < 10) ? "0"+date.getHours() : date.getHours()}:`+
                `${(date.getMinutes() < 10) ? "0"+date.getMinutes() : date.getMinutes()}:`+
                `${(date.getSeconds() < 10) ? "0"+date.getSeconds() : date.getSeconds()}`)

require('./events/loader.js')(bot);
require('./commands/loader.js')(bot);