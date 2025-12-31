'use client';
import { api } from '@/services/api';
import { CryptoCoin } from '@/types/coincap';
import { useEffect, useState } from 'react';


export default function CryptoList() {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1');
        const transformedCoins = response.data.map((coin: any) => ({
          id: coin.id,
          rank: coin.market_cap_rank.toString(),
          symbol: coin.symbol,
          name: coin.name,
          priceUsd: coin.current_price.toString(),
          changePercent24Hr: coin.price_change_percentage_24h.toString(),
        }));
        setCoins(transformedCoins);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-8">
      {coins.map(coin => (
        <div key={coin.id} className="p-2 border-b border-slate-700">
           {coin.name} - ${parseFloat(coin.priceUsd).toFixed(2)}
        </div>
      ))}
    </div>
  );
}