import { useState, useEffect } from "react";
import Card from "./card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const DEFAULT_DAYS_RANGE = 30;

const formatDate = (date) => date.toISOString().split("T")[0];

const getDefaultFromDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - DEFAULT_DAYS_RANGE);
  return formatDate(date);
};

const Dashboard = () => {
  const [data, setData] = useState({ sales: [], users: [], orders: [] });
  const [fromDate, setFromDate] = useState(getDefaultFromDate());
  const [toDate, setToDate] = useState(formatDate(new Date()));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const from = fromDate || getDefaultFromDate();
    const to = toDate || formatDate(new Date());

    try {
      const response = await fetch(`/api/admin/dashboard?from=${from}&to=${to}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const renderChart = (title, chartData, dataKey) => (
    <Card className="h-full">
      <h2 className="text-xl font-bold mb-2 text-black">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" stroke="#000" />
          <YAxis stroke="#000" />
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <Tooltip contentStyle={{ color: "#000" }} />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke="#000000" 
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex gap-4 items-center">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={fetchData} 
          className="bg-custom-purple hover:bg-custom-purple-dark text-white px-4 py-2 rounded-lg transition-colors"
        >
          Apply Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
        <Card className="col-span-3">
          {renderChart("Total Sales Over Time", data.sales, "sales")}
        </Card>
        
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderChart("New Users Over Time", data.users, "users")}
          {renderChart("Orders Over Time", data.orders, "orders")}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;