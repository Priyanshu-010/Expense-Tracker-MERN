import React from "react";
import { Link } from "react-router-dom";
import { Trash2, FilePenLine } from "lucide-react";
import API from "../api";
import toast from "react-hot-toast";

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await API.delete(`/transactions/${id}`);
        toast.success("Transaction deleted successfully!");
        onDelete();
      } catch (err) {
        console.error("Failed to delete transaction:", err);
        toast.error("Failed to delete transaction. Please try again.");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center text-slate-500">
          <p>No transactions yet. Add one to get started!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {transactions.map((txn) => {
            const isIncome = txn.amount > 0;
            const amountColor = isIncome ? "text-emerald-600" : "text-red-600";

            return (
              <li
                key={txn._id}
                className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex justify-between items-center transition-shadow hover:shadow-md"
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-700">{txn.title}</p>
                  <p className="text-sm text-slate-500">
                    {txn.category} · {formatDate(txn.date)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`font-bold text-lg ${amountColor}`}>
                    {isIncome ? "+" : "-"}₹
                    {Math.abs(txn.amount).toLocaleString("en-IN")}
                  </p>
                  <Link
                    to={`/${txn._id}/edit`}
                    className="text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    <FilePenLine size={20} />
                  </Link>
                  <button
                    onClick={() => handleDelete(txn._id)}
                    className="text-slate-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
