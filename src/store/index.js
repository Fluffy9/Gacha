import Vue from 'vue'
import Vuex from 'vuex'
import ethereum from '../store/ethereum'
import {ethers, Contract, BigNumber} from 'ethers'
import weiroll from '@weiroll/weiroll.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    networks: [
      {
        name: "Polygon", 
        currency: "Matic", 
        explorer: "https://polygonscan.com/tx/",
        price: 1,
        router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", 
        commonPrizes: ["0xD6DF932A45C0f255f85145f286eA0b292B21C90B", "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b", "0x61BDD9C7d4dF4Bf47A4508c0c8245505F2Af5b7b", "0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3", "0x3Cef98bb43d732E2F285eE605a8158cDE967D219", "0xFbdd194376de19a88118e84E279b977f165d01b8", "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c", "0x172370d5Cd63279eFa6d502DAB29171933a610AF"],
        rarePrizes: ["0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", "0x85955046DF4668e1DD369D2DE9f3AEB98DD2A369", "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", "0x50B728D8D964fd00C2d0AAD81718b71311feF68a", "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a", "0x23fE1Ee2f536427B7e8aC02FB037A7f867037Fe8", "0x3066818837c5e6eD6601bd5a91B0762877A6B731", "0xb33EaAd8d922B1083446DC23f610c2567fB5180f"],
        epicPrizes: ["0xA2f4F15F693aC229521bE67Ca72e237050A65a44"]
      },
      {
        name: "Gnosis", 
        currency: "Dai", 
        explorer: "https://blockscout.com/xdai/mainnet/tx/",
        price: 1, 
        router: "0x1C232F01118CB8B424793ae03F870aa7D0ac7f77",
        commonPrizes: ["0x2995D1317DcD4f0aB89f4AE60F3f020A4F17C7CE", "0x4537e328bf7e4efa29d05caea260d7fe26af9d74", "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d","0x71850b7e9ee3f13ab46d67167341e4bdc905eef9", "0x1e16aa4df73d29c029d94ceda3e3114ec191e25a"],
        rarePrizes: ["0x3a97704a1b25f08aa230ae53b352e2e72ef52843","0xddafbb505ad214d7b80b1f830fccc89b60fb7a83", "0xe2e73a1c69ecf83f464efce6a5be353a37ca09b2"],
        epicPrizes: ["0x4537e328bf7e4efa29d05caea260d7fe26af9d74"]
      }, 
      {
        name: "Optimism",
        currency: "ETH",
        explorer: "https://optimistic.etherscan.io/tx/",
        price: .001,
        router: "",
        commonPrizes: ["0x76FB31fb4af56892A25e32cFC43De717950c9278", "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4", "0x4200000000000000000000000000000000000042"],
        rarePrizes: ["0x68f180fcCe6836688e9084f035309E29Bf0A2095", "0xE7798f023fC62146e8Aa1b36Da45fb70855a77Ea"],
        epicPrizes: ["0x6fd9d7AD17242c41f7131d257212c54A0e816691"]
      }
      //{name: "Optimism", contract: "", currency: "Eth"}
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async buy({state, dispatch}){
      let network = state.networks.find(x => x.name.toLowerCase() == state.ethereum.network.toLowerCase())
      let magic = Math.random()
      if(magic < .75){
        let tx = await dispatch("swapSimple", network.commonPrizes[Math.floor(Math.random()*network.commonPrizes.length)])
        return {rarity: "common", tx: network.explorer+tx.hash}
      }
      if(magic < .95){
        let tx = await dispatch("swapSimple", network.rarePrizes[Math.floor(Math.random()*network.commonPrizes.length)])
        return {rarity: "rare", tx: network.explorer+tx.hash}
      }
      else {
        let tx = await dispatch("swapSimple", network.epicPrizes[Math.floor(Math.random()*network.commonPrizes.length)])
        return {rarity: "epic", tx: network.explorer+tx.hash}
      }
    },
    async swapSimple({state}, tokenB){
      let network = state.networks.find(x => x.name.toLowerCase() == state.ethereum.network.toLowerCase())
      let router = new Contract(network.router, require("../assets/ABI/V2Router.json"), state.ethereum.signer);
      let weth = await router.WETH()
      let out = await router.getAmountsOut(ethers.utils.parseEther(network.price.toString()), [weth, tokenB])
      return await router.swapExactETHForTokens(out[1], [weth, tokenB], state.ethereum.user, ethers.constants.MaxUint256, {value: ethers.utils.parseEther(network.price.toString())})

    },
    async swap({state}, vm, r, tokenA, tokenB){
      let router = new Contract(r, require("../assets/ABI/V2Router.json"), state.ethereum.provider);
      let planner = new weiroll.Planner()
      //function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)

      planner.add(router.swapETHForExactTokens(ethers.utils.parseEther("1"), [tokenA, tokenB], state.ethereum.user, ethers.constants.MaxUint256)).withValue(ethers.utils.parseEther(1))
      const { c, s } = planner.plan();
      let VM = new ethers.contract(vm, require("../assets/ABI/VM.json"), provider)
      return await VM.execute(c, s);
      //function _execute(bytes32[] calldata commands, bytes[] memory state)

    }
  },
  modules: {
    ethereum: ethereum
  }
})
