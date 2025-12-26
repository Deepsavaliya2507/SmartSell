import React from 'react';

export default function AIStrategy({ strategy }) {
    return (
        <div className="bg-navy-blue rounded-lg shadow-sm p-6 text-white mt-6">
            <h3 className="font-bold text-lg mb-2">AI Strategy</h3>
            <p className="text-white/90 leading-relaxed">
                {strategy || "Sell slightly higher than Amazon because you offer instant availability. We added a 4% convenience markup."}
            </p>
        </div>
    );
}
