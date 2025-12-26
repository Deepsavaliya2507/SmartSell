// src/components/Sidebar.jsx
import { Clock, TrendingUp, Settings, ChevronRight } from 'lucide-react';

// ADDED PROP: onSettings
export default function Sidebar({ onSettings }) {
    const recentScans = [
        { name: "Nike Air Jordan 1", time: "2m ago", profit: "+12%" },
        { name: "Dove Shampoo 650ml", time: "1h ago", profit: "+5%" },
        { name: "Logitech MX Master 3S", time: "3h ago", profit: "+8%" },
        { name: "Nescafe Gold 200g", time: "5h ago", profit: "+4%" },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-80 h-[calc(100vh-140px)] sticky top-28 pr-4">
            <div className="bg-surface rounded-2xl shadow-card border border-ui/5 p-6 h-full flex flex-col justify-between">

                <div className="overflow-y-auto pr-2 custom-scrollbar">
                    {/* Section 1: Daily Stats */}
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-subtext uppercase tracking-wider mb-4">Daily Performance</h3>
                        <div className="bg-bg p-5 rounded-xl border border-ui/5 relative overflow-hidden group hover:border-accent/20 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-green-100 rounded-full">
                                    <TrendingUp className="w-4 h-4 text-green-700" />
                                </div>
                                <span className="text-sm font-medium text-subtext">Est. Extra Profit</span>
                            </div>
                            <p className="text-3xl font-bold text-heading">₹ 4,250</p>
                            <p className="text-xs text-green-600 font-bold mt-1">▲ 15% vs yesterday</p>

                            <div className="absolute -right-4 -bottom-4 opacity-10">
                                <TrendingUp className="w-24 h-24 text-accent" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Recent History */}
                    <div>
                        <h3 className="text-xs font-bold text-subtext uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Recent Scans
                        </h3>
                        <div className="space-y-2">
                            {recentScans.map((item, idx) => (
                                <div key={idx} className="group flex items-center justify-between p-3 rounded-xl hover:bg-bg cursor-pointer transition border border-transparent hover:border-ui/5">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-heading text-sm group-hover:text-accent transition truncate max-w-[140px]">
                                            {item.name}
                                        </span>
                                        <span className="text-xs text-subtext">{item.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                            {item.profit}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-subtext opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section 3: Footer Settings */}
                <div className="pt-6 border-t border-ui/5 mt-auto">
                    <button
                        onClick={onSettings} // CONNECTED THE CLICK HANDLER
                        className="w-full flex items-center justify-between text-subtext hover:text-accent transition text-sm font-medium group bg-bg/50 p-3 rounded-lg hover:bg-bg"
                    >
                        <div className="flex items-center gap-3">
                            <Settings className="w-4 h-4" />
                            <span>Store Settings</span>
                        </div>
                        <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">PRO</span>
                    </button>
                </div>

            </div>
        </aside>
    );
}