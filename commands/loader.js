const fs = require('fs');

module.exports = function(bot)
{
    fs.readdir('./commands/list/generals/', function(err, files)
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
            console.log(`No commands to load.`);
        }
        else
        {
            console.log(`Loading a total of ${jsfiles.length} commands :`);
    
            jsfiles.forEach(function(file, i)
            {
                let commandHandler = require(`./list/generals/${file}`);
                let commandName = file.split('.')[0];
                if(commandHandler.conf.enabled)
                {
                    console.log(`- ${i + 1}: Command loaded: ${commandName}`)
                    bot.commands.set(commandName, commandHandler);
                }
                else
                    console.log(`- ${i + 1}: Command disabled: ${commandName}`)
                
            });
        }
    });
}
