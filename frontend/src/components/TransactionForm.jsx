import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';
import toast from 'react-hot-toast';

const categories = ['Income', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];

const TransactionForm = ({ isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    category: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch if in edit mode and an ID is present
    if (isEdit && id) {
      const fetchTransaction = async () => {
        try {
          const res = await API.get(`/transactions/${id}`);
          const transactionData = res.data;
          setFormData({
            title: transactionData.title,
            amount: transactionData.amount,
            date: new Date(transactionData.date).toISOString().split('T')[0],
            category: transactionData.category,
          });
        } catch (err) {
          console.error("Failed to fetch transaction", err);
          toast.error('Failed to load transaction data. Please try again.');
          navigate('/');
        }
      };
      fetchTransaction();
    }
  }, [isEdit, id, navigate]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        ...formData,
        amount: parseFloat(formData.amount)
    };
    try {
      if (isEdit) {
        await API.put(`/transactions/${id}`, payload);
        toast.success('Transaction updated successfully!');
      } else {
        await API.post('/transactions', payload);
        toast.success('Transaction added successfully!');
      }
      navigate('/');
    } catch (err) {
      console.error("Failed to save transaction", err);
      toast.error('Failed to save transaction. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
        <form onSubmit={onSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-slate-200 space-y-6">
        <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-slate-700">Title</label>
            <input 
                id="title"
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={onChange} 
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required 
                placeholder="e.g., Monthly Salary"
            />
        </div>
        <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium text-slate-700">Amount (positive for income, negative for expense)</label>
            <input 
                id="amount"
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={onChange} 
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required 
                placeholder="e.g., -500 or 50000"
            />
        </div>
        <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-slate-700">Date</label>
            <input 
                id="date"
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={onChange} 
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required 
            />
        </div>
        <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-slate-700">Category</label>
            <select 
                id="category"
                name="category" 
                value={formData.category} 
                onChange={onChange} 
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                required
            >
            <option value="" disabled>-- Select a Category --</option>
            {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
            </select>
        </div>
        <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {isEdit ? 'Update Transaction' : 'Add Transaction'}
        </button>
        </form>
    </div>
  );
};

export default TransactionForm;
