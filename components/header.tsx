
export function Header(){
  return(
    <header className="max-w-6xl mx-auto flex py-4 justify-between items-center mb-8">
      <h1 className="text-slate-300 text-xl font-bold">CryptoDash</h1>
      <nav className="flex items-center gap-6 text-sm">
      <a href="#" className="text-zinc-50 hover:text-blue-400">Market Overview</a>
        <a href="#" className="text-zinc-50 hover:text-blue-400">News</a>
        <div className="h-4 w-px bg-slate-700"></div>
        <button className="text-zinc-50 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition">Sign In</button>
      </nav>
    </header>
  )
}
