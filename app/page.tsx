import { Card } from "@/components/card";
import { MarketChart } from "@/components/market-chart";
import { NewsCard } from "@/components/news-card";
import { getBtcEthData, getCryptoNews, getGlobalData } from "@/services/api";


export default async function Home() {
  const globalData = await getGlobalData();
  const btcEthData = await getBtcEthData();
  const newsData = await getCryptoNews();

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

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h2 className="font-semibold mb-6">Top Cryptocurrencies</h2>
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium text-right">Price</th>
                  <th className="pb-3 font-medium text-right">24h Change</th>
                  <th className="pb-3 font-medium text-right">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-[10px]">₿</div>
                    <span>Bitcoin <span className="text-slate-500 text-xs ml-1 font-mono">BTC</span></span>
                  </td>
                  <td className="py-4 text-right font-medium">$58,120.45</td>
                  <td className="py-4 text-right text-green-400">▲ 2.1%</td>
                  <td className="py-4 text-right text-slate-400">$1,095,420,000k</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition">
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[10px]">Ξ</div>
                    <span>Ethereum <span className="text-slate-500 text-xs ml-1 font-mono">ETH</span></span>
                  </td>
                  <td className="py-4 text-right font-medium">$4,320.78</td>
                  <td className="py-4 text-right text-red-400">▼ 1.4%</td>
                  <td className="py-4 text-right text-slate-400">$510,230,000k</td>
                </tr>
              </tbody>
            </table>
            <a href="#" className="inline-block mt-4 text-xs text-blue-400 hover:underline">View More ›</a>
          </div>
        </div>

        <div className="space-y-6">
          <NewsCard news={newsData} />

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex flex-col items-center">
            <div className="w-full space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm p-2 bg-slate-800/40 rounded-lg">
                    <div className="w-5 h-5 bg-cyan-500 rounded-full"></div> <span>Solana <span className="text-xs text-slate-500">SOL</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm p-2 bg-slate-800/40 rounded-lg">
                    <div className="w-5 h-5 bg-pink-500 rounded-full"></div> <span>Polkadot <span className="text-xs text-slate-500">DOT</span></span>
                </div>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
}
