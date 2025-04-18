"use client";

export default function SummaryCards({ transactions }) {
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  const month = new Date().getMonth();
  const lastMonth = new Date();
  lastMonth.setMonth(month - 1);

  const thisMonthTotal = transactions
    .filter((tx) => new Date(tx.date).getMonth() === month)
    .reduce((acc, tx) => acc + tx.amount, 0);

  const lastMonthTotal = transactions
    .filter((tx) => new Date(tx.date).getMonth() === lastMonth.getMonth())
    .reduce((acc, tx) => acc + tx.amount, 0);

  const change = lastMonthTotal
    ? (((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(1)
    : "N/A";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-blue-100 p-4 rounded shadow">
        <h3 className="text-sm font-semibold">Total Expenses</h3>
        <p className="text-xl font-bold">₹{total}</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="text-sm font-semibold">This Month</h3>
        <p className="text-xl font-bold">₹{thisMonthTotal}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h3 className="text-sm font-semibold">MoM Change</h3>
        <p className="text-xl font-bold">
          {change === "N/A" ? "N/A" : `${change}%`}
        </p>
      </div>
    </div>
  );
}
