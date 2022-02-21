const { getPrice } = require('../coins/Joe')
const { MessageEmbed } = require('discord.js')

module.exports = async message => {
    const price = await getPrice()
    message.reply({
        embed: {
            title: 'Trader Joe (JOE)',
            thumbnail: {
                url: 'https://assets.coingecko.com/coins/images/17569/small/joe_200x200.png',
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
