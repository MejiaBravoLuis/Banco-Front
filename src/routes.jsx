import { Auth } from "./page/auth";
import { Navigate } from "react-router-dom";
import { DashboardPage } from "./page/dashboard/DashboardPage";
import { ProfilePage } from "./page/userProfile/ProfilePage";
import { DepositPage } from "./page/deposit/DepositPage";
import { UsersPage } from "./page/users/UsersPage.jsx";
import { PasswordRecoveryPage } from "./page/recoverPassword";
import { AcceptUsersPage } from "./page/users/AcceptUsersPage.jsx";
import { PrizePage } from "./page/Prize/prizePage.jsx";
import { MovementsPage } from "./page/movements/MovementsPage.jsx";
import { AccountsPage } from "./page/accounts/AccountsPage.jsx"; 
import {RewardPage} from "./page/reward/RewardPage.jsx"
import {DivisaPage} from "./page/divisa/divisaPage.jsx"
import { FavoritesPage } from "./page/favorite/FavoritePage.jsx";
import { PrivateRoute } from "./components/PrivateRoutes.jsx";



const routes = [
  { path: '/auth', element: <Auth /> },
  { path: '/resetPassword', element: <PrivateRoute><PasswordRecoveryPage /></PrivateRoute> },
  { path: '/dashboard', element: <PrivateRoute><DashboardPage /></PrivateRoute> },
  { path: '/myProfile', element: <PrivateRoute><ProfilePage /></PrivateRoute> },
  { path: '/deposit', element: <PrivateRoute><DepositPage /></PrivateRoute> },
  { path: '/users', element: <PrivateRoute allowedRoles={['ADMIN']}><UsersPage /></PrivateRoute> },
  { path: '/acceptUsers', element: <PrivateRoute allowedRoles={['ADMIN']}><AcceptUsersPage /></PrivateRoute> },
  { path: '/prize', element: <PrivateRoute><PrizePage /></PrivateRoute> },
  { path: '/movements', element: <PrivateRoute><MovementsPage /></PrivateRoute> },
  { path: '/reward', element: <PrivateRoute><RewardPage /></PrivateRoute> },
  { path: '/accounts', element: <PrivateRoute><AccountsPage /></PrivateRoute> },
  { path: '/divisa', element: <PrivateRoute><DivisaPage /></PrivateRoute> },
  { path: '/favorito', element: <PrivateRoute><FavoritesPage /></PrivateRoute> },
  { path: '/', element: <Navigate to={'/auth'} /> }
  
];

export default routes;
