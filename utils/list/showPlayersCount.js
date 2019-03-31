const request = require('request');

module.exports = function(bot)
{
    //presence(bot, `Searching...`);


    request(`http://${bot.conf().getData("/ip")}:${bot.conf().getData("/port")}/${bot.conf().getData("/players_json")}`, function (error, response, body) 
    {
        if(!error)
        {
            let numberPlayers = JSON.parse(body).length;

            request(`http://${bot.conf().getData("/ip")}:${bot.conf().getData("/port")}/${bot.conf().getData("/info_json")}`, function (error, response, body) 
            {
                let msg = (numberPlayers < 2) ? `Joueur connecté : ` : `Joueurs connectés : `;
                msg += (numberPlayers < 10) ? `0` : ``;
                msg += numberPlayers;
                msg += error ? `/32`: `/${JSON.parse(body).vars.sv_maxClients}`

                presence(bot, msg);
            });
        }
        else
        {
            presence(bot, `Serveur hors-ligne`);          
        }
    });

    
}

function presence(bot, message)
{
    bot.user.setPresence(
    {  
        game : 
        { 
            name : message/*,
            url : '',
            type : ''*/
        },
        status : 'dnd',
        afk : false
    });
}