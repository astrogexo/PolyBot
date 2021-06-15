const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const parseDiscordMessageParams = require('./utils/parseDiscordMessageParams')
const { supportedCoins } = require('../config')

const thresholdOpsMap = {
    '<': 'below',
    '>': 'above',
}
module.exports = async message => {
    let [coin, threshold, amount, notificationType, notificationMetaString] =
        parseDiscordMessageParams(message.cleanContent)

    if (!coin || !threshold || !amount) {
        return message.reply('Incorrect command syntax. Please use `!alert <coin> <|> <price>`')
    }
    threshold = threshold.toLowerCase()
    // coin validation
    if (!supportedCoins.includes(coin.toUpperCase())) {
        return message.reply(`Supported coins: ${supportedCoins.join(', ')}`)
    }

    // threshold validation
    if (!['>', '<'].includes(threshold.toLowerCase())) {
        return message.reply(
            `Unknown threshold operator **${threshold}**. Please use \`<\` or \`>\``,
        )
    }

    // value validation
    let parsedAmount
    try {
        parsedAmount = parseFloat(amount)

        if (amount === 0) {
            return message.reply("Amount can't be 0")
        }

        if (amount > 1000000) {
            return message.reply('Really? Are you dreaming?')
        }
    } catch (err) {
        console.log(err)
        return message.reply('Error parsing the threshold price. Please use numbers only')
    }

    // all good, create alert
    try {
        await prisma.alert.create({
            data: {
                price: parsedAmount,
                discordUser: message.author.id,
                coin,
                threshold,
                notifications: [],
            },
        })
    } catch (err) {
        console.error(err)
        return message.reply('Error while inserting alert to the database')
    }

    return message.reply(
        `Created an alert for **${coin.toUpperCase()}** when price go *${thresholdOpsMap[threshold]}* **$${parsedAmount}**`,
    )

    await prisma.$disconnect()
}
