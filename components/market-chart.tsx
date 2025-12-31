'use client';

import { getMarketChart } from '@/services/api';
import { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';

export function MarketChart() {
  const [data, setData] = useState([]);
  const [days, setDays] = useState('1'); // '1' = 24h, '7' = 1w, '30' = 1m
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const chartData = await getMarketChart('bitcoin', days);
        setData(chartData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [days]);

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-white">Market Overview (BTC)</h2>
        <div className="flex gap-4 text-xs font-medium text-slate-400">
          {[
            { label: '24H', val: '1' },
            { label: '1W', val: '7' },
            { label: '1M', val: '30' },
            { label: '1Y', val: '365' },
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => setDays(item.val)}
              className={`pb-1 transition-colors ${
                days === item.val ? 'text-blue-400 border-b-2 border-blue-400' : 'hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-48 w-full">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center text-slate-500 text-sm">
            Carregando gráfico...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#3b82f6' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex gap-6 mt-4 text-xs">
        <p>Preço atual: <span className="text-white font-mono">
          ${data[data.length - 1]?.price.toLocaleString()}
        </span></p>
        <p>Fonte: <span className="text-slate-500">CoinGecko API</span></p>
      </div>
    </div>
  );
}