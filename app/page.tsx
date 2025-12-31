import { Card } from "@/components/card";
import { CryptoList } from "@/components/crypto-list";
import { CryptoTable } from "@/components/crypto-table";
import { MarketChart } from "@/components/market-chart";
import { NewsCard } from "@/components/news-card";
import { getBtcEthData, getCoinList, getCryptoNews, getGlobalData, getTopCoins } from "@/services/api";


export default async function Home() {
  const globalData = await getGlobalData();
  const btcEthData = await getBtcEthData();
  const newsData = await getCryptoNews();

  const coins = await getTopCoins(5);
  const coinsList = await getCoinList(10);

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
            percent={btcEthData[0].price_change_percentage_24h}
          />

          <Card 
            title="ETH Dominance" 
            amount={parseFloat(globalData.ethDominance).toFixed(2) + '%'} 
            percent={btcEthData[1].price_change_percentage_24h}
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
