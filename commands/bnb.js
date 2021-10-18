const { getPrice } = require('../coins/Bnb')
const { MessageEmbed } = require('discord.js')

module.exports = async message => {
    const price = await getPrice()
    message.reply({
        embed: {
            title: 'Binance Coin (BNB)',
            thumbnail: {
                url: 'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png',
            },
            fields: [
                {
                    name: 'Price',
                    value: `**$${price}**`,
                },
            ],
        },
    })
}
