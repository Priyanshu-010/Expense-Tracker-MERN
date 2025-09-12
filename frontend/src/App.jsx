import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddTransaction />} />
              <Route path="/:id/edit" element={<EditTransaction />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;