const { getPrice } = require('../coins/Tower')
const { MessageEmbed } = require('discord.js')

module.exports = async message => {
    const price = await getPrice()
    message.reply({
        embed: {
            title: 'Tower',
            thumbnail: { url: 'https://cdn.discordapp.com/icons/873564402819948544/c579dbb997c9103d82acb3849c7f43f8.png' },
            fields:[{
                name: "Price",
                value: `**$${price}**`
            }]        },
    })

}
