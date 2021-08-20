import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startLoginEmailPassword, startGoogleLogin } from "../actions/auth";
import { useForm } from "../hooks/useForm";

export const LoginScreen = () => {
  const [formValues, handleInputChange] = useForm({
    email: "luis@luis.com",
    password: "luis123",
  });
  const dispatch = useDispatch();
  const { email, password } = formValues;
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("login");
    dispatch(startLoginEmailPassword(email, password));
  };
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-10   mx-auto mt-3">
          <Link to="/">Volver</Link>
          <h1 className="text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Usuario"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="submit"
                className="btn btn-success "
                value="ingresar"
              />
            </div>
          </form>
          <div className="mt-2">
            <button className="btn btn-primary" onClick={handleGoogleLogin}>
              Ingresa epicamente por Google
            </button>
          </div>
          <p>
            No tienes cuenta? <Link to="/auth/register">Registrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
