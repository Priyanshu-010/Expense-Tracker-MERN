import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import TransactionList from "../components/TransactionList";
import CategoryChart from "../components/CategoryChart";
import AuthContext from "../AuthContext";
import { SlidersHorizontal } from "lucide-react";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
    } else {
       navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      const txnDate = new Date(txn.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (categoryFilter && txn.category !== categoryFilter) return false;
      if (start && txnDate < start) return false;
      if (end && txnDate > end) return false;
      
      return true;
    });
  }, [transactions, categoryFilter, startDate, endDate]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set(transactions.map(t => t.category));
    return Array.from(cats);
  }, [transactions]);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-600">
                <SlidersHorizontal size={20}/>
                <h2 className="font-semibold">Filters</h2>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div>
                 <label htmlFor="startDate" className="text-sm text-slate-500">Start Date</label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                <label htmlFor="endDate" className="text-sm text-slate-500">End Date</label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <TransactionList
                transactions={filteredTransactions}
                onDelete={fetchTransactions}
            />
        </div>
        <div className="lg:col-span-1">
             {filteredTransactions.length > 0 ? (
                <CategoryChart transactions={filteredTransactions} />
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center text-slate-500 h-full flex items-center justify-center">
                    <p>No transactions found for the selected filters.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
