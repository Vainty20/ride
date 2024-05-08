import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import useFetchAllUsersData from "../hooks/useFetchAllUsersData";
import useFetchAllDriversData from "../hooks/useFetchAllDriversData";
import useFetchAllBooksData from "../hooks/useFetchAllBooksData";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RecentUsers from "../components/RecentUsers";
import RecentDrivers from "../components/RecentDrivers";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function DashboardScreen() {
  const { users, loading: loadingUser } = useFetchAllUsersData();
  const { drivers, loading: loadingDriver } = useFetchAllDriversData();
  const { books, loading: loadingBook } = useFetchAllBooksData();
  const [filteredMonthlyIncome, setFilteredMonthlyIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalAppIncome, setTotalAppIncome] = useState(0);
  const [totalDriverIncome, setTotalDriverIncome] = useState(0);
  const [aggregatedDriversByMonth, setAggregatedDriversByMonth] = useState([]);
  const [aggregatedUsersByMonth, setAggregatedUsersByMonth] = useState([]);
  const [aggregatedBooksByMonth, setAggregatedBooksByMonth] = useState([]);

  useEffect(() => {
    const incomeData = {};

    books
      .filter((book) => book.isDropoff === true)
      .forEach((booking) => {
        const date = new Date(booking.timestamp);
        const monthYearKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

        const ridePriceInt = parseInt(
          booking.ridePrice.replace("₱", "").trim(),
          10
        );

        if (incomeData[monthYearKey]) {
          incomeData[monthYearKey] += ridePriceInt;
        } else {
          incomeData[monthYearKey] = ridePriceInt;
        }
      });

    const chartData = [];
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
    allMonths.forEach((month) => {
      const monthYearKey = `${new Date().getFullYear()}-${month}`;
      const existingData = incomeData[monthYearKey] || 0;
      chartData.push({ month: monthNames[month - 1], income: existingData });
    });

    setFilteredMonthlyIncome(chartData);

    let totalIncome = 0;
    chartData.forEach((item) => {
      totalIncome += item.income;
    });
    const appIncome = totalIncome * 0.4;
    const driverIncome = totalIncome * 0.6;

    setTotalIncome(totalIncome);
    setTotalAppIncome(appIncome);
    setTotalDriverIncome(driverIncome);
  }, [books]);

  useEffect(() => {
    const aggregateDataByMonth = (data) => {
      const aggregatedData = {};

      data.forEach((item) => {
        const monthYearKey = `${new Date(item.timestamp).getFullYear()}-${
          new Date(item.timestamp).getMonth() + 1
        }`;
        if (aggregatedData[monthYearKey]) {
          aggregatedData[monthYearKey]++;
        } else {
          aggregatedData[monthYearKey] = 1;
        }
      });

      return Object.keys(aggregatedData).map((monthYear) => ({
        month: monthNames[parseInt(monthYear.split("-")[1]) - 1],
        count: aggregatedData[monthYear],
      }));
    };

    const aggregatedDrivers = aggregateDataByMonth(drivers);
    const aggregatedUsers = aggregateDataByMonth(users);
    const aggregatedBooks = aggregateDataByMonth(books);

    setAggregatedDriversByMonth(aggregatedDrivers);
    setAggregatedUsersByMonth(aggregatedUsers);
    setAggregatedBooksByMonth(aggregatedBooks);
  }, [drivers, users, books]);
  if (loadingUser && loadingDriver && loadingBook) return <Loading />;

  return (
    <div className="w-full p-6">
      <h1 className="mb-4 text-3xl font-semibold">Admin Dashboard</h1>

      <div className="w-full bg-gray-200 rounded-lg p-3 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-700">
            Ridemoto's Income
          </h2>
          <div className="flex gap-3">
            <div className="text-gray-700">
              Total Income: <strong>₱{totalIncome.toFixed(2)}</strong>
            </div>
            <div className="text-gray-700">
              Total App Income: <strong>₱{totalAppIncome.toFixed(2)}</strong>
            </div>
            <div className="text-gray-700">
              Total Driver Income:{" "}
              <strong>₱{totalDriverIncome.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={filteredMonthlyIncome}
            margin={{ top: 5, right: 40, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-2">
        <div className="w-full bg-gray-200 rounded-lg p-3 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Drivers by Month
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="count"
                data={aggregatedDriversByMonth}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full bg-gray-200 rounded-lg p-3 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Users by Month
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="count"
                data={aggregatedUsersByMonth}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full bg-gray-200 rounded-lg p-3 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Books by Month
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="count"
                data={aggregatedBooksByMonth}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#ffc658"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <RecentDrivers drivers={drivers} />
        <RecentUsers users={users} />
      </div>
    </div>
  );
}
