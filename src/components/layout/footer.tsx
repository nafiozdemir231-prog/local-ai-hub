export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="https://ko-fi.com/vincespeed"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <svg className="h-5 w-5 transition-transform group-hover:rotate-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.922 11.166l-2.447-4.234c-.44-.761-1.354-1.073-2.178-.751l-5.293 2.251c-.336.143-.71.143-1.047 0l-5.293-2.251c-.825-.351-1.738-.01-2.179.751L.63 11.166c-.44.762-.35 1.736.227 2.403l4.27 4.903c.335.385.81.598 1.304.598h.001c.286 0 .567-.075.816-.218l5.757-3.328 5.758 3.328c.248.142.529.218.815.218h.001c.494 0 .969-.213 1.304-.598l4.27-4.903c.577-.667.667-1.641.227-2.403zM9.816 18.013l-3.909-4.493 5.094-2.162v6.655zm10.288-4.493l-3.909 4.493v-6.655l5.094 2.162z"/>
          </svg>
          Buy Me a Coffee
          <span className="absolute -top-1 -right-1 flex h-3 w-3 animate-ping">
            <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex h-full w-full rounded-full bg-yellow-400"></span>
          </span>
        </a>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Local AI Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
