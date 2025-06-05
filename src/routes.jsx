import { Auth } from "./page/auth";
import { Navigate } from "react-router-dom";
import { DashboardPage } from "./page/dashboard/DashboardPage"
import { ProfilePage } from "./page/userProfile/ProfilePage";

const routes = [
    { path: '/auth', element: <Auth /> },
    { path: '/dashboard', element: <DashboardPage /> },
    { path: '/myProfile', element: <ProfilePage /> },
    { path: '/', element: <Navigate to={'/auth'} /> }
];

export default routes;
