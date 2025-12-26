import React from 'react';

export default function PriceHero({ price }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border-l-8 border-navy-blue p-6 flex flex-col justify-center h-full">
            <span className="text-slate-500 font-medium text-sm uppercase tracking-wider mb-1">Recommended Price</span>
            <span className="text-4xl font-bold text-navy-blue">₹ {price ? price.toLocaleString() : "0"}</span>
        </div>
    );
}
