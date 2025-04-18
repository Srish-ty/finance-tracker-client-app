"use client";

import CategoryPieChart from "../components/CategoryPieChart";
import SummaryCards from "../components/SummaryCards";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    };
    fetch();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <SummaryCards transactions={transactions} />
      <CategoryPieChart transactions={transactions} />
    </main>
  );
}
