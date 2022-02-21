const provider = require('../provider')
const { ethers } = require('ethers')
const PairABI = require('../abis/Pair.abi.json')
const Joe = require('./Joe')

// TraderJoe
const SNO_JOE_PAIR = '0xE63b66A8CF7811525cd15daB15F17fb62aa5af2F'

async function getPrice() {
    const SnoJoePair = new ethers.Contract(SNO_JOE_PAIR, PairABI, provider.avax)
    const JoePrice = await Joe.getPrice()
    const [SnoAmount, JoeAmount] = await SnoJoePair.getReserves()
    return (JoeAmount * JoePrice) / SnoAmount
}


const Sno = {
    getPrice,
    // subscribePair,
}

module.exports = Sno
