import { Card } from "@/components/card";
import { getBtcEthData, getGlobalData } from "@/services/api";


export default async function Home() {
  const globalData = await getGlobalData();
  const btcEthData = await getBtcEthData();

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
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold">Market Overview</h2>
              <div className="flex gap-4 text-xs font-medium text-slate-400">
                <button className="text-blue-400 border-b-2 border-blue-400 pb-1">24H</button>
                <button className="hover:text-white">1W</button>
                <button className="hover:text-white">1M</button>
                <button className="hover:text-white">1Y</button>
              </div>
            </div>
            <div className="h-48 w-full flex items-end">
              <svg className="w-full h-full text-blue-500" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0 30 Q 10 35 20 25 T 40 28 T 60 15 T 80 20 T 100 5" fill="none" stroke="currentColor" stroke-width="0.5" />
                <path d="M0 30 Q 10 35 20 25 T 40 28 T 60 15 T 80 20 T 100 5 L 100 40 L 0 40 Z" fill="url(#gradient)" opacity="0.2" />
                <defs>
                  <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="currentColor" />
                    <stop offset="100%" stop-color="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex gap-6 mt-4 text-xs">
              <p>24h Change: <span className="text-green-400">+2.4%</span></p>
              <p>24h Volume: <span className="text-slate-300">$98.5B</span></p>
            </div>
          </div>

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
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h2 className="font-semibold mb-4">Latest News</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 text-slate-300 hover:text-blue-400 cursor-pointer transition">
                <span className="text-blue-500">•</span>
                <span>Bitcoin Hits New Highs as Market Rallies</span>
              </li>
              <li className="flex gap-3 text-slate-300 hover:text-blue-400 cursor-pointer transition">
                <span className="text-blue-500">•</span>
                <span>Ethereum 2.0 Update: What to Expect</span>
              </li>
              <li className="flex gap-3 text-slate-300 hover:text-blue-400 cursor-pointer transition">
                <span className="text-blue-500">•</span>
                <span>Regulations in Crypto: What You Need to Know</span>
              </li>
              <li className="flex gap-3 text-slate-300 hover:text-blue-400 cursor-pointer transition">
                <span className="text-blue-500">•</span>
                <span>NFT Market Trends in 2024</span>
              </li>
            </ul>
            <a href="#" className="inline-block mt-6 text-xs text-blue-400 hover:underline">Read More ›</a>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex flex-col items-center">
            <div className="w-full space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm p-2 bg-slate-800/40 rounded-lg">
                    <div className="w-5 h-5 bg-cyan-500 rounded-full"></div> <span>Solana <span className="text-xs text-slate-500">SOL</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm p-2 bg-slate-800/40 rounded-lg">
                    <div className="w-5 h-5 bg-pink-500 rounded-full"></div> <span>Polkadot <span className="text-xs text-slate-500">DOT</span></span>
                </div>
            </div>
            
            <div className="w-full h-px bg-slate-800 mb-6"></div>

            <h2 className="w-full text-left font-semibold mb-4 text-sm">Fear & Greed Index</h2>
            
            <div className="relative w-48 h-24 overflow-hidden">
              <div className="absolute inset-0 rounded-t-full border-[12px] border-slate-800"></div>
              <div className="absolute inset-0 rounded-t-full border-[12px] border-transparent border-l-orange-500 border-t-yellow-500 rotate-[45deg]"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <span className="text-3xl font-bold block">56</span>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Neutral</span>
              </div>
            </div>
            <div className="flex justify-between w-full mt-2 text-[10px] text-slate-500">
                <span>FEAR</span>
                <span>GREED</span>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
}
