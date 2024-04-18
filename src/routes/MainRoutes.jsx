import HomeLayout from "../layout/HomeLayout"
import ProtectedRoutes from "../components/ProtectedRoutes"
import DashboardScreen from "../pages/DashboardScreen"
import LoginScreen from "../pages/LoginScreen"
import UsersScreen from "../pages/UsersScreen"
import ViewUserScreen from "../pages/ViewUserScreen"
import DriversScreen from "../pages/DriversScreen"
import BooksScreen from "../pages/BooksScreen"
import ViewDriverScreen from "../pages/ViewDriverScreen"
import ViewBookScreen from "../pages/ViewBookScreen"
import ReportsScreen from "../pages/ReportsScreen"


const MainRoutes = [
  {
    path: "/",
    element: <ProtectedRoutes><LoginScreen/></ProtectedRoutes>,
  },
  {
    path: "/home",
    element: <ProtectedRoutes><HomeLayout/></ProtectedRoutes>,
    children: [
      {
        path: "",
        element: <DashboardScreen/>,
      },
      {
        path: "books",
        element: <BooksScreen/>,
      },
      {
        path: "drivers",
        element: <DriversScreen/>,
      },
      {
        path: "users",
        element: <UsersScreen/>,
      }, 
      {
        path: "reports",
        element: <ReportsScreen/>,
      },   
      {
        path: "book/:id",
        element: <ViewBookScreen/>,
      },
      {
        path: "driver/:id",
        element: <ViewDriverScreen/>,
      },   
      {
        path: "user/:id",
        element: <ViewUserScreen/>,
      },
    ],
  },
]

export default MainRoutes