async function run(bot, message, args)
{
    if(conf.channelType === "all" || conf.channelType === message.channel.type)
    {
        command(bot, message, args);
    }
}

function command(bot, message, args)
{
    if(args.length > 0)
    {
        switch(args[0])
        {
            case 'create' :
                commandCreate(bot, message, args)
                break;
            case 'delete' :
                commandDelete(bot, message, args)
                break;
            case 'modify' :
                    commandModify(bot, message, args)
                break;
            case 'list' :
                    commandList(bot, message, args)
                break;
            default :
                message.channel.send(help()).catch(console.error);
                break;
        }
    }
    else
    {
        message.channel.send(help()).catch(console.error);
    }
}

function help()
{
    return  "```!aide [commande]\n - contactStaff\n - reboot```";
}

var conf =
{
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    channelType: `text`
}

var info = 
{
    name: `command`,
    description: help(),
    usage: `command`
}

module.exports =
{
    run : run,
    conf : conf,
    info : info
}

function commandCreate(bot, message, args)
{
    if(!message.guild) return;
    if(!message.guild.members.get(message.author.id).hasPermission("ADMINISTRATOR") && message.author.id != "159729640317911041") return;
    if(args.length > 2)
    {
        var guild = bot.jsonQuery(`guild[identifier=${message.guild.id}]`, {data: bot.db.guild().getData("/") }).value;
        var command = bot.jsonQuery(`custom_command[id_guild=${guild.id} && name=${args[1]}]`, {data: bot.db.custom_command().getData("/") }).value;
        
        if(command)
        {
            message.channel.send("```Command" + ` "${args[1]}" `+  "already exist.```").catch(console.error);
        }
        else
        {
            let msg = "";

            for(var i = 2 ; i < args.length ; i++ )
            {
                msg += (args[i] == `\\n`) ? `\n` : ((i != (args.length-1)) ? `${args[i]} ` : args[i]);
            }

            var id = null;
            var commands = bot.jsonQuery(`custom_command[**]`, {data: bot.db.custom_command().getData("/") }).value;

            for(var i = 1 ; i < commands.length ; i++)
            {
                if(commands[i].id_guild == 0)
                {
                    id = commands[i].id;
                    break;
                }
            }

            if(id)
                bot.db.custom_command().push(`/custom_command[${id}]`, {id: id, id_guild: guild.id, name: args[1], message: msg});
            else
                bot.db.custom_command().push(`/custom_command[]`, {id: bot.db.custom_command().getData("/").custom_command.length, id_guild: guild.id, name: args[1], message: msg});
            
            message.channel.send("```Command" + ` "${args[1]}" `+  "has been created.```").catch(console.error);
        }
    }
    else if(args.length == 2)
        message.channel.send("```Command content needs to be specified.```").catch(console.error);
    else
        message.channel.send("```Command name needs to be specified.```").catch(console.error);


    
}

function commandDelete(bot, message, args)
{
    if(!message.guild) return;
    if(!message.guild.members.get(message.author.id).hasPermission("ADMINISTRATOR") && message.author.id != "159729640317911041") return;
    if(args.length == 2)
    {
        var guild = bot.jsonQuery(`guild[identifier=${message.guild.id}]`, {data: bot.db.guild().getData("/") }).value;
        var command = bot.jsonQuery(`custom_command[id_guild=${guild.id} && name=${args[1]}]`, {data: bot.db.custom_command().getData("/") }).value;
        if(command)
        {
            bot.db.custom_command().push(`/custom_command[${command.id}]`, {id: command.id, id_guild: 0, name: null, message: null});
            message.channel.send("```Command" + ` "${args[1]}" `+  "has been deleted.```").catch(console.error);
        }
        else
        {
            message.channel.send("```Command" + ` "${args[1]}" `+  "does not exist.```").catch(console.error);
        }
    }
    else if(args.length > 2)
        message.channel.send("```Command name cannot have a space.```").catch(console.error);
    else
        message.channel.send("```Command name needs to be specified.```").catch(console.error);
}

function commandModify(bot, message, args)
{
    if(!message.guild) return;
    if(!message.guild.members.get(message.author.id).hasPermission("ADMINISTRATOR") && message.author.id != "159729640317911041") return;
    if(args.length > 2)
    {
        var guild = bot.jsonQuery(`guild[identifier=${message.guild.id}]`, {data: bot.db.guild().getData("/") }).value;
        var command = bot.jsonQuery(`custom_command[id_guild=${guild.id} && name=${args[2]}]`, {data: bot.db.custom_command().getData("/") }).value;
        if(command)
        {
            //command modify name test test
            switch(args[1])
            {
                case 'name' :
                    commandModifyName(bot, message, args)
                    break;
                case 'content' :
                    commandModifyContent(bot, message, args)
                    break;
                default :
                    message.channel.send(help());
                    break;
            }
        }
        else
        {
            message.channel.send("```Command" + ` "${command}" `+  "does not exist.```").catch(console.error);
        }
    }
    else if(args.length == 2)
        message.channel.send("```Command name needs to be specified.```").catch(console.error);
    else
        message.channel.send("```Command parameter needs to be specified. ('name' or 'content')```").catch(console.error); //name or content
}

function commandModifyName(bot, message, args)
{
    if(args.length == 4)
    {
        bot.db.custom_command().push(`/custom_command[${command.id}]`, {id: command.id, id_guild: guild.id, name: args[3], message: command.message});
        message.channel.send("```Command" + ` "${args[2]}" -> "${args[3]}" `+  "has been modified.```").catch(console.error);
    }
    else  if(args.length == 3)
        message.channel.send("```Command new name needs to be specified.```").catch(console.error);
    else
        message.channel.send("```Command name cannot have a space.```").catch(console.error);
}

function commandModifyContent(bot, message, args)
{
    if(args.length > 3)
    {
        let msg = "";

        for(var i = 3 ; i < args.length ; i++ )
        {
            msg += (args[i] == `\\n`) ? `\n` : ((i != (args.length-1)) ? `${args[i]} ` : args[i]);
        }

        bot.db.custom_command().push(`/custom_command[${command.id}]`, {id: command.id, id_guild: guild.id, name: command.name, message: msg});
        message.channel.send("```Command" + ` "${args[2]}" `+  "has been modified.```").catch(console.error);
    }
    else
        message.channel.send("```Command new content needs to be specified.```").catch(console.error);
}

function commandList(bot, message, args)
{
    if(args.length == 1)
    {
        var guild = bot.jsonQuery(`guild[identifier=${message.guild.id}]`, {data: bot.db.guild().getData("/") }).value;
        var commands = bot.jsonQuery(`custom_command[**][*id_guild=${guild.id}]`, {data: bot.db.custom_command().getData("/") }).value;
        
        let msg = "```List of commands :\n";

        commands.forEach(command => 
        {
            msg += `- ${command.name}\n` 
        });
        msg += "```";

        message.channel.send(msg).catch(console.error);
    }
    else
        message.channel.send(help()).catch(console.error);

    
}