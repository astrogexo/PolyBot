const { supportedCoins } = require('../config')
const helpMessage = `
\`\`\`

     
                                ▓▓▓▓            
                             ▓▓▓▓  ▓▓▓▓         
                            ▓▓       ▓▓         
                            ▓▓          ▓▓▓▓▓▓  
                             ▓▓▒    ▓▓▓▓     ▓▓▓
                               ▓▓▓▓▓▓         ▓▓
                                      ▓       ▓▓
                                      ▓▓▓▓  ▓▓▓▓
                                         ▓▓▓▓   
    
            ██████╗  ██████╗ ██╗  ██╗   ██╗██████╗  ██████╗ ████████╗
            ██╔══██╗██╔═══██╗██║  ╚██╗ ██╔╝██╔══██╗██╔═══██╗╚══██╔══╝
            ██████╔╝██║   ██║██║   ╚████╔╝ ██████╔╝██║   ██║   ██║   
            ██╔═══╝ ██║   ██║██║    ╚██╔╝  ██╔══██╗██║   ██║   ██║   
            ██║     ╚██████╔╝███████╗██║   ██████╔╝╚██████╔╝   ██║   
            ╚═╝      ╚═════╝ ╚══════╝╚═╝   ╚═════╝  ╚═════╝    ╚═╝   
                                                                                       
    Available Commands: 
    
    Tokens:
    ------------------------------------------------------------------------------
    !eth                                fetch ETH price from pair reserve pool (realtime)
    !matic                              fetch MATIC price from pair reserve pool (realtime)
    !qi                                 fetch Qi price from pair reserve pool (realtime)
    !addy                               fetch ADDY price from pair reserve pool (realtime)
    !bunny                              fetch POLYBUNNY price from pair reserve pool (realtime)
    !titan                              fetch TITAN price from pair reserve pool (realtime)
    !alert                              alert when a coin price goes off the threshold
    !alertstats                         prints information about saved alerts
    !supportedcoins                     a list of the supported coins
    !help                               print this message
    !gfull <coin>, !geckofull <coin>    print <coin> information from Coingecko
    !g <coin>, !gecko <coin>            print <coin> price from Coingecko
    
    Misc:
    -------------------------------------------------------------------------------
    !info <address> prints details for erc 20 tokens
    
    
\`\`\`
`
module.exports = message => {
    message.reply(helpMessage)
}
