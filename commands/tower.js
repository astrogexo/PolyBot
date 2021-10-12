const { getPrice } = require('../coins/Tower')
const { MessageEmbed } = require('discord.js')

module.exports = async message => {
    const price = await getPrice()
    message.reply({
        embed: {
            title: 'Tower',
            thumbnail: { url: 'https://app.towerfinance.io/static/media/tower-dark.a4c250a5.png' },
            fields:[{
                name: "Price",
                value: `**$${price}**`
            }]        },
    })

}
