const provider = require('../provider')
const { ethers } = require('ethers')
const PairABI = require('../abis/Pair.abi.json')

//FireBird
const TOWER_USDC_PAIR = '0xd70f14f13ef3590e537bbd225754248965a3593c'

async function getPrice() {
    const TowerUsdcPair = new ethers.Contract(TOWER_USDC_PAIR, PairABI, provider.matic)
    const [reserve0, reserve1] = await TowerUsdcPair.getReserves()
    return reserve0 / reserve1 * 1e12
}

const Tower = {
    getPrice,
}

module.exports = Tower
