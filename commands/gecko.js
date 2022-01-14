const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko()
const parseDiscordMessageParams = require('./utils/parseDiscordMessageParams')
const formatPercentage = require('./utils/formatPercentage')

IsAwake = false //Flag to track if bot has been initialized. Used to pull a fresh CoinGecko database

async function Msg(message, FullList) {
    let [coin] = parseDiscordMessageParams(message.cleanContent)
    if (!coin) {
        return message.reply('Incorrect command syntax. Please use `!gecko <coin-symbol>`')
    }

    coin = coin.toLowerCase()

    if (!IsAwake) {
        // Fetch coin list if this is the first time the !gecko command has been invoked
        CoinGeckoList = await CoinGeckoClient.coins.list()
        console.info('Initialized CoinList')
        // Set flag to indicate that the !gecko command has been invoked once
        IsAwake = true
    }

    listedCoin = CoinGeckoList.data.find(
        each => each.id === coin
    )

    if (!listedCoin) {
        console.info('Coin Not found Refreshing CoinList')

        // If the coin isn't found, refresh the database first, and look again otherwise, return an error
        CoinGeckoList = await CoinGeckoClient.coins.list()

        listedCoin = CoinGeckoList.data.find(
            each => each.symbol === coin || each.id === coin || each.name === coin,
        )
    }

    // Check coin flag one more time after refreshing the list
    if (!listedCoin) {
        console.info('Coin not found after CoinList refresh')
        return message.reply("The Coin isn't listed on Coingecko")
    } else {
        const { data } = await await CoinGeckoClient.coins.fetch(listedCoin.id, {
            market_data: true,
        })

        if (!FullList) {
            let Reply = {
                embed: {
                    color: 0x0099ff,
                    title: listedCoin.name.toUpperCase(),
                    url: data.links.homepage[0],
                    thumbnail: { url: data.image.large },
                    fields: [{ name: `**$${data.market_data.current_price.usd}**`, value: 'Powered by [Coingecko](https://www.coingecko.com/en/coins/' + listedCoin.id + ')', inline: true }],
                },
            }

            return message.reply(Reply)
        } else {
            const platformList = Object.keys(data.platforms).filter(each => each.length)
            const platforms = {
                name: 'Token Address',
                value: '',
            }
            if (platformList.length) {
                platforms.value = platformList.map(
                    function (each) {
                        return `**${each}**: ${data.platforms[each]}\n`
                    },
                )
            }

            let fields = [
                {
                    name: `**$${data.market_data.current_price.usd}**`,
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Market Cap',
                    value: `\$${(data.market_data.market_cap.usd).toLocaleString('en-US')}`,
                    inline: true,
                },
                {
                    name: 'Total Volume',
                    value: `\$${data.market_data.total_volume.usd.toLocaleString('en-US')}`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'All-Time High',
                    value: `$${data.market_data.ath.usd}   (${formatPercentage(
                        Number(data.market_data.ath_change_percentage.usd).toFixed(2))})`,
                    inline: true,
                },
                {
                    name: 'All-Time Low',
                    value: data.market_data.atl.usd + '\s (' + formatPercentage(
                        Number(data.market_data.atl_change_percentage.usd).toFixed(2))
                        + ')',
                    inline: true,
                },
                {
                    name: '% Chng 1h | 24h | 7d',
                    value: Number(data.market_data.price_change_percentage_1h_in_currency.usd).toFixed(2) + ' | ' 
                        + Number(data.market_data.price_change_percentage_24h_in_currency.usd).toFixed(2) + ' | ' 
                        + Number(data.market_data.price_change_percentage_7d_in_currency.usd).toFixed(2),
                    inline: true,
                },
                platforms,
                {
                    name: '\u200b',
                    value: 'Powered by [Coingecko](https://www.coingecko.com/en/coins/' + listedCoin.id + ')', 
                    inline: true,
                },
            ]

            let Reply = {
                embed: {
                    color: 0x0099ff,
                    title: listedCoin.name.toUpperCase(),
                    url: data.links.homepage[0],
                    thumbnail: { url: data.image.large },
                    fields,
                },
            }

            return message.reply(Reply)
        }
    }
}

module.exports = {
    Gecko: async (message) => {
        Msg(message, false)
    },
    GeckoFull: async (message) => {
        Msg(message, true)
    },
}
