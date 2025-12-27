// src/components/Dashboard.jsx
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Gemini SDK
import InputSection from './InputSection';
import ResultsView from './ResultsView';
import Sidebar from './Sidebar';
import { Loader2 } from 'lucide-react';

// Initialize Gemini (Ensure VITE_GEMINI_API_KEY is in your Vercel Environment Variables)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function Dashboard({ onStoreSettings, storeConfig }) { // Accept storeConfig
    const [status, setStatus] = useState('idle');
    const [loadingText, setLoadingText] = useState('Initializing AI...');
    const [scannedImage, setScannedImage] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null); // New state for real errors

    const handleScan = async (imageFileBase64, manualProductName) => {
        setScannedImage(imageFileBase64);
        setStatus('scanning');
        setErrorMsg(null);

        if (manualProductName) {
            setLoadingText(`Searching prices for "${manualProductName}"...`);
        } else {
            setLoadingText('Identifying Product & Analyzing Prices...');
        }

        try {
            // 1. Prepare Image for Gemini
            // Strip the "data:image/jpeg;base64," part
            const base64Data = imageFileBase64.split(',')[1] || imageFileBase64;

            const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

            // 2. The Smart Prompt
            // We ask Gemini to act as the scanner AND the pricer.
            const prompt = `
                You are a retail pricing expert. Analyze this product image.
                ${manualProductName ? `The user says this is: "${manualProductName}".` : ''}
                
                Task:
                1. Identify the exact product (Brand, Name, Size/Variant).
                2. Estimate its current market price in India (in INR ₹).
                3. Act as 5 different online competitors (like Amazon, Flipkart, Blinkit, etc.) and give their likely prices.
                
                Return ONLY a valid JSON object with this exact structure:
                {
                    "name": "Product Name",
                    "category": "Category",
                    "estimated_mrp": 250,
                    "competitors": [
                        { "name": "Amazon", "price": 240 },
                        { "name": "Flipkart", "price": 245 },
                        { "name": "Local Store", "price": 260 }
                    ],
                    "pricing_strategy": "Brief advice on how to price this item."
                }
            `;

            const result = await model.generateContent([
                prompt,
                { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
            ]);

            const responseText = await result.response.text();

            // 3. Clean and Parse JSON
            const cleanJson = responseText.replace(/```json|```/g, '').trim();
            const data = JSON.parse(cleanJson);

            console.log("AI Result:", data);
            setResultData(data);
            setStatus('results');

        } catch (error) {
            console.error("Scan failed:", error);
            // This FIXES the "Check Console" error by showing the real message
            setErrorMsg(error.message || "Failed to identify product");

            // Show error state in UI
            setLoadingText('Scan Failed');

            // Wait 5 seconds so user can read the error, then reset
            setTimeout(() => {
                setStatus('idle');
                setErrorMsg(null);
            }, 5000);
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setScannedImage(null);
        setResultData(null);
        setErrorMsg(null);
    };

    return (
        <div className="flex gap-6 items-start w-full">
            <div className="flex-1 flex flex-col items-center w-full">

                {status === 'idle' && (
                    <InputSection onScan={handleScan} />
                )}

                {status === 'scanning' && (
                    <div className="flex flex-col items-center justify-center h-[50vh] w-full max-w-2xl bg-surface rounded-2xl shadow-card border border-ui/5 mt-0">
                        {errorMsg ? (
                            // Error State UI
                            <div className="text-center p-6 text-red-500">
                                <h2 className="text-xl font-bold mb-2">Error</h2>
                                <p>{errorMsg}</p>
                            </div>
                        ) : (
                            // Loading State UI
                            <>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse"></div>
                                    <Loader2 className="w-16 h-16 text-accent animate-spin relative z-10" />
                                </div>
                                <h2 className="mt-8 text-2xl font-bold text-heading animate-pulse">{loadingText}</h2>
                            </>
                        )}
                    </div>
                )}

                {status === 'results' && resultData && (
                    <ResultsView
                        onReset={handleReset}
                        scannedImage={scannedImage}
                        data={resultData}
                        storeConfig={storeConfig} // Pass store settings if you have them
                    />
                )}
            </div>

            <Sidebar onSettings={onStoreSettings} />
        </div>
    );
}