"use client";

import api from "@/lib/axios";
import { useState } from "react";

export default function TransactionForm({
  fetchTransactions,
  editingTransaction,
  clearEdit,
}) {
  const [amount, setAmount] = useState(editingTransaction?.amount || "");
  const [description, setDescription] = useState(
    editingTransaction?.description || ""
  );
  const [date, setDate] = useState(
    editingTransaction?.date?.slice(0, 10) || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !date)
      return alert("All fields are required");

    const newTransaction = { amount: Number(amount), description, date };

    if (editingTransaction) {
      await api.put(`/transactions/${editingTransaction._id}`, newTransaction);
      clearEdit();
    } else {
      await api.post("/transactions", newTransaction);
    }

    setAmount("");
    setDescription("");
    setDate("");
    fetchTransactions();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg shadow mb-6 text-black"
    >
      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          className="border px-3 py-2 w-full"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <input
          type="text"
          className="border px-3 py-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          className="border px-3 py-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {editingTransaction ? "Update" : "Add"} Transaction
      </button>
    </form>
  );
}
