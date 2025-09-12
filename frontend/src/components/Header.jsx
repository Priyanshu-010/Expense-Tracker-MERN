import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, PlusCircle, Wallet } from 'lucide-react';
import AuthContext from '../AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <Wallet className="w-8 h-8" />
          <span>FinTrack</span>
        </Link>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link 
                to="/add" 
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <PlusCircle size={20} />
                <span>Add Transaction</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Login</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors">Register</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
