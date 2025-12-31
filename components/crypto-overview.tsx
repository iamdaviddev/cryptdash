'use client';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  ScriptableContext,
  Title,
  Tooltip
} from 'chart.js';
import { useRef } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

export function MarketOverviewChart({ dataRaw }: { dataRaw: any[] }) {
  const chartRef = useRef<any>(null);

  const chartData = {
    labels: dataRaw.map(item => new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
    datasets: [
      {
        label: 'Price',
        data: dataRaw.map(item => parseFloat(item.priceUsd)),
        fill: true,
        // Criando o gradiente roxo do Figma
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(124, 58, 237, 0.2)'); // Roxo claro
          gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');   // Transparente
          return gradient;
        },
        borderColor: '#7C3AED', // Roxo principal
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#7C3AED',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
        tension: 0.4, // Deixa a linha curvada igual ao design
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: '#1e293b',
        titleColor: '#94a3b8',
        bodyColor: '#fff',
        padding: 12,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 6 }
      },
      y: {
        position: 'right' as const, // Preço na direita como no Figma
        grid: { color: 'rgba(226, 232, 240, 0.5)' },
        ticks: {
          callback: (value: any) => '$' + value.toLocaleString()
        }
      }
    }
  };

  return (
    <div className="h-[300px] w-full">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
}