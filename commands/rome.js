const { getPrice } = require('../coins/Rome')
const { MessageEmbed } = require('discord.js')

module.exports = async message => {
    const price = await getPrice()
    message.reply({
        embed: {
            title: 'Rome [  ROME]',
            thumbnail: { url: 'https://assets.coingecko.com/coins/images/21078/small/rome-dao.jpeg?1638291936'},
            fields:[{
                name: "Price",
                value: `**$${price}**`
            }]        },
    })
}
