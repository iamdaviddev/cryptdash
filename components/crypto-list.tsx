interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

interface CoinSidebarListProps {
  coins: Coin[];
}

export function CryptoList({ coins }: CoinSidebarListProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-slate-400 mb-2">Trending Assets</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {coins.map((coin) => (
          <div 
            key={coin.id} 
            className="flex items-center justify-between gap-3 text-sm p-2 bg-slate-800/40 border border-slate-700/50 rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img 
                src={coin.image} 
                alt={coin.name} 
                className="w-5 h-5 rounded-full" 
              />
              <span className="font-medium text-slate-200">
                {coin.name} 
                <span className="text-[10px] text-slate-500 ml-2 uppercase font-mono">
                  {coin.symbol}
                </span>
              </span>
            </div>
            
            <span className="text-slate-600 text-[10px]">›</span>
          </div>
        ))}
      </div>

      <button className="mt-2 text-xs text-blue-400 hover:underline self-start">
        Ver todas as 20 moedas ›
      </button>
    </div>
  );
}