import { NewsItem } from "@/types/news";

interface NewsCardProps {
  news: NewsItem[];
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
      <h2 className="font-semibold mb-4">Latest News</h2>
      
      <ul className="space-y-4 text-sm">
        {news.length > 0 ? (
          news.slice(0, 5).map((item) => (
            <li key={item.id} className="group">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-3 text-slate-300 hover:text-blue-400 cursor-pointer transition"
              >
                <span className="text-blue-500 group-hover:scale-125 transition-transform">•</span>
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-[10px] text-slate-500 uppercase mt-1">{item.source.title}</span>
                </div>
              </a>
            </li>
          ))
        ) : (
          <p className="text-slate-500">Carregando notícias...</p>
        )}
      </ul>
      
      <a href="https://cryptopanic.com" target="_blank" className="inline-block mt-6 text-xs text-blue-400 hover:underline">
        Read More on CryptoPanic ›
      </a>
    </div>
  );
}