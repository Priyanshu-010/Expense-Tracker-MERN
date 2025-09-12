import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import AuthContext from '../AuthContext';

const AddTransaction = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Add Transaction</h1>
      <TransactionForm />
    </div>
  );
};

export default AddTransaction;