// src/components/Auth.jsx
import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export default function Auth({ onLogin }) {
    const [view, setView] = useState('login'); // 'login' | 'register'
    const [isLoading, setIsLoading] = useState(false);

    // Data States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch User Details from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            let userName = "User";
            if (userDoc.exists()) {
                const userData = userDoc.data();
                userName = userData.name || "User";

                // Update last login
                try {
                    await updateDoc(userDocRef, {
                        lastLogin: new Date().toISOString()
                    });
                } catch (updateErr) {
                    console.error("Failed to update last login", updateErr);
                }
            }

            onLogin({ name: userName, email: user.email, uid: user.uid });
        } catch (err) {
            console.error(err);
            setError("Failed to sign in. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });

            onLogin({ name: name, email: email, uid: user.uid });
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to create account.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative">

                {/* Header Banner */}
                <div className="h-32 bg-[#000080] relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <span className="text-2xl font-bold text-[#000080]">S</span>
                        </div>
                        <h2 className="text-white font-bold text-lg tracking-wide">SmartSell</h2>
                    </div>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* --- VIEW 1: LOGIN --- */}
                    {view === 'login' && (
                        <form onSubmit={handleSignIn} className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">Welcome Back</h2>
                            <p className="text-gray-500 text-center mb-8 text-sm">Enter your credentials to access your dashboard.</p>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#000080] transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all text-gray-900"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#000080] transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] transition-all text-gray-900"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-2 mb-6">
                                <button type="button" className="text-xs font-medium text-[#000080] hover:underline">Forgot Password?</button>
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full bg-[#000080] text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                                {!isLoading && <ArrowRight className="w-4 h-4" />}
                            </button>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500">
                                    Don't have an account?{' '}
                                    <button type="button" onClick={() => setView('register')} className="text-[#000080] font-bold hover:underline">
                                        Create Account
                                    </button>
                                </p>
                            </div>
                        </form>
                    )}

                    {/* --- VIEW 2: REGISTER --- */}
                    {view === 'register' && (
                        <form onSubmit={handleRegister} className="animate-fade-in">
                            <button
                                type="button"
                                onClick={() => setView('login')}
                                className="flex items-center text-gray-500 text-xs font-bold mb-6 hover:text-[#000080] transition"
                            >
                                <ArrowLeft className="w-3 h-3 mr-1" /> Back to Login
                            </button>

                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
                            <p className="text-gray-500 mb-6 text-sm">Join SmartSell to optimize your pricing.</p>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#000080] transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#000080] transition-all text-gray-900"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#000080] transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#000080] transition-all text-gray-900"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-[#000080] transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="Create Password"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#000080] transition-all text-gray-900"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full bg-[#000080] text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg mt-8"
                            >
                                {isLoading ? 'Processing...' : 'Continue'}
                            </button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}
