import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import { useForm } from "../../../hooks/useForm";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { setSessionStorage } from "../../../utils/session";
import AlertMessage from "../../../components/AlertMessage";
import {
  activeFruitVegetable,
  onClearActive,
  updateFruitVegetable,
} from "../../../features/fruitsVegetablesSlice";

const EditFruitsVegetables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fruit_vegetable_id } = useParams();
  const { error, fruitVegetableActive, loadingActive, loadingAction } =
    useSelector((state) => state.fruitsVegetables);

  const [availableData, setAvailableData] = useState(!!fruitVegetableActive);

  const [formValues, handleInputChange, reset] = useForm({
    name: fruitVegetableActive?.name || "",
  });

  const { name } = formValues;

  useEffect(() => {
    if (!fruitVegetableActive && loadingActive) {
      dispatch(activeFruitVegetable({ fruit_vegetable_id }));
    }

    return () => {
      dispatch(onClearActive());
    };
  }, []);

  useEffect(() => {
    if (!loadingActive && fruitVegetableActive && !availableData) {
      handleInputChange([{ name: "name", value: fruitVegetableActive.name }]);
    }
  }, [fruitVegetableActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newFruitVegetable = {
      id: fruit_vegetable_id,
      name,
    };

    const { meta } = await dispatch(
      updateFruitVegetable({ fruitVegetable: newFruitVegetable })
    );

    if (meta.requestStatus === "rejected")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (meta.requestStatus === "fulfilled") {
      setSessionStorage({
        message: "Producto actualizado correctamente",
        type: "success",
      });

      navigate("/admin/fruits-vegetables");
    }
  };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Editar fruta o verdura
      </h1>
      {loadingActive ? (
        <div className="flex items-center justify-center mt-7">
          <CircularProgress
            size={30}
            style={{ color: "#15803d" }}
          ></CircularProgress>
        </div>
      ) : !fruitVegetableActive ? (
        <h1>Fruta o vegetal no encontrado</h1>
      ) : (
        <form
          className="border p-4 mt-5 shadow rounded"
          onSubmit={handleSubmit}
        >
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
              ID
            </label>
            <input
              type="text"
              disabled
              className="disabled:bg-gray-200 disabled:cursor-not-allowed bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400"
              value={fruitVegetableActive.id}
            />
          </div>
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
              } disabled:bg-gray-200 disabled:cursor-not-allowed bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
              placeholder="XXXXXXXX-X"
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
              "Actualizar"
            ) : (
              <div className="flex items-center space-x-2">
                <span>Actualizando</span>
                <CircularProgress color="inherit" size="1rem" />
              </div>
            )}
          </button>
        </form>
      )}
    </DivAnimate>
  );
};
export default EditFruitsVegetables;
