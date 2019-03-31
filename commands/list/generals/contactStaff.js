async function run(bot, message, args)
{
    if(conf.channelType === "all" || conf.channelType === message.channel.type)
    {
        command(bot, message, args);
    }
}

function command(bot, message, args)
{
    if(args.length > 0 || message.attachments.array().length > 0)
    {
        let user = message.author.tag;
        let guild = bot.guilds.get("419995379786842112");
        let channel = guild.channels.find(x => x.name === "🌡message-bot");

        if(args.length == 0)
        {
            channel.send("```De " + user + " :```", {files: [message.attachments.array()[0].url]}).catch(console.error);
            message.channel.send(`Fichier transmis.`).catch(console.error);
        }
        else
        {
            let msg = "";

            args.forEach(arg => 
            {
                if(arg == `\\n`)
                    msg += `\n`;
                else
                    msg += arg + " ";
            });

            if(message.attachments.array().length > 0)
            {
                channel.send("```De " + user + ` :\n` + msg + "```", {files: [message.attachments.array()[0].url]}).catch(console.error);
                message.channel.send(`Message et fichier transmis.`).catch(console.error);
            }
            else
            {
                channel.send("```De " + user + ` :\n` + msg + "```").catch(console.error);
                message.channel.send(`Message transmis.`).catch(console.error);
            }
        }
    }
    else
    {
        message.channel.send(help());
    }
}

function help()
{
    return  "```"+
            "!contactStaff [message] et/ou [fichier]\n"+
            "Permet d'envoyer un message au Staff afin d'obtenir une réponse dans les meilleurs délais.\n"+
            "Si votre message comporte des retours à la ligne pour le structurer, veuillez ajouter \\n à chaque fin de paragraphe pour la prise en compte du retour à la ligne. Merci. \n" +
            "Une confirmation de l'envoie vous sera communiqué par le bot.\n"+
            "Attention cette commande ne fonctionne qu'en message privé."+
            "```";
}

var conf =
{
    enabled: false,
    guildOnly: false,
    aliases: [`cs`,`contact`,`staff`],
    permLevel: 0,
    channelType: `dm`
}

var info = 
{
    name: `contactStaff`,
    description: help(),
    usage: `contactStaff`
}

module.exports =
{
    run : run,
    conf : conf,
    info : info
}
