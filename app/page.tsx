import { Card } from "@/components/card";
import { CryptoList } from "@/components/crypto-list";
import { CryptoTable } from "@/components/crypto-table";
import { MarketChart } from "@/components/market-chart";
import { NewsCard } from "@/components/news-card";
import { getBtcEthData, getCoinList, getCryptoNews, getGlobalData, getTopCoins } from "@/services/api";


export default async function Home() {
  let globalData, btcEthData, newsData, coins, coinsList;

  try {
    globalData = await getGlobalData();
  } catch (error) {
    console.error('Erro ao buscar dados globais:', error);
    globalData = {
      totalMarketCapUsd: '0',
      marketCapChangePercent24Hr: '0',
      volumeUsd24Hr: '0',
      volumeChangePercent24Hr: '0',
      btcDominance: '0',
      ethDominance: '0',
    };
  }

  try {
    btcEthData = await getBtcEthData();
  } catch (error) {
    console.error('Erro ao buscar dados BTC/ETH:', error);
    btcEthData = [
      { price_change_percentage_24h: 0 },
      { price_change_percentage_24h: 0 },
    ];
  }

  try {
    newsData = await getCryptoNews();
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    newsData = [];
  }

  try {
    coins = await getTopCoins(5);
  } catch (error) {
    console.error('Erro ao buscar top coins:', error);
    coins = [];
  }

  try {
    coinsList = await getCoinList(10);
  } catch (error) {
    console.error('Erro ao buscar lista de coins:', error);
    coinsList = [];
  }

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    return `$${num.toLocaleString()}`;
  };
 
  return (
    <div className="min-h-screen text-gray-50">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Card 
            title="Global Market Cap" 
            amount={formatCurrency(globalData.totalMarketCapUsd)} 
            percent={globalData.marketCapChangePercent24Hr}
          />

          <Card 
            title="24h Volume" 
            amount={formatCurrency(globalData.volumeUsd24Hr)} 
            percent={globalData.volumeChangePercent24Hr}
          />

          <Card 
            title="BTC Dominance" 
            amount={parseFloat(globalData.btcDominance).toFixed(2) + '%'} 
            percent={btcEthData?.[0]?.price_change_percentage_24h ?? 0}
          />

          <Card 
            title="ETH Dominance" 
            amount={parseFloat(globalData.ethDominance).toFixed(2) + '%'} 
            percent={btcEthData?.[1]?.price_change_percentage_24h ?? 0}
          />
                    
        </section>

        <div className="lg:col-span-2 space-y-6">
          <MarketChart />

          <CryptoTable coins={coins}/>
        </div>

        <div className="space-y-6">
          <NewsCard news={newsData} />

          <CryptoList coins={coinsList} />
        </div>

      </div>
      
    </div>
  );
}
