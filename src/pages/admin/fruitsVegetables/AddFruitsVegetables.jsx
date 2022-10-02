import React from "react";
import DivAnimate from "../../../components/DivAnimate";
import { useForm } from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../../components/AlertMessage";
import { setSessionStorage } from "../../../utils/session";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { createFruitVegetable } from "../../../features/fruitsVegetablesSlice";

const AddFruitsVegetables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loadingAction } = useSelector(
    (state) => state.fruitsVegetables
  );
  const [formValues, handleInputChange, reset] = useForm({
    name: "",
  });

  const { name } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newFruitVegetable = { name };

    const { meta } = await dispatch(
      createFruitVegetable({ fruitVegetable: newFruitVegetable })
    );

    if (meta.requestStatus === "rejected")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (meta.requestStatus === "fulfilled") {
      setSessionStorage({
        message: "Producto registrado correctamente",
        type: "success",
      });

      navigate("/admin/fruits-vegetables");
    }
  };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Agregar fruta o verdura
      </h1>
      <form className="border p-4 mt-5 shadow rounded" onSubmit={handleSubmit}>
        {error?.message && (
          <div className="mb-4">
            <AlertMessage
              type={error.message.type}
              message={error.message.message}
            ></AlertMessage>
          </div>
        )}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Nombre (*)
          </label>
          <input
            type="text"
            name="name"
            className={`${
              error?.fields?.name
                ? "border-red-500 focus:border-red-300"
                : "border-gray-300 focus:border-green-700"
            } bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
            placeholder="Manza..."
            value={name}
            onChange={handleInputChange}
            // required
          />
          {error?.fields?.name?.message && (
            <span className="text-xs text-red-500">
              {error.fields.name.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="disabled:bg-green-400 disabled:cursor-wait bg-green-700 hover:bg-green-600 text-white py-2 px-4 w-full md:w-auto rounded shadow"
          disabled={loadingAction}
        >
          {!loadingAction ? (
            "Agregar"
          ) : (
            <div className="flex items-center space-x-2">
              <span>Agregando</span>
              <CircularProgress color="inherit" size="1rem" />
            </div>
          )}
        </button>
      </form>
    </DivAnimate>
  );
};
export default AddFruitsVegetables;
