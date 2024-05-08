import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  IoPersonCircleOutline,
  IoHomeOutline,
  IoBookOutline,
  IoBicycleOutline,
  IoPersonOutline,
  IoAlertCircleOutline,
  IoExitOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarRoutes = [
    {
      name: "Dashboard",
      icon: <IoHomeOutline />,
      path: "/home",
    },
    {
      name: "Books",
      icon: <IoBookOutline />,
      path: "/home/books",
    },
    {
      name: "Drivers",
      icon: <IoBicycleOutline />,
      path: "/home/drivers",
    },
    {
      name: "Users",
      icon: <IoPersonOutline />,
      path: "/home/users",
    },
    {
      name: "Schedules",
      icon: <IoCalendarOutline />,
      path: "/home/schedules",
    },
    {
      name: "Reports",
      icon: <IoAlertCircleOutline />,
      path: "/home/reports",
    },
  ];

  const handleLogout = () => {
    if (!window.confirm("Are you sure want to logout?")) return;

    toast.success("You have successfully logged out!");
    signOut(auth);
    navigate("/", { replace: true });
  };

  return (
    <aside className="flex flex-col justify-between bg-gray-200 min-h-screen p-2 w-full max-w-[50px] xl:max-w-[200px]">
      <div>
        <div className="p-2 flex items-center flex-row gap-2">
          <IoPersonCircleOutline className="text-gray-600 text-xl" size={60} />
          <h1 className="hidden xl:block text-lg font-bold text-gray-600 mb-3">
            Ridemoto Admin
          </h1>
        </div>
        <nav>
          <ul>
            {sidebarRoutes.map((route, index) => (
              <li key={index} className="list-none">
                <Link
                  to={route.path}
                  className={`flex gap-2 items-center justify-start p-2 text-xl rounded-md ${
                    location.pathname === route.path
                      ? "bg-gray-700 text-white"
                      : ""
                  } text-gray-700 `}
                >
                  {route.icon}
                  <span className="hidden xl:block">{route.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        className="w-full bg-red-500 hover:bg-red-700 text-white font-bold flex items-center p-2 rounded gap-2"
        onClick={handleLogout}
      >
        <IoExitOutline />
        <span className="hidden xl:block">Logout</span>
      </button>
    </aside>
  );
}
