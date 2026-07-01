import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = window.ethereum.providers ? 
          (window.ethereum.providers.find(p => p.isMetaMask && !p.isPhantom) || window.ethereum) 
          : window.ethereum;
          
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = window.ethereum.providers ? 
          (window.ethereum.providers.find(p => p.isMetaMask && !p.isPhantom) || window.ethereum) 
          : window.ethereum;
        
        try {
          // eth_accounts returns an array of addresses if connected, without prompting the user
          const accounts = await provider.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };
    checkConnection();
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <svg width="30" height="35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="20" r="10" stroke="#0682ff"/>
                  <circle cx="15" cy="20" r="6" stroke="#0682ff" strokeWidth="3"/>
              </svg>  
              <span className="text-2xl font-bold text-primary-600 mt-1.5">RoyalCity</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={connectWallet}
              className="btn"
            >
              {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect"}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-secondary-600 hover:text-primary-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                className="block px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md w-full text-left"
                onClick={() => {
                  setIsOpen(false);
                  connectWallet();
                }}
              >
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;