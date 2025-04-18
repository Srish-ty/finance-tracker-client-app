"use client";

import ExpenseChart from "../components/ExpenseChart";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchTransactions = async () => {
    const res = await api.get("/transactions");
    setTransactions(res.data);
  };

  const clearEdit = () => setEditingTransaction(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editingTransaction={editingTransaction}
        clearEdit={clearEdit}
      />
      <TransactionList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
        setEditingTransaction={setEditingTransaction}
      />
      {/* {
      <ExpenseChart transactions={transactions} />} */}
    </main>
  );
}
