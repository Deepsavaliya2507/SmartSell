import React from 'react';

export default function MarketTable({ data }) {
    // data expected to be array of { platform, price }
    const rows = data || [
        { platform: "Amazon", price: 4999 },
        { platform: "Flipkart", price: 5100 }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left py-2 text-prussian-blue font-semibold">Platform</th>
                        <th className="text-right py-2 text-prussian-blue font-semibold">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} className="border-b last:border-0 border-gray-100">
                            <td className="py-3 text-slate-600">{row.platform}</td>
                            <td className="py-3 text-right text-slate-600 font-medium">₹ {row.price.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
