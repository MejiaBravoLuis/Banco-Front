import { Auth } from "./page/auth";
import { Navigate } from "react-router-dom";


const routes = [
    { path: '/auth', element: <Auth /> },

    { path: '/', element: <Navigate to={'/auth'} /> }
];

export default routes;
