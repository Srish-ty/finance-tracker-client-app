"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF4444",
  "#AA66CC",
  "#2BBBAD",
  "#FF8800",
];

export default function CategoryPieChart({ transactions }) {
  const categoryMap = {};

  transactions.forEach((tx) => {
    const cat = tx.category || "Other";
    if (!categoryMap[cat]) categoryMap[cat] = 0;
    categoryMap[cat] += tx.amount;
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Category-wise Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
