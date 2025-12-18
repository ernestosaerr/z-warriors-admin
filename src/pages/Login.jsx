import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function Login () {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const manejarEnvio = (e) => {
        e.preventDefault();

        // Credenciales harcodeadas
        if(nombreUsuario === "admin" && password === "admin123"){
            localStorage.setItem("token", "mi-token-de-prueba");
            navigate("/personajes");
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="login-container">
            <Card title="Login" className="login-card">
                <form className="login-form" onSubmit={manejarEnvio}>
                    <FloatLabel>
                        <InputText
                            id="usuario"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            className="login-input"
                        />
                        <label htmlFor="usuario">Usuario</label>
                    </FloatLabel>
                    <FloatLabel style={{ marginTop: "20px" }}>
                        <Password
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        feedback={false}
                        className="login-input"
                        />
                        <label htmlFor="password">Contraseña</label>
                    </FloatLabel>
                    {error && <small className="login-error">{error}</small>}
                        <Button
                            type="submit"
                            label="Ingresar"
                            className="login-button"
                            icon="pi pi-sign-in"
                        />
                </form>
            </Card>
        </div>
    );
}