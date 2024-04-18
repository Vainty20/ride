import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function HomeLayout() {
  return (
    <div className="flex h-screen bg-gray-700 text-white overflow-hidden">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
