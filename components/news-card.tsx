export function Card() {
  return (
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
  )
}