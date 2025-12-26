import React from 'react';
import { User } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-prussian-blue">
                    Retail Radar
                </div>
            </div>
            <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                <User className="w-6 h-6 text-slate-700" />
            </div>
        </nav>
    );
}
