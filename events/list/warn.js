const chalk = require(`chalk`);

module.exports = function(info, bot)
{
    console.log(chalk.yellow(`Warn : ${info}`));
}