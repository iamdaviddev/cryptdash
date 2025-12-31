import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

interface CryptoTableProps {
  coins: Coin[];
}

export function CryptoTable({ coins }: CryptoTableProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
      <h2 className="font-semibold mb-6">Top Cryptocurrencies</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-400 border-b border-slate-800">
            <tr>
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium text-right">Price</th>
              <th className="pb-3 font-medium text-right">24h Change</th>
              <th className="pb-3 font-medium text-right px-2">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {coins.map((coin) => {
              const isPositive = coin.price_change_percentage_24h >= 0;

              return (
                <tr key={coin.id} className="hover:bg-slate-800/30 transition group">
                  <td className="py-4 flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                    <span className="font-medium">
                      {coin.name} 
                      <span className="text-slate-500 text-xs ml-1 font-mono uppercase">
                        {coin.symbol}
                      </span>
                    </span>
                  </td>
                  
                  <td className="py-4 text-right font-mono">
                    ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  <td className={`py-4 text-right font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    <div className="flex items-center justify-end gap-1">
                      {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </td>

                  <td className="py-4 text-right text-slate-400 font-mono">
                    ${(coin.market_cap / 1e9).toFixed(2)}B
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="mt-4 text-xs text-blue-400 hover:underline">View More ›</button>
    </div>
  );
}