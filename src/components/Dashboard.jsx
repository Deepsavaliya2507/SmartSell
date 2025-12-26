// src/components/Dashboard.jsx
import { useState } from 'react';
import InputSection from './InputSection';
import ResultsView from './ResultsView';
import Sidebar from './Sidebar';
import { Loader2 } from 'lucide-react';

// ADDED PROP: onStoreSettings
export default function Dashboard({ onStoreSettings }) {
    const [status, setStatus] = useState('idle');
    const [loadingText, setLoadingText] = useState('Initializing AI...');
    const [scannedImage, setScannedImage] = useState(null);

    const handleScan = (imageFile) => {
        setScannedImage(imageFile);
        setStatus('scanning');

        setTimeout(() => setLoadingText('Identifying Product...'), 1000);
        setTimeout(() => setLoadingText('Searching Market Prices...'), 2500);
        setTimeout(() => setLoadingText('Calculating Profit Strategy...'), 4000);
        setTimeout(() => setStatus('results'), 5000);
    };

    const handleReset = () => {
        setStatus('idle');
        setScannedImage(null);
    };

    return (
        <div className="flex gap-6 items-start w-full">

            {/* LEFT: MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col items-center w-full">
                {status === 'idle' && (
                    <InputSection onScan={handleScan} />
                )}

                {status === 'scanning' && (
                    <div className="flex flex-col items-center justify-center h-[50vh] w-full max-w-2xl bg-surface rounded-2xl shadow-card border border-ui/5 mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse"></div>
                            <Loader2 className="w-16 h-16 text-accent animate-spin relative z-10" />
                        </div>
                        <h2 className="mt-8 text-2xl font-bold text-heading animate-pulse">{loadingText}</h2>
                        {scannedImage && (
                            <img src={scannedImage} alt="Scanning..." className="w-16 h-16 rounded-lg mt-4 object-cover opacity-50 border border-ui/10" />
                        )}
                    </div>
                )}

                {status === 'results' && (
                    <ResultsView onReset={handleReset} scannedImage={scannedImage} />
                )}
            </div>

            {/* RIGHT: SIDEBAR */}
            {/* PASSED THE PROP HERE */}
            <Sidebar onSettings={onStoreSettings} />

        </div>
    );
}