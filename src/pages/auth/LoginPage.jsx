import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";
import { login } from "../../features/authSlice";
import { useForm } from "../../hooks/useForm";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { error, loadingLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formValues, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = async (e) => {
    e.preventDefault();
    const { meta, payload } = await dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen bg-gray-50 container m-0">
      <div className="flex flex-wrap justify-between items-center mx-auto pt-4">
        <h3 className="flex items-center">
          <img
            src="/android-chrome-192x192.png"
            className="mr-1 h-6 sm:h-9"
            alt="Feria virtual Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Feria virtual
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-12 mt-10">
        <div className="col-span-12 lg:col-span-6 hidden lg:block">
          <div className="">
            <img
              src="https://i.pinimg.com/originals/7f/cc/d4/7fccd4143a51812cfbcff26451e2a113.png"
              alt="fruits"
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="shadow bg-white px-6 lg:px-16 py-10 lg:py-20 mx-2 rounded-lg">
            <h2 className="text-3xl text-green-800 font-semibold">
              Iniciar sesion
            </h2>
            <p className="mt-1 mb-4">
              Inicia sesión para acceder a todos los beneficios que feria
              virtual ofrece.
            </p>
            {error && (
              <AlertMessage type="error" message={error.message}></AlertMessage>
            )}
            <form className="mt-4 z-20 relative" onSubmit={handleLogin}>
              <div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-green-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="grid">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 text-white bg-green-700 hover:bg-green-600 disabled:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    disabled={loadingLogin}
                  >
                    Iniciar sesion
                    {loadingLogin && (
                      <CircularProgress color="inherit" size="1rem" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <img
            className="mt-[-80px] block lg:hidden mx-auto z-0"
            src="https://i.pinimg.com/originals/7f/cc/d4/7fccd4143a51812cfbcff26451e2a113.png"
            alt="fruits"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
