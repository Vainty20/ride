import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import useFetchAllUsersData from "../hooks/useFetchAllUsersData";
import useFetchAllDriversData from "../hooks/useFetchAllDriversData";
import useFetchAllBooksData from "../hooks/useFetchAllBooksData";
import {
  PieChart,
  Pie,
  Cell,
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
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const dailyNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekNumber(date) {
  const onejan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
}

export default function DashboardScreen() {
  const { users, loading: loadingUser } = useFetchAllUsersData();
  const { drivers, loading: loadingDriver } = useFetchAllDriversData();
  const { books, loading: loadingBook } = useFetchAllBooksData();
  const [filteredIncomeData, setFilteredIncomeData] = useState([]);
  const [incomeType, setIncomeType] = useState("monthly");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalAppIncome, setTotalAppIncome] = useState(0);
  const [totalDriverIncome, setTotalDriverIncome] = useState(0);
  const [topDrivers, setTopDrivers] = useState([]);
  const [filterType, setFilterType] = useState("monthly");

  useEffect(() => {
    const incomeData = {};
    const dailyIncomeData = {};
    const weeklyIncomeData = {};

    books.forEach((booking) => {
      const date = new Date(booking.timestamp);
      const monthYearKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const dayKey = dailyNames[date.getDay()];
      const weekYearKey = `${date.getFullYear()}-${getWeekNumber(date)}`;

      const ridePriceInt = parseInt(booking.ridePrice.replace("₱", "").trim(), 10);

      if (incomeData[monthYearKey]) {
        incomeData[monthYearKey] += ridePriceInt;
      } else {
        incomeData[monthYearKey] = ridePriceInt;
      }

      if (dailyIncomeData[dayKey]) {
        dailyIncomeData[dayKey] += ridePriceInt;
      } else {
        dailyIncomeData[dayKey] = ridePriceInt;
      }

      if (weeklyIncomeData[weekYearKey]) {
        weeklyIncomeData[weekYearKey] += ridePriceInt;
      } else {
        weeklyIncomeData[weekYearKey] = ridePriceInt;
      }
    });

    const chartData = [];
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
    allMonths.forEach((month) => {
      const monthYearKey = `${new Date().getFullYear()}-${month}`;
      const existingData = incomeData[monthYearKey] || 0;
      chartData.push({ label: monthNames[month - 1], income: existingData });
    });

    const dailyChartData = [];
    dailyNames.forEach((day) => {
      const existingData = dailyIncomeData[day] || 0;
      dailyChartData.push({ label: day, income: existingData });
    });

    const weeklyChartData = [];
    for (let year in weeklyIncomeData) {
      const weekNumber = year.split("-")[1];
      weeklyChartData.push({
        label: `Week ${weekNumber}`,
        income: weeklyIncomeData[year],
      });
    }

    setFilteredIncomeData(
      incomeType === "monthly" ? chartData :
      incomeType === "daily" ? dailyChartData :
      weeklyChartData
    );

    let totalIncome = 0;
    chartData.forEach((item) => {
      totalIncome += item.income;
    });
    const appIncome = totalIncome * 0.4;
    const driverIncome = totalIncome * 0.6;

    setTotalIncome(totalIncome);
    setTotalAppIncome(appIncome);
    setTotalDriverIncome(driverIncome);

    const updatedDrivers = drivers.map((driver) => {
      const driverBooks = books.filter((book) => book.driverId === driver.id);
      const driverTotalIncome = driverBooks.reduce(
        (total, book) =>
          total + parseInt(book.ridePrice.replace("₱", "").trim(), 10),
        0
      );
      return { ...driver, totalIncome: driverTotalIncome, topDate: driverBooks.length ? driverBooks[0].timestamp : null };
    });

    const sortedDrivers = [...updatedDrivers];
    sortedDrivers.sort((a, b) => b.totalIncome - a.totalIncome);
    const top5Drivers = sortedDrivers.slice(0, 5);
    setTopDrivers(top5Drivers);
  }, [books, drivers, incomeType]);

  const handleChangeIncomeType = (type) => {
    setIncomeType(type);
  };

  const handleChangeFilterType = (type) => {
    setFilterType(type);
  };

  const filteredTopDrivers = topDrivers.filter((driver) => {
    if (filterType === "monthly" || filterType === "daily" || filterType === "weekly") {
      return driver.totalIncome !== undefined && driver.totalIncome !== 0;
    }
  });

  const approvedDriversCount = drivers.filter((driver) => driver.isApprovedDriver).length;
  const approvedUsersCount = users.filter((user) => user.isApproved).length;
  const booksWithDropoffCount = books.filter((book) => book.isDropoff).length;

  if (loadingUser && loadingDriver && loadingBook) return <Loading />;

  return (
    <div className="w-full p-6">
      <h1 className="mb-4 text-3xl font-semibold">Admin Dashboard</h1>
      <div className="flex justify-end mb-4">
        <select
          className="px-2 py-1 border border-gray-300 rounded text-gray-700"
          value={incomeType}
          onChange={(e) => handleChangeIncomeType(e.target.value)}
        >
          <option value="monthly">Monthly Income</option>
          <option value="daily">Daily Income</option>
        </select>
      </div>

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
            data={filteredIncomeData}
            margin={{ top: 5, right: 40, left: 40, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-6">
        <div className="w-full bg-gray-200 rounded-lg p-3 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Drivers</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="count"
                data={[
                  { name: "Approved Drivers", count: approvedDriversCount },
                  {
                    name: "Non-Approved Drivers",
                    count: drivers.length - approvedDriversCount,
                  },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {[{ fill: "#8884d8" }, { fill: "#82ca9d" }].map(
                  (entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full bg-gray-200 rounded-lg p-3 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Users</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="count"
                data={[
                  { name: "Approved Users", count: approvedUsersCount },
                  {
                    name: "Non-Approved Users",
                    count: users.length - approvedUsersCount,
                  },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {[{ fill: "#8884d8" }, { fill: "#82ca9d" }].map(
                  (entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full bg-gray-200 rounded-lg p-3 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Books</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="count"
                data={[
                  { name: "With Drop-off", count: booksWithDropoffCount },
                  {
                    name: "Without Drop-off",
                    count: books.length - booksWithDropoffCount,
                  },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {[{ fill: "#8884d8" }, { fill: "#82ca9d" }].map(
                  (entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-lg p-3 mb-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Top 5 Drivers by Income
          </h2>
          <select
            className="px-2 py-1 border border-gray-300 rounded text-gray-700"
            value={filterType}
            onChange={(e) => handleChangeFilterType(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <ul>
          {filteredTopDrivers.map((driver, index) => (
            <div key={driver.driverId} className="text-gray-700">
              {`${index + 1}. ${driver.firstName}`} - Total Income:{" "}
              {`₱${driver.totalIncome.toFixed(2)}`}
              {driver.topDate && (
                <div className="text-sm text-gray-500">
                  {filterType === "monthly" ? 
                    `Month: ${monthNames[new Date(driver.topDate).getMonth()]}` :
                    `Week: ${getWeekNumber(new Date(driver.topDate))}`}
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>

      <div className="flex justify-center gap-2">
        <RecentDrivers drivers={drivers} />
        <RecentUsers users={users} />
      </div>
    </div>
  );
}
