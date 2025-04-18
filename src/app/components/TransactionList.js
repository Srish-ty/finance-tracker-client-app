"use client";

import api from "@/lib/axios";

export default function TransactionList({
  transactions,
  fetchTransactions,
  setEditingTransaction,
}) {
  const handleDelete = async (id) => {
    await api.delete(`/transactions/${id}`);
    fetchTransactions();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li
              key={tx._id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium">{tx.description}</p>
                <p className="text-sm text-gray-600">
                  ₹{tx.amount} • {new Date(tx.date).toLocaleDateString()}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => setEditingTransaction(tx)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(tx._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
