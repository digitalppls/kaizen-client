const currentTime = new Date().getTime();
const TERMS = "/terms.pdf";
const WHITEPAPER = `#?${currentTime}`;

const INDEXES = [
  {
    id: 1,
    title: "KAIZEN",
    title_old: "BITW",
    color: "#58c1b9",
    symbol: "",
    price: 0,
    market_cap: 822000000,
    inception_date: new Date(2020, 10, 14),
    desc: "KAIZEN_DESC",
    help_info: "",
    items: [
      {
        name: "Bitcoin",
        img: "bitcoin.png",
        weight: 60.99
      },
      {
        name: "Ethereum",
        img: "ethereum.png",
        weight: 27.88
      },
      {
        name: "Solana",
        img: "solana.svg",
        weight: 3.62
      },
      {
        name: "Cardano",
        img: "cardano.png",
        weight: 3.44
      },
      {
        name: "LiteCoin",
        img: "litecoin.png",
        weight: 0.89
      },
      {
        name: "ChainLink",
        img: "chainlink.png",
        weight: 0.82
      },
      {
        name: "Bitcoin Cash",
        img: "bitcoincash.png",
        weight: 0.64
      },
      {
        name: "Algorand",
        img: "algorand.svg",
        weight: 0.63
      },
      {
        name: "Polygon",
        img: "polygon.png",
        weight: 0.59
      },
      {
        name: "Uniswap",
        img: "uniswap.png",
        weight: 0.50
      }
    ]
  },
  {
    id: 2,
    title: "Coin10",
    title_old: "CRYPTO10",
    color: "#99c158",
    symbol: "",
    price: 0,
    market_cap: 0,
    inception_date: new Date(2016, 11, 31),
    desc: "COIN10_DESC",
    help_info: "",
    items: [
      {
        name: "Bitcoin",
        img: "bitcoin.png",
        weight: 26.458
      },
      {
        name: "Ethereum",
        img: "ethereum.png",
        weight: 23.607
      },
      {
        name: "Polkadot",
        img: "polkadot.png",
        weight: 15.130
      },
      {
        name: "Binance Coin",
        img: "binance.png",
        weight: 11.050
      },
      {
        name: "ChainLink",
        img: "chainlink.png",
        weight: 6.695
      },
      {
        name: "Litecoin",
        img: "litecoin.png",
        weight: 6.627
      },
      {
        name: "Bitcoin Cash",
        img: "bitcoincash.png",
        weight: 6.141
      },
      {
        name: "EOS",
        img: "eos.png",
        weight: 2.183
      },
      {
        name: "Bitcoin SV",
        img: "bitcoinsv.png",
        weight: 2.111
      }
    ]
  },
  {
    id: 3,
    title: "Crypto100",
    title_old: "CIX100",
    color: "#7358c1",
    symbol: "",
    price: 0,
    market_cap: 0,
    inception_date: new Date(2017, 4, 1),
    desc: "CRYPTO100_DESC",
    help_info: "",
    items: [
      {
        name: "Bitcoin",
        img: "bitcoin.png",
        weight: "48.34"
      },
      {
        name: "Ethereum",
        img: "ethereum.png",
        weight: "24.25"
      },
      {
        name: "Cardano",
        img: "cardano.png",
        weight: "4.47"
      },
      {
        name: "Binance Coin",
        img: "binance.png",
        weight: "4.30"
      },
      {
        name: "XRP",
        img: "ripple.png",
        weight: "2.88"
      },
      {
        name: "Solana",
        img: "solana.svg",
        weight: "2.34"
      },
      {
        name: "Dogecoin",
        img: "dogecoin.png",
        weight: "1.98"
      },
      {
        name: "Uniswap",
        img: "uniswap.png",
        weight: "0.94"
      },
      {
        name: "Litecoin",
        img: "litecoin.png",
        weight: "0.71"
      },
      {
        name: "Chainlink",
        img: "chainlink.png",
        weight: "0.70"
      },
      {
        name: "Bitcoin Cash",
        img: "bitcoincash.png",
        weight: "0.67"
      },
      {
        name: "Algorand",
        img: "algorand.svg",
        weight: "0.62"
      },
      {
        name: "Polygon",
        img: "polygon.png",
        weight: "0.54"
      },
      {
        name: "Stellar",
        img: "stellar.png",
        weight: "0.47"
      },
      {
        name: "Cosmos",
        img: "cosmos.png",
        weight: "0.43"
      },
      {
        name: "Ethereum Classic",
        img: "ethereumclassic.png",
        weight: "0.42"
      },
      {
        name: "VeChain",
        img: "vechain.svg",
        weight: "0.39"
      },
      {
        name: "Compound",
        img: "compound.svg",
        weight: "0.37"
      },
      {
        name: "FTX Token",
        img: "ftxtoken.png",
        weight: "0.36"
      },
      {
        name: "THETA",
        img: "theta.png",
        weight: "0.35"
      },
      {
        name: "TRON",
        img: "tron.png",
        weight: "0.33"
      },
      {
        name: "Tezos",
        img: "tezos.png",
        weight: "0.30"
      },
      {
        name: "Monero",
        img: "monero.png",
        weight: "0.27"
      },
      {
        name: "EOS",
        img: "eos.png",
        weight: "0.25"
      },
      {
        name: "Decred",
        img: "decred.png",
        weight: "0.23"
      },
      {
        name: "Crypto.com Coin",
        img: "cryptocom.png",
        weight: "0.20"
      },
      {
        name: "Neo",
        img: "neo.png",
        weight: "0.18"
      },
      {
        name: "yearn.finance",
        img: "yearnfinance.png",
        weight: "0.17"
      },
      {
        name: "IOTA",
        img: "iota.png",
        weight: "0.17"
      },
      {
        name: "Bitcoin SV",
        img: "bitcoinsv.png",
        weight: "0.16"
      },
      {
        name: "Waves",
        img: "waves.png",
        weight: "0.16"
      },
      {
        name: "Maker",
        img: "maker.png",
        weight: "0.15"
      },
      {
        name: "Chiliz",
        img: "chiliz.png",
        weight: "0.14"
      },
      {
        name: "Basic Attention Token",
        img: "basicattentiontoken.png",
        weight: "0.13"
      },
      {
        name: "Enjin Coin",
        img: "enjincoin.png",
        weight: "0.12"
      },
      {
        name: "NEM",
        img: "nem.png",
        weight: "0.12"
      },
      {
        name: "BitTorrent",
        img: "bittorrent.png",
        weight: "0.11"
      },
      {
        name: "Bancor",
        img: "bancor.png",
        weight: "0.10"
      },
      {
        name: "Decentraland",
        img: "decentraland.png",
        weight: "0.10"
      },
      {
        name: "IoTeX",
        img: "iotex.svg",
        weight: "0.09"
      },
      {
        name: "Harmony",
        img: "harmony.png",
        weight: "0.08"
      },
      {
        name: "Ontology",
        img: "ontology.png",
        weight: "0.07"
      },
      {
        name: "Ravencoin",
        img: "ravencoin.png",
        weight: "0.07"
      },
      {
        name: "Lisk",
        img: "lisk.png",
        weight: "0.07"
      },
      {
        name: "Huobi Token",
        img: "huobitoken.png",
        weight: "0.07"
      },
      {
        name: "UMA",
        img: "uma.png",
        weight: "0.06"
      },
      {
        name: "Zcash",
        img: "zcash.png",
        weight: "0.06"
      },
      {
        name: "Qtum",
        img: "qtum.png",
        weight: "0.04"
      },
      {
        name: "Nano",
        img: "nano.png",
        weight: "0.04"
      },
      {
        name: "iExec RLC",
        img: "iexec.png",
        weight: "0.04"
      },
      {
        name: "SushiSwap",
        img: "sushiswap.png",
        weight: "0.03"
      },
      {
        name: "Dash",
        img: "dash.png",
        weight: "0.03"
      },
      {
        name: "OMG Network",
        img: "omgnetwork.png",
        weight: "0.02"
      },
      {
        name: "Siacoin",
        img: "siacoin.png",
        weight: "0.02"
      },
      {
        name: "Bitcoin Diamond",
        img: "bitcoindiamond.png",
        weight: "0.02"
      },
      {
        name: "Augur",
        img: "augur.png",
        weight: "0.02"
      },
      {
        name: "ICON",
        img: "icon.png",
        weight: "0.02"
      },
      {
        name: "Bitcoin Gold",
        img: "bitcoingold.png",
        weight: "0.02"
      },
      {
        name: "Zilliqa",
        img: "zilliqa.png",
        weight: "0.02"
      },
      {
        name: "Storj",
        img: "storj.png",
        weight: "0.01"
      },
      {
        name: "OKB",
        img: "okb.png",
        weight: "0.01"
      },
      {
        name: "Nexo",
        img: "nexo.png",
        weight: "0.01"
      },
      {
        name: "0x",
        img: "0x.png",
        weight: "0.01"
      },
      {
        name: "BitShares",
        img: "bitshares.png",
        weight: "0.01"
      },
      {
        name: "IOST",
        img: "iost.png",
        weight: "0.01"
      },
      {
        name: "DigiByte",
        img: "digibyte.png",
        weight: "0.01"
      },
      {
        name: "Loopring",
        img: "loopring.png",
        weight: "0.01"
      },
      {
        name: "Fetch.ai",
        img: "fetchai.png",
        weight: "0.01"
      },
      {
        name: "Komodo",
        img: "komodo.png",
        weight: "0.01"
      },
      {
        name: "WAX",
        img: "wax.png",
        weight: "0.01"
      },
      {
        name: "Gnosis",
        img: "gnosis.png",
        weight: "0.01"
      },
      {
        name: "Polymath",
        img: "polymath.png",
        weight: "0.01"
      },
      {
        name: "Verge",
        img: "verge.png",
        weight: "0.01"
      },
      {
        name: "Status",
        img: "status.png",
        weight: "0.004"
      },
      {
        name: "aelf",
        img: "aelf.png",
        weight: "0.004"
      },
      {
        name: "Hive",
        img: "hive.png",
        weight: "0.004"
      },
      {
        name: "Civic",
        img: "civic.png",
        weight: "0.004"
      },
      {
        name: "Ardor",
        img: "ardor.png",
        weight: "0.004"
      },
      {
        name: "GateToken",
        img: "gatetoken.png",
        weight: "0.004"
      },
      {
        name: "Steem",
        img: "steem.png",
        weight: "0.003"
      },
      {
        name: "Ark",
        img: "ark.png",
        weight: "0.003"
      },
      {
        name: "Metal",
        img: "metal.png",
        weight: "0.003"
      },
      {
        name: "Electroneum",
        img: "electroneum.png",
        weight: "0.003"
      },
      {
        name: "FUNToken",
        img: "funtoken.png",
        weight: "0.003"
      },
      {
        name: "Wanchain",
        img: "wanchain.png",
        weight: "0.002"
      },
      {
        name: "Neblio",
        img: "neblio.png",
        weight: "0.002"
      },
      {
        name: "Powerledger",
        img: "powerledger.png",
        weight: "0.002"
      },
      {
        name: "Aragon",
        img: "aragon.png",
        weight: "0.002"
      },
      {
        name: "Groestlcoin",
        img: "groestlcoin.png",
        weight: "0.002"
      },
      {
        name: "Gas",
        img: "gas.png",
        weight: "0.002"
      },
      {
        name: "Molecular Future",
        img: "molecularfuture.png",
        weight: "0.002"
      },
      {
        name: "Bytom",
        img: "bytom.png",
        weight: "0.001"
      },
      {
        name: "Streamr",
        img: "steamr.png",
        weight: "0.001"
      },
      {
        name: "Loom Network",
        img: "loomnetwork.png",
        weight: "0.001"
      },
      {
        name: "Nebulas",
        img: "nebulas.png",
        weight: "0.001"
      },
      {
        name: "GXChain",
        img: "gxchain.png",
        weight: "0.001"
      },
      {
        name: "Waltonchain",
        img: "waltonchain.png",
        weight: "0.001"
      },
      {
        name: "NULS",
        img: "nuls.png",
        weight: "0.001"
      },
      {
        name: "DigixDAO",
        img: "digixdao.png",
        weight: "0.001"
      },
      {
        name: "v.systems",
        img: "vsystems.png",
        weight: "0.0005"
      }
    ]
  },
  {
    id: 4,
    title: "DEFI",
    title_old: "DEFI",
    color: "#7358c1",
    symbol: "",
    price: 0,
    market_cap: 0,
    inception_date: new Date(2020, 7, 28),
    desc: "DEFI_DESC",
    help_info: "",
    items: [
      {
        name: "Band",
        img: "band.png",
        weight: 7.55
      },
      {
        name: "Compound",
        img: "compound.svg",
        weight: 7.61
      },
      {
        name: "Kava.io",
        img: "kava.svg",
        weight: 6.95
      },
      {
        name: "Kyber Network",
        img: "kybernetwork.png",
        weight: 5.87
      },
      {
        name: "Aave",
        img: "aave.svg",
        weight: 10.83
      },
      {
        name: "ChainLink",
        img: "chainlink.png",
        weight: 27.36
      },
      {
        name: "Maker",
        img: "maker.png",
        weight: 7.47
      },
      {
        name: "Synthetix Network",
        img: "synthetix.svg",
        weight: 7.75
      },
      {
        name: "Swipe",
        img: "swipe.svg",
        weight: 9.12
      },
      {
        name: "0x",
        img: "0x.png",
        weight: 9.49
      }
    ]
  }
];
export { INDEXES, TERMS, WHITEPAPER };
