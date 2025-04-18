"use client";

import api from "@/lib/axios";
import { useState, useEffect } from "react";

const categories = [
  "Groceries",
  "Transport",
  "Personal Care",
  "Shopping",
  "Saving or Investment",
  "Healthcare",
  "Entertainment",
  "Other",
];

export default function TransactionForm({
  fetchTransactions,
  editingTransaction,
  clearEdit,
}) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Shopping");

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount || "");
      setDescription(editingTransaction.description || "");
      setDate(editingTransaction.date?.slice(0, 10) || "");
      setCategory(editingTransaction.category || "Shopping");
    }
  }, [editingTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !date)
      return alert("All fields are required");

    const newTransaction = {
      amount: Number(amount),
      description,
      date,
      category: category || "Shopping",
    };

    if (editingTransaction) {
      await api.put(`/transactions/${editingTransaction._id}`, newTransaction);
      clearEdit();
    } else {
      await api.post("/transactions", newTransaction);
    }

    setAmount("");
    setDescription("");
    setDate("");
    setCategory("Shopping");
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
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          className="border px-3 py-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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
