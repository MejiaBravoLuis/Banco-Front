import { Auth } from "./page/auth";
import { Navigate } from "react-router-dom";
import { DashboardPage } from "./page/dashboard/DashboardPage"


const routes = [
    { path: '/auth', element: <Auth /> },
    { path: '/dashboard', element: <DashboardPage /> },

    { path: '/', element: <Navigate to={'/auth'} /> }
];

export default routes;
