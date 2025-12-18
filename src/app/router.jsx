import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Personajes from "../pages/Personajes";
import Estadisticas from "../pages/Estadisticas";
import Layout from "../components/Layout";

const router = createBrowserRouter([
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "personajes",
                element: <Personajes />
            },
            {
                path: "estadisticas",
                element: <Estadisticas />
            },
        ],
    },
    // Si la ruta no existe
    {
        path: "*",
        element: <Login />
    },
]);

export default router;