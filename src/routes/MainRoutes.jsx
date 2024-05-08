import HomeLayout from "../layout/HomeLayout";
import ProtectedRoutes from "../components/ProtectedRoutes";
import DashboardScreen from "../pages/DashboardScreen";
import LoginScreen from "../pages/LoginScreen";
import UsersScreen from "../pages/UsersScreen";
import ViewUserScreen from "../pages/ViewUserScreen";
import DriversScreen from "../pages/DriversScreen";
import BooksScreen from "../pages/BooksScreen";
import ViewDriverScreen from "../pages/ViewDriverScreen";
import ViewBookScreen from "../pages/ViewBookScreen";
import ReportsScreen from "../pages/ReportsScreen";
import ScheduleScreen from "../pages/ScheduleScreen";

const MainRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <LoginScreen />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoutes>
        <HomeLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <DashboardScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: "books",
        element: (
          <ProtectedRoutes>
            <BooksScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: "drivers",
        element: (
          <ProtectedRoutes>
            <DriversScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: "schedules",
        element: (
          <ProtectedRoutes>
            <ScheduleScreen/>
          </ProtectedRoutes>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoutes>
            <UsersScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: "reports",
        element: (
          <ProtectedRoutes>
            <ReportsScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: "book/:id",
        element: (
          <ProtectedRoutes>
            <ViewBookScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: "driver/:id",
        element: (
          <ProtectedRoutes>
            <ViewDriverScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: "user/:id",
        element: (
          <ProtectedRoutes>
            <ViewUserScreen />
          </ProtectedRoutes>
        ),
      },
    ],
  },
];

export default MainRoutes;
