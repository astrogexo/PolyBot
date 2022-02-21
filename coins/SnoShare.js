const provider = require('../provider')
const { ethers } = require('ethers')
const PairABI = require('../abis/Pair.abi.json')
const Joe = require('./Joe')

// TraderJoe
const SNOSHARE_JOE_PAIR = '0x061349a57b702ebE3139CA419457bb23f7e0D8A2'

async function getPrice() {
    const Pair = new ethers.Contract(SNOSHARE_JOE_PAIR, PairABI, provider.avax)
    const JoePrice = await Joe.getPrice()
    const [JoeAmount, SnoShareAmount] = await Pair.getReserves()
    return (JoeAmount * JoePrice) / SnoShareAmount
}


const SnoShare = {
    getPrice,
    // subscribePair,
}

module.exports = SnoShare
