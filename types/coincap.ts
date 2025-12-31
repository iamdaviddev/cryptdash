export interface CryptoCoin {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
}
export interface Exchange {
  name: string,
  rank: string,
  percentTotalVolume: string,
  volumeUsd: string,
  tradingPairs: string,
}