const { getPrice } = require('../coins/SnoShare.js')
const { MessageEmbed } = require('discord.js')

module.exports = async message => {
    const price = await getPrice()
    message.reply({
        embed: {
            title: 'Snowy Owl Shares (SNOSHARE)',
            thumbnail: {
                url: 'https://snowyowl.finance/static/media/snoshare.20c07224.png',
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
