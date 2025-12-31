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
  
  return {
    totalMarketCapUsd: data.total_market_cap.usd.toString(),
    marketCapChangePercent24Hr: data.market_cap_change_percentage_24h_usd.toString(),
    volumeUsd24Hr: data.total_volume.usd.toString(),
    volumeChangePercent24Hr: '0',
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

export async function getCryptoNews() {

  const res = await fetch('https://cryptopanic.com/api/v2/posts/?auth_token=e5953284efbb71c07eee5c3813784dd364dc2dbd&public=true', {
    next: { revalidate: 300 }
  });

  if (!res.ok) return [];

  const json = await res.json();
  return json.results;
}

export async function getMarketChart(coinId: string = 'bitcoin', days: string = '1') {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) throw new Error('Falha ao buscar dados do gráfico');

  const data = await res.json();
  
  return data.prices.map((item: [number, number]) => ({
    time: new Date(item[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    price: item[1],
  }));
}

export async function getTopCoins(limit: number = 10) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
    { next: { revalidate: 60 } } 
  );

  if (!res.ok) throw new Error('Falha ao buscar top coins');

  return res.json();
}

export async function getCoinList(limit: number = 20) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Erro ao buscar moedas');
  return res.json();
}