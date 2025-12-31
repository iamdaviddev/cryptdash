import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
  },
});


export async function getGlobalData() {
  const res = await fetch('https://api.coingecko.com/api/v3/global', {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) throw new Error('Falha ao buscar dados');
  
  const json = await res.json();
  const data = json.data;
  
  // Transform CoinGecko data to match expected structure
  return {
    totalMarketCapUsd: data.total_market_cap.usd.toString(),
    marketCapChangePercent24Hr: data.market_cap_change_percentage_24h_usd.toString(),
    volumeUsd24Hr: data.total_volume.usd.toString(),
    volumeChangePercent24Hr: '0', // Not available in CoinGecko global
    btcDominance: data.market_cap_percentage.btc.toString(),
    ethDominance: data.market_cap_percentage.eth.toString(),
  };
}

export async function getBtcEthData() {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc&per_page=2&page=1', {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) throw new Error('Falha ao buscar dados BTC/ETH');
  
  const json = await res.json();
  return json;
}