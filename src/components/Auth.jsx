// src/components/Auth.jsx
import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';

export default function Auth({ onLogin }) {
    const [view, setView] = useState('login');
    const [isLoading, setIsLoading] = useState(false);

    // FIXED: Added 'name' state to store the input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // For login, we use the name if available, or default to "Demo User"
            onLogin({ name: "Demo User", email: email || "user@example.com" });
        }, 1500);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setView('otp');
        }, 1000);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // FIXED: Now using the real 'name' state instead of "New User"
            onLogin({ name: name, email: email });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl border border-ui/10 overflow-hidden relative">

                {/* Header Banner */}
                <div className="h-32 bg-accent relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
                    <div className="relative z-10 text-center">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <span className="text-2xl font-bold text-accent">S</span>
                        </div>
                        <h2 className="text-white font-bold text-lg tracking-wide">SmartSell</h2>
                    </div>
                </div>

                <div className="p-8">

                    {/* VIEW 1: LOGIN */}
                    {view === 'login' && (
                        <form onSubmit={handleSignIn} className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-heading mb-1 text-center">Welcome Back</h2>
                            <p className="text-subtext text-center mb-8 text-sm">Enter your credentials to access your dashboard.</p>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <Mail className="w-5 h-5 text-subtext absolute left-3 top-3.5 group-focus-within:text-accent transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-3 bg-bg border border-ui/10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="w-5 h-5 text-subtext absolute left-3 top-3.5 group-focus-within:text-accent transition-colors" />
                                    <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 bg-bg border border-ui/10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" required />
                                </div>
                            </div>

                            <div className="flex justify-end mt-2 mb-6">
                                <button type="button" className="text-xs font-medium text-accent hover:underline">Forgot Password?</button>
                            </div>

                            <button disabled={isLoading} className="w-full bg-accent text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-accent/20 flex items-center justify-center gap-2">
                                {isLoading ? 'Signing In...' : 'Sign In'}
                                {!isLoading && <ArrowRight className="w-4 h-4" />}
                            </button>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-subtext">
                                    Don't have an account?{' '}
                                    <button type="button" onClick={() => setView('register')} className="text-accent font-bold hover:underline">Create Account</button>
                                </p>
                            </div>
                        </form>
                    )}

                    {/* VIEW 2: REGISTER */}
                    {view === 'register' && (
                        <form onSubmit={handleRegister} className="animate-fade-in">
                            <button type="button" onClick={() => setView('login')} className="flex items-center text-subtext text-xs font-bold mb-6 hover:text-accent transition">
                                <ArrowLeft className="w-3 h-3 mr-1" /> Back to Login
                            </button>

                            <h2 className="text-2xl font-bold text-heading mb-1">Create Account</h2>
                            <p className="text-subtext mb-6 text-sm">Join SmartSell to optimize your pricing.</p>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <User className="w-5 h-5 text-subtext absolute left-3 top-3.5 group-focus-within:text-accent transition-colors" />
                                    {/* FIXED: Added value and onChange for name */}
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full pl-10 pr-4 py-3 bg-bg border border-ui/10 rounded-xl outline-none focus:border-accent transition-all"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Mail className="w-5 h-5 text-subtext absolute left-3 top-3.5 group-focus-within:text-accent transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-3 bg-bg border border-ui/10 rounded-xl outline-none focus:border-accent transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="w-5 h-5 text-subtext absolute left-3 top-3.5 group-focus-within:text-accent transition-colors" />
                                    <input type="password" placeholder="Create Password" className="w-full pl-10 pr-4 py-3 bg-bg border border-ui/10 rounded-xl outline-none focus:border-accent transition-all" required />
                                </div>
                            </div>

                            <button disabled={isLoading} className="w-full bg-accent text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-8">
                                {isLoading ? 'Processing...' : 'Continue'}
                            </button>
                        </form>
                    )}

                    {/* VIEW 3: OTP */}
                    {view === 'otp' && (
                        <form onSubmit={handleVerifyOtp} className="animate-fade-in text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6 text-green-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-heading mb-2">Check your inbox</h2>
                            <p className="text-subtext text-sm mb-8">
                                We sent a 4-digit confirmation code to <br />
                                <span className="font-bold text-heading">{email || 'your email'}</span>
                            </p>

                            <div className="flex justify-center gap-3 mb-8">
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        className="w-14 h-14 border-2 border-ui/10 rounded-xl text-center text-2xl font-bold text-heading outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
                                        value={data}
                                        onChange={e => handleOtpChange(e.target, index)}
                                        onFocus={e => e.target.select()}
                                    />
                                ))}
                            </div>

                            <button disabled={isLoading} className="w-full bg-accent text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-accent/20 flex items-center justify-center gap-2">
                                {isLoading ? 'Verifying...' : 'Verify & Access'}
                                {!isLoading && <CheckCircle className="w-4 h-4" />}
                            </button>

                            <button type="button" onClick={() => setOtp(['', '', '', ''])} className="mt-6 text-sm text-subtext hover:text-accent font-medium">
                                Resend Code
                            </button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}