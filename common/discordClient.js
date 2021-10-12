const Discord = require('discord.js')
const prefix = '!'
const commands = {
    matic: require('../commands/matic'),
    eth: require('../commands/eth'),
    wexpoly: require('../commands/wexpoly'),
    titan: require('../commands/titan'),
    wexp: require('../commands/wexpoly'),
    bunny: require('../commands/bunny'),
    dino: require('../commands/dino'),
    addy: require('../commands/addy'),
    pspace: require('../commands/pspace'),
    pup: require('../commands/pup'),
    bone: require('../commands/bone'),
    dolph: require('../commands/dolph'),
    wex: require('../commands/wexpoly'),
    qi: require('../commands/qi'),
    alert: require('../commands/alert'),
    alertstats: require('../commands/alertstats'),
    help: require('../commands/help'),
    supportedcoins: require('../commands/supportedCoins'),
    dojo: require('../commands/dojo'),
    ice: require('../commands/ice'),
    pwing: require('../commands/pwing'),
    info: require('../commands/info'),
    gecko: require('../commands/gecko'),
    raider: require('../commands/raider'),
    movr: require('../commands/movr'),
    ivory: require('../commands/ivory'),
    tx: require('../commands/tx'),
    ftm: require('../commands/ftm'),
    repl: require('../commands/repl'),
    block: require('../commands/block'),
    tower: require('../commands/tower'),
}

const client = new Discord.Client()

client.on('message', function (message) {
    if (message.author.bot) return
    if (message.cleanContent.startsWith(prefix)) {
        const commandBody = message.content.slice(prefix.length)
        const args = commandBody.split(' ')
        const command = args.shift().toLowerCase()
        if (commands[command]) commands[command](message)
    }
})

client.login(process.env.BOT_TOKEN)

module.exports = {
    client,
}
