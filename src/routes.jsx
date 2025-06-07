import { Auth } from "./page/auth";
import { Navigate } from "react-router-dom";
import { DashboardPage } from "./page/dashboard/DashboardPage"
import { ProfilePage } from "./page/userProfile/ProfilePage";
import { DepositPage } from "./page/deposit/DepositPage";
import { UsersPage } from "./page/users/UsersPage.jsx"
import { PasswordRecoveryPage } from "./page/recoverPassword";
import { AcceptUsersPage } from "./page/users/AcceptUsersPage.jsx"


const routes = [
    { path: '/auth', element: <Auth /> },
    { path: '/resetPassword', element: <PasswordRecoveryPage /> },
    { path: '/dashboard', element: <DashboardPage /> },
    { path: '/myProfile', element: <ProfilePage /> },
    { path: '/deposit', element: <DepositPage /> },
    { path: '/users', element: <UsersPage /> },
    { path: '/acceptUsers', element: <AcceptUsersPage /> },
    { path: '/', element: <Navigate to={'/auth'} /> }
];

export default routes;
