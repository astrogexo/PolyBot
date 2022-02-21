const { getPrice } = require('../coins/Sno.js')
const { MessageEmbed } = require('discord.js')

module.exports = async message => {
    const price = await getPrice()
    message.reply({
        embed: {
            title: 'Snowy Owl (SNO)',
            thumbnail: {
                url: 'https://snowyowl.finance/static/media/sno.5382de83.png',
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
