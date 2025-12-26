// src/components/ProfileMenu.jsx
import { Settings, HelpCircle, LogOut, User } from 'lucide-react';

// ADD 'user' TO PROPS
export default function ProfileMenu({ user, isOpen, onClose, onSettings, onHelp, onLogout }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose}></div>

            <div className="absolute right-0 mt-2 w-64 bg-surface rounded-xl shadow-lg border border-ui/10 py-2 z-50 animate-fade-in">

                <div className="px-4 py-3 border-b border-ui/10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-bg rounded-full flex items-center justify-center border border-ui/10">
                        <User className="w-5 h-5 text-accent" />
                    </div>
                    <div className="overflow-hidden">
                        {/* USE DYNAMIC DATA HERE */}
                        <h4 className="font-bold text-heading text-sm truncate">{user?.name || "User"}</h4>
                        <p className="text-subtext text-xs truncate">{user?.email || "email@example.com"}</p>
                    </div>
                </div>

                <div className="py-2">
                    {/* ... buttons ... */}
                    <button
                        onClick={() => { onSettings(); onClose(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-heading hover:bg-bg hover:text-accent transition-colors"
                    >
                        <Settings className="w-4 h-4" />
                        Account Settings
                    </button>

                    <button
                        onClick={() => { onHelp(); onClose(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-heading hover:bg-bg hover:text-accent transition-colors"
                    >
                        <HelpCircle className="w-4 h-4" />
                        Help & Support
                    </button>
                </div>

                <div className="border-t border-ui/10 pt-2">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

            </div>
        </>
    );
}