const provider = require('../provider')
const { ethers } = require('ethers')
const PairABI = require('../abis/Pair.abi.json')
const Avax = require('./Avax')

// TraderJoe
const JOE_WAVAX_PAIR = '0x454E67025631C065d3cFAD6d71E6892f74487a15'

async function getPrice() {
    const Pair = new ethers.Contract(JOE_WAVAX_PAIR, PairABI, provider.avax)
    const [JoeAmount, AvaxAmount] = await Pair.getReserves()    
    const AvaxPrice = await Avax.getPrice()

    return (AvaxAmount * AvaxPrice) / JoeAmount
}


const Joe = {
    getPrice,
}

module.exports = Joe
