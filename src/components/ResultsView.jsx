// src/components/ResultsView.jsx
import { ArrowLeft, TrendingUp, CheckCircle, ShoppingBag } from 'lucide-react';

export default function ResultsView({ onReset, scannedImage, data }) {
    if (!data) return null;

    return (
        // ADDED 'mt-8' HERE FOR SPACING AFTER HEADER
        <div className="w-full max-w-5xl animate-fade-in-up pb-20">

            {/* HEADER SECTION */}
            <div className="flex items-center justify-between mb-8">

                {/* IMPROVED BACK BUTTON */}
                <button
                    onClick={onReset}
                    className="group flex items-center gap-3 px-5 py-3 bg-surface rounded-xl shadow-sm border border-ui/10 hover:border-accent hover:shadow-md transition-all duration-200"
                >
                    <div className="w-8 h-8 rounded-full bg-bg flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors text-subtext">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-heading text-sm group-hover:text-accent">Scan New Item</span>
                </button>

                {/* STATUS BADGE */}
                <span className="hidden md:inline-block text-xs font-bold text-subtext uppercase tracking-widest border border-ui/10 px-3 py-1 rounded-full bg-surface">
                    Analysis Complete
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Product Image & Details */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-surface p-6 rounded-2xl shadow-card border border-ui/5">
                        {/* Image Preview */}
                        <div className="aspect-square bg-bg rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-ui/5 relative group">
                            {scannedImage ? (
                                <img src={scannedImage} alt="Product" className="w-full h-full object-cover" />
                            ) : (
                                <ShoppingBag className="w-16 h-16 text-subtext/30" />
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="inline-block px-3 py-1 bg-bg border border-ui/10 text-subtext text-xs font-bold rounded-full">
                                {data.category}
                            </div>
                            <h2 className="text-xl font-bold text-heading leading-snug">{data.name}</h2>
                        </div>
                    </div>
                </div>

                {/* Right Col: The Pricing Intelligence */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 1. HERO CARD */}
                    <div className="bg-surface p-8 rounded-2xl shadow-card border-l-8 border-accent flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-subtext font-bold text-sm uppercase tracking-wider mb-2">AI Recommended Price</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-5xl font-extrabold text-heading">₹{data.recPrice.toLocaleString()}</span>
                                <span className="text-green-600 text-sm font-bold flex items-center bg-green-50 px-2 py-1 rounded border border-green-100">
                                    <TrendingUp className="w-3 h-3 mr-1" /> +6% Margin
                                </span>
                            </div>
                        </div>

                        <button className="relative z-10 bg-accent text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg shadow-accent/20 active:scale-95">
                            Set Price
                        </button>

                        {/* Decorative background blob */}
                        <div className="absolute right-0 top-0 w-64 h-64 bg-bg rounded-full -mr-16 -mt-16 z-0 opacity-50"></div>
                    </div>

                    {/* 2. STRATEGY CARD */}
                    <div className="bg-accent text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>

                        <div className="flex gap-5 relative z-10">
                            <div className="bg-white/10 p-3 rounded-xl h-fit backdrop-blur-sm border border-white/10">
                                <CheckCircle className="w-6 h-6 text-blue-200" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2 text-white">Pricing Strategy</h3>
                                <p className="text-blue-100 leading-relaxed text-sm md:text-base opacity-90">
                                    Online availability is low for this variant. Since you are an offline store, customers will pay a premium for <strong>instant gratification</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3. COMPETITOR TABLE */}
                    <div className="bg-surface rounded-2xl shadow-card border border-ui/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-ui/5 bg-bg/50 flex justify-between items-center">
                            <h3 className="font-bold text-heading text-sm">Real-Time Market Data</h3>
                            <span className="text-xs text-subtext">Live from Google Shopping</span>
                        </div>
                        <div className="divide-y divide-ui/5">
                            {data.competitors.map((item, index) => (
                                <div key={index} className="flex justify-between items-center px-6 py-4 hover:bg-bg/30 transition">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-bg border border-ui/10 flex items-center justify-center font-bold text-xs text-subtext">
                                            {item.logo}
                                        </div>
                                        <span className="font-semibold text-heading text-sm">{item.name}</span>
                                    </div>
                                    <span className="font-mono text-heading font-medium">{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}