import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  IoHomeOutline,
  IoBookOutline,
  IoBicycleOutline,
  IoPersonOutline ,
  IoAlertCircleOutline,
 } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from 'react-toastify';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarRoutes = [
    {
      name: "Dashboard",
      icon: <IoHomeOutline/>,
      path: "/home",
    },
    {
      name: "Books",
      icon: <IoBookOutline/>,
      path: "/home/books",
    },
    {
      name: "Drivers",
      icon: <IoBicycleOutline/>,
      path: "/home/drivers",
    },
    {
      name: "Users",
      icon: <IoPersonOutline  />,
      path: "/home/users",
    },
    {
      name: "Reports",
      icon: <IoAlertCircleOutline  />,
      path: "/home/reports",
    },
  ];

  const handleLogout = () => {
    if (!window.confirm("Are you sure want to logout?")) return;

    toast.success("You have successfully logged out!");
    signOut(auth);
    navigate("/");
  };

  return (
    <aside className="flex flex-col justify-between bg-gray-200 min-h-screen p-2 w-full max-w-[200px]">
      <div>
        <div className="p-2 flex flex-row gap-2">
          <h1 className="text-xl font-bold text-gray-600 mb-3">Ridemoto Admin</h1>
        </div>
        <nav>
          <ul>
            {sidebarRoutes.map((route, index) => (
              <li key={index} className="list-none">
                <Link 
                  to={route.path}
                  className={`flex gap-2 items-center justify-start p-2 text-xl rounded-md ${
                    location.pathname === route.path ? 'bg-gray-700 text-white' : '' 
                  } text-gray-700 `}
                >
                  {route.icon}
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button className='w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
