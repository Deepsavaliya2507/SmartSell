// src/components/Dashboard.jsx
import { useState } from 'react';
import axios from 'axios';
import InputSection from './InputSection';
import ResultsView from './ResultsView';
import Sidebar from './Sidebar';
import { Loader2 } from 'lucide-react';

export default function Dashboard({ onStoreSettings }) {
    const [status, setStatus] = useState('idle'); // 'idle' | 'scanning' | 'results'
    const [loadingText, setLoadingText] = useState('Initializing AI...');
    const [scannedImage, setScannedImage] = useState(null);
    const [resultData, setResultData] = useState(null);

    // Helper to convert Base64 to Blob
    const dataURLtoBlob = (dataurl) => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) { u8arr[n] = bstr.charCodeAt(n); }
        return new Blob([u8arr], { type: mime });
    }

    // UPDATED: Now accepts manualProductName as the second argument
    const handleScan = async (imageFileBase64, manualProductName) => {
        setScannedImage(imageFileBase64);
        setStatus('scanning');

        // Custom loading text if name is provided
        if (manualProductName) {
            setLoadingText(`Searching prices for "${manualProductName}"...`);
        } else {
            setLoadingText('Uploading & Identifying...');
        }

        try {
            const blob = dataURLtoBlob(imageFileBase64);
            const formData = new FormData();
            formData.append('image', blob, 'scan.jpg');

            // NEW: Append the manual name if the user typed it
            if (manualProductName) {
                formData.append('productName', manualProductName);
            }

            // Make sure your backend is running on port 5000
            const response = await axios.post('http://localhost:5000/api/scan', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log("API Response:", response.data);
            setResultData(response.data);
            setStatus('results');

        } catch (error) {
            console.error("Scan failed:", error);
            setLoadingText('Error: Check Console');
            // If error, go back to idle after 3 seconds so user can try again
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setScannedImage(null);
        setResultData(null);
    };

    return (
        <div className="flex gap-6 items-start w-full">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center w-full">

                {/* 1. Show Input Section when Idle */}
                {status === 'idle' && (
                    <InputSection onScan={handleScan} />
                )}

                {/* 2. Show Loader when Scanning */}
                {status === 'scanning' && (
                    <div className="flex flex-col items-center justify-center h-[50vh] w-full max-w-2xl bg-surface rounded-2xl shadow-card border border-ui/5 mt-0">
                        <div className="relative">
                            <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse"></div>
                            <Loader2 className="w-16 h-16 text-accent animate-spin relative z-10" />
                        </div>
                        <h2 className="mt-8 text-2xl font-bold text-heading animate-pulse">{loadingText}</h2>
                    </div>
                )}

                {/* 3. Show Results when Data is Ready */}
                {status === 'results' && resultData && (
                    <ResultsView
                        onReset={handleReset}
                        scannedImage={scannedImage}
                        data={resultData}
                    />
                )}
            </div>

            {/* Sidebar */}
            <Sidebar onSettings={onStoreSettings} />
        </div>
    );
}