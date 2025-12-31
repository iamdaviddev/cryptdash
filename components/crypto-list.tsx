'use client';
import { api } from '@/services/api';
import { CryptoCoin } from '@/types/coincap';
import { useEffect, useState } from 'react';


export default function CryptoList() {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get('/assets');
        setCoins(response.data.data);
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