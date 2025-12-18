import { Button } from "primereact/button";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, Outlet, Link } from "react-router-dom";

const Layout = () => {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
        <nav style={{ display: "flex", gap: ".5rem" }}>
            <Button 
                label="Personajes"
                icon="pi pi-users"
                outlined
                onClick={() => navigate("/personajes")}
            />
            <Button 
                label="Estadísticas"
                icon="pi pi-chart-bar"
                outlined
                onClick={() => navigate("/estadisticas")}
            />
        </nav>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            icon={darkMode ? "pi pi-sun" : "pi pi-moon"}
            onClick={() => setDarkMode(!darkMode)}
            rounded
            outlined
          />
          <Button
            label="Cerrar Sesión"
            icon="pi pi-sign-out"
            className="p-button-danger"
            onClick={handleLogout}
          />
        </div>
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet /> {/* renderiza Dashboard/Personajes/Estadisticas */}
      </main>
    </div>
  );
};

export default Layout;
