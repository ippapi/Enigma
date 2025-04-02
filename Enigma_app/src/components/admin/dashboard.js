import { useState, useEffect } from "react";
import Card from "./card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const Dashboard = () => {
  const defaultFromDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0];
  const defaultToDate = new Date().toISOString().split("T")[0];
  
  const [data, setData] = useState({ sales: [], users: [], orders: [] });
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const from = fromDate || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0];
    const to = toDate || new Date().toISOString().split("T")[0];
    
    const response = await fetch(`/api/admin/dashboard?from=${from}&to=${to}`);
    const result = await response.json();
    setData(result);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex gap-4">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2"
        />
        <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded">Fetch Data</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow h-full">
        <Card className="col-span-3 h-full">
          <h2 className="text-xl font-bold mb-2">Total Sales Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.sales}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <div className="col-span-3 grid grid-cols-2 gap-4 h-full">
          <Card className="h-full">
            <h2 className="text-xl font-bold mb-2">New Users Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.users}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card className="h-full">
            <h2 className="text-xl font-bold mb-2">Orders Over Time</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data.orders}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
