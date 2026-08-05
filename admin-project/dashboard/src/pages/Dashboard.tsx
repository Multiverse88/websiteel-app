export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-[32px]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Overview</h2>
          <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Key metrics and recent activity across your legal ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 font-semibold text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span> Export Report
          </button>
          <button className="bg-[#6f0000] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#7A0101] transition-colors shadow-sm text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span> New Campaign
          </button>
        </div>
      </div>

      {/* Bento Grid: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] flex flex-col justify-between group hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Total Articles</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">description</span>
            </div>
          </div>
          <div>
            <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">142</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-emerald-600 flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] flex flex-col justify-between group hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Total Subscribers</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
          <div>
            <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">8,204</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-emerald-600 flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span> 5.4%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] flex flex-col justify-between group hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Campaigns Sent</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">campaign</span>
            </div>
          </div>
          <div>
            <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">12</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-gray-500 flex items-center"><span className="material-symbols-outlined text-[14px]">horizontal_rule</span> 0%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] flex flex-col justify-between group hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Active Pages</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">web</span>
            </div>
          </div>
          <div>
            <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">5</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-red-600 flex items-center"><span className="material-symbols-outlined text-[14px]">arrow_downward</span> 1</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        {/* Chart Panel (Spans 8 cols on large screens) */}
        <div className="lg:col-span-8 bg-white rounded-[32px] border border-gray-200 p-6 md:p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[18px] leading-[24px] font-semibold font-sans text-gray-900">Subscriber Growth</h3>
            <select className="bg-[#f8f9fa] border border-gray-200 font-semibold text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#6f0000]/20 focus:border-[#6f0000]/50 outline-none">
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
          {/* Pseudo Chart Area */}
          <div className="flex-1 w-full min-h-[300px] relative mt-4 border-b border-l border-gray-200/50 pl-2 pb-2 flex items-end">
            {/* Y-axis labels */}
            <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-[11px] font-semibold tracking-widest font-mono text-gray-500 pb-6">
              <span>10k</span>
              <span>7.5k</span>
              <span>5k</span>
              <span>2.5k</span>
              <span>0</span>
            </div>
            {/* Grid lines */}
            <div className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-none pb-6 pl-2">
              <div className="w-full border-b border-gray-200/30 border-dashed h-0"></div>
              <div className="w-full border-b border-gray-200/30 border-dashed h-0"></div>
              <div className="w-full border-b border-gray-200/30 border-dashed h-0"></div>
              <div className="w-full border-b border-gray-200/30 border-dashed h-0"></div>
              <div className="w-full h-0"></div>
            </div>
            {/* Bars */}
            <div className="w-full h-full flex items-end justify-between px-2 pb-6 gap-2 relative z-10 pt-8">
              <div className="w-full bg-[#e1e3e4] hover:bg-[#6f0000]/20 rounded-t-sm transition-colors relative group" style={{ height: '45%' }}>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">4,500</div>
              </div>
              <div className="w-full bg-[#e1e3e4] hover:bg-[#6f0000]/20 rounded-t-sm transition-colors relative group" style={{ height: '52%' }}>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">5,200</div>
              </div>
              <div className="w-full bg-[#e1e3e4] hover:bg-[#6f0000]/20 rounded-t-sm transition-colors relative group" style={{ height: '48%' }}></div>
              <div className="w-full bg-[#e1e3e4] hover:bg-[#6f0000]/20 rounded-t-sm transition-colors relative group" style={{ height: '60%' }}></div>
              <div className="w-full bg-[#6f0000]/60 hover:bg-[#6f0000]/80 rounded-t-sm transition-colors relative group" style={{ height: '75%' }}>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">7,500</div>
              </div>
              <div className="w-full bg-[#6f0000] rounded-t-sm transition-colors shadow-[0_0_12px_rgba(153,2,2,0.3)] relative group" style={{ height: '82%' }}>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity">8,204</div>
              </div>
            </div>
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-2 w-full flex justify-between text-[11px] font-semibold tracking-widest font-mono text-gray-500 pr-2 pt-2">
              <span className="w-full text-center">Jan</span>
              <span className="w-full text-center">Feb</span>
              <span className="w-full text-center">Mar</span>
              <span className="w-full text-center">Apr</span>
              <span className="w-full text-center">May</span>
              <span className="w-full text-center text-[#6f0000] font-bold">Jun</span>
            </div>
          </div>
        </div>

        {/* Recent Activities Panel (Spans 4 cols on large screens) */}
        <div className="lg:col-span-4 bg-white rounded-[32px] border border-gray-200 p-6 md:p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[18px] leading-[24px] font-semibold font-sans text-gray-900">Recent Activity</h3>
            <button className="text-[11px] font-semibold tracking-widest font-mono text-[#6f0000] hover:text-[#990202] uppercase">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Activity Item 1 */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-gray-200 z-0"></div>
              <div className="w-10 h-10 rounded-full bg-[#edeeef] flex items-center justify-center flex-shrink-0 z-10 border border-white">
                <span className="material-symbols-outlined text-gray-500 text-[20px]">description</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">New article published</p>
                <p className="text-sm text-gray-500 mt-0.5">"Corporate Compliance 2024 Guidelines"</p>
                <span className="text-xs text-gray-400 block mt-1">2 hours ago</span>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-gray-200 z-0"></div>
              <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 z-10 border border-white">
                <span className="material-symbols-outlined text-[#6f0000] text-[20px]">campaign</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Campaign sent successfully</p>
                <p className="text-sm text-gray-500 mt-0.5">"Q3 Legal Updates Newsletter" sent to 7,540 subscribers.</p>
                <span className="text-xs text-gray-400 block mt-1">Yesterday, 14:30</span>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[19px] top-10 bottom-[-24px] w-px bg-gray-200 z-0"></div>
              <div className="w-10 h-10 rounded-full bg-[#edeeef] flex items-center justify-center flex-shrink-0 z-10 border border-white">
                <span className="material-symbols-outlined text-emerald-600 text-[20px]">person_add</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Subscriber milestone reached</p>
                <p className="text-sm text-gray-500 mt-0.5">Crossed 8,000 total active subscribers.</p>
                <span className="text-xs text-gray-400 block mt-1">Oct 12, 09:15</span>
              </div>
            </div>

            {/* Activity Item 4 */}
            <div className="flex gap-4 relative">
              <div className="w-10 h-10 rounded-full bg-[#edeeef] flex items-center justify-center flex-shrink-0 z-10 border border-white">
                <span className="material-symbols-outlined text-amber-500 text-[20px]">edit</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Landing page updated</p>
                <p className="text-sm text-gray-500 mt-0.5">"Consultation Booking" layout modified.</p>
                <span className="text-xs text-gray-400 block mt-1">Oct 10, 16:45</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
