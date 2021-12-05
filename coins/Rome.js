const provider = require('../provider')
const { ethers } = require('ethers')
const PairABI = require('../abis/Pair.abi.json')
const Movr = require('./Movr')


// SolarBeam
const FRAX_ROME_LP = '0x069c2065100b4d3d982383f7ef3ecd1b95c05894'

async function getPrice() {
    const FraxRomePair = new ethers.Contract(FRAX_ROME_LP, PairABI, provider.movr)
    const [FraxAmount, RomeAmount] = await FraxRomePair.getReserves()
    FraxPrice = 1.0*1e-9
    return (FraxAmount * FraxPrice) / RomeAmount 
}

const Rome = {
    getPrice,
}

module.exports = Rome
