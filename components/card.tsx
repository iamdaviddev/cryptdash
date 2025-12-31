import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

interface CardProps {
  title: string;
  amount: string;
  percent: string;
}

export function Card({ title, amount, percent }: CardProps) {

  const percentValue = parseFloat(percent);
  const isPositive = percentValue >= 0;

  return (
    <div className="bg-blue-900/40 border border-blue-800 p-5 rounded-xl">
      <p className="text-xs text-blue-200 mb-2">{title}</p>
      
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{amount}</span>
        
        <div className={`flex items-center gap-1 text-xs font-medium ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}>
          {isPositive ? (
            <CaretUpOutlined />
          ) : (
            <CaretDownOutlined />
          )}
          <span>{Math.abs(percentValue)}%</span>
        </div>
      </div>
    </div>
  );
}