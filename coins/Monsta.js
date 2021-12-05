const provider = require('../provider')
const { ethers } = require('ethers')
const PairABI = require('../abis/Pair.abi.json')
const Bnb = require('./Bnb')


// PancakeSwap
const MONSTA_BNB_PAIR = '0x55c49d1cd54126c69f22c2e9eebd1efef5e620fa'

async function getPrice() {
    const MonstaBnbPair = new ethers.Contract(MONSTA_BNB_PAIR, PairABI, provider.bsc)
    const [MonstaAmount, BnbAmount] = await MonstaBnbPair.getReserves()
    const BnbPrice = await Bnb.getPrice()
    return (BnbAmount * BnbPrice) / MonstaAmount
}


const Dojo = {
    getPrice,
}

module.exports = Dojo
