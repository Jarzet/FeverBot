const chalk = require(`chalk`);

module.exports = function(error, bot)
{
    console.log(chalk.red(`Error :\n - ${error}\n - ${error.message}\n - ${error.fileName}\n - ${error.lineNumber}`));
}