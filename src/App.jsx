// src/App.jsx
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import ProfileMenu from './components/ProfileMenu';
import Modal from './components/Modal';
import { User, Bell, Moon, Store, Percent, MapPin } from 'lucide-react'; // Added Icons

function App() {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'settings', 'help', 'store-settings', null
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Prevent flash of login page

  const [storeConfig, setStoreConfig] = useState({
    shopName: "My Retail Store",
    margin: 15,
    location: "Mumbai, India"
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('smartsell_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Failed to parse saved user data:', error);
          localStorage.removeItem('smartsell_user');
        }
      }

      // Minimum loading time for smooth UX
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

  // Handle login and save to localStorage
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('smartsell_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to sign out?")) {
      setUser(null);
      setIsProfileOpen(false);
      localStorage.removeItem('smartsell_user');
    }
  };

  // Show loading screen while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-3xl font-bold text-white">S</span>
          </div>
          <p className="text-subtext text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-bg font-sans text-heading">

      {/* --- MODAL 1: STORE SETTINGS (NEW) --- */}
      <Modal
        title="Store Configuration"
        isOpen={activeModal === 'store-settings'}
        onClose={() => setActiveModal(null)}
      >
        <div className="space-y-5">

          {/* Shop Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-subtext uppercase">Shop Name</label>
            <div className="relative">
              <Store className="absolute left-3 top-3 w-5 h-5 text-subtext" />
              {/* === CHANGE THIS INPUT === */}
              <input
                type="text"
                value={storeConfig.shopName}
                onChange={(e) => setStoreConfig({ ...storeConfig, shopName: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-bg border border-ui/10 rounded-lg outline-none focus:border-accent text-sm font-medium"
              />
            </div>
          </div>

          {/* Default Margin Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-subtext uppercase">Default Profit Margin</label>
            <div className="relative">
              <Percent className="absolute left-3 top-3 w-5 h-5 text-subtext" />
              {/* === CHANGE THIS INPUT === */}
              <input
                type="number"
                value={storeConfig.margin}
                onChange={(e) => setStoreConfig({ ...storeConfig, margin: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-2.5 bg-bg border border-ui/10 rounded-lg outline-none focus:border-accent text-sm font-medium"
              />
            </div>
            <p className="text-xs text-subtext">This % is added to online prices automatically.</p>
          </div>

          {/* Location Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-subtext uppercase">Store Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-subtext" />
              {/* === CHANGE THIS INPUT === */}
              <input
                type="text"
                value={storeConfig.location}
                onChange={(e) => setStoreConfig({ ...storeConfig, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-bg border border-ui/10 rounded-lg outline-none focus:border-accent text-sm font-medium"
              />
            </div>
          </div>

          {/* === OPTIONAL: Add a Save Button === */}
          <button
            onClick={() => setActiveModal(null)}
            className="w-full bg-accent text-white py-2 rounded-lg font-bold hover:bg-accent/90 transition-colors"
          >
            Save Changes
          </button>

        </div>
      </Modal>

      {/* --- MODAL 2: ACCOUNT SETTINGS --- */}
      <Modal title="Account Settings" isOpen={activeModal === 'settings'} onClose={() => setActiveModal(null)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-bg rounded-lg border border-ui/5">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-accent" />
              <div>
                <p className="font-bold text-sm">Dark Mode</p>
                <p className="text-xs text-subtext">Switch to dark theme</p>
              </div>
            </div>
            <div className="w-10 h-5 bg-ui/20 rounded-full relative cursor-pointer">
              <div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
            </div>
          </div>
        </div>
      </Modal>

      {/* --- MODAL 3: HELP --- */}
      <Modal title="Help & Support" isOpen={activeModal === 'help'} onClose={() => setActiveModal(null)}>
        <div className="text-center space-y-4">
          <p className="text-subtext text-sm">Contact our 24/7 support team.</p>
          <textarea className="w-full p-3 rounded-lg border border-ui/20 bg-bg" rows="3" placeholder="Describe your issue..."></textarea>
        </div>
      </Modal>

      {/* Navbar */}
      <nav className="w-full bg-surface border-b border-ui/5 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold">S</div>
          <h1 className="text-xl font-bold tracking-tight text-heading">SmartSell</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block text-sm font-medium text-subtext bg-bg px-3 py-1 rounded-full border border-ui/10">
            Welcome, {user.name}
          </span>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`w-10 h-10 rounded-full bg-bg border border-ui/10 flex items-center justify-center hover:bg-accent/10 hover:border-accent transition-all ${isProfileOpen ? 'bg-accent/10 border-accent' : ''}`}
            >
              <User className={`w-5 h-5 ${isProfileOpen ? 'text-accent' : 'text-subtext'}`} />
            </button>

            <ProfileMenu
              user={user}
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              onSettings={() => setActiveModal('settings')}
              onHelp={() => setActiveModal('help')}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </nav>

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* PASSED THE FUNCTION DOWN */}
        <Dashboard
          storeConfig={storeConfig} // Pass the data down
          onStoreSettings={() => setActiveModal('store-settings')}
        />
      </main>
    </div>
  );
}

export default App;