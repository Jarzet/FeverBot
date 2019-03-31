const fs = require("fs");
//const logs = require(`../utils/logs.js`);

module.exports = function(oldGuild, newGuild, bot)
{
    /*
    if(!(oldGuild.name === newGuild.name))
    {
        let message = `Rename server : ${oldGuild.name} -> ${newGuild.name}`;
        logs.logsAction(newGuild, message);
        let isDirectoryExists;
        try 
        {
            fs.statSync(`logs/${oldGuild.id}`);
            isDirectoryExists = true;
        } 
        catch(e) 
        {
            isDirectoryExists = false;
        }

        if(isDirectoryExists)
        {
            if (fs.existsSync(`logs/${oldGuild.id}/logsAction_${oldGuild.id}.txt`)) 
            {
                fs.renameSync(`logs/${oldGuild.id}/logsAction_${oldGuild.id}.txt`, `logs/${oldGuild.id}/logsAction_${newGuild.id}.txt`)
            }
            fs.renameSync(`logs/${oldGuild.id}`, `logs/${newGuild.id}`)
        } 
    }*/

}