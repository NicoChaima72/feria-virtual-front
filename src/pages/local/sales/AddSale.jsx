import DivAnimate from "../../../components/DivAnimate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFruitsAndVegetables } from "../../../features/fruitsVegetablesSlice";
import AlertMessage from "../../../components/AlertMessage";
import { useForm } from "../../../hooks/useForm";
import Select from "react-select";
import feriaApi from "../../../interceptors/feriaInterceptor";
import uuid from "react-uuid";
import { createSale } from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { setSessionStorage } from "../../../utils/session";

const AddSale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loadingAction } = useSelector((state) => state.sales);
  const { user } = useSelector((state) => state.auth);
  const [fruitsVegetables, setFruitsVegetables] = useState([]);
  const [loadFruitsVegetables, setLoadFruitsVegetables] = useState(true);
  const [fruitsVegetablesData, setFruitsVegetablesData] = useState([
    {
      fruit_vegetable_id: null,
      quantity: "",
      id: uuid(),
      measurement: "Kilogramos",
    },
  ]);
  const [formValues, handleInputChange, reset] = useForm({ message: "" });

  const { message } = formValues;

  useEffect(() => {
    const getFruitsVegetables = async () => {
      const { data } = await feriaApi.get("/admin/fruits_vegetables");

      const options = data.fruitsVegetables.map((fruitVegetable) => ({
        value: fruitVegetable.id,
        label: fruitVegetable.name,
      }));

      setFruitsVegetables(options);
      setLoadFruitsVegetables(false);
    };

    getFruitsVegetables();
  }, []);

  const getFruitsVegetablesByIndex = (index) => {
    const fvSelected = fruitsVegetablesData.map((f) => f.fruit_vegetable_id);
    const fv = fruitsVegetables.filter((f) => !fvSelected.includes(f.value));

    return fv;
  };

  const handleChangeFruitVegetable = (data, type, id) => {
    setFruitsVegetablesData((old) =>
      old.map((d) =>
        d.id === id
          ? type === "fruit_vegetable"
            ? { ...d, fruit_vegetable_id: data.value }
            : type === "measurement"
            ? { ...d, measurement: data.value }
            : { ...d, quantity: data.value }
          : d
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newSale = {
      client_id: user.id,
      status_id: 1,
      status_payment_id: 1,
      message,
      sale__fruits_vegetables: fruitsVegetablesData.map((d) => ({
        fruit_vegetable_id: d.fruit_vegetable_id,
        quantity: d.quantity,
        measurement: d.measurement,
      })),
    };

    const { meta } = await dispatch(createSale({ sale: newSale }));

    if (meta.requestStatus === "rejected")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (meta.requestStatus === "fulfilled") {
      setSessionStorage({
        message: "Pedido generado correctamente",
        type: "success",
      });

      navigate("/local/sales");
    }
  };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Generar nuevo pedido
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
            Frutas y verduras
          </label>
          <div className="space-y-6">
            {fruitsVegetablesData.map((data, index) => (
              <div className="grid grid-cols-12 gap-2" key={data.id}>
                <div className="col-span-12 lg:col-span-4">
                  <Select
                    classNamePrefix="react-select"
                    options={getFruitsVegetablesByIndex(index)}
                    isLoading={loadFruitsVegetables}
                    placeholder="Selecciona fruta o verdura..."
                    isSearchable={true}
                    onChange={(e) =>
                      handleChangeFruitVegetable(e, "fruit_vegetable", data.id)
                    }
                  />
                </div>
                <div className="col-span-6 lg:col-span-4">
                  <Select
                    classNamePrefix="react-select"
                    defaultValue={{ value: "Kilogramos", label: "Kilogramos" }}
                    options={[
                      { value: "Kilogramos", label: "Kilogramos" },
                      { value: "Unidades", label: "Unidades" },
                    ]}
                    placeholder="Medida"
                    onChange={(e) =>
                      handleChangeFruitVegetable(e, "measurement", data.id)
                    }
                  />
                </div>
                <div className="col-span-6 lg:col-span-4 flex gap-2">
                  <input
                    type="number"
                    placeholder={`Cantidad ${fruitsVegetablesData[index].measurement}`}
                    className="border-gray-300 focus:border-green-700 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2 placeholder:text-gray-400"
                    value={fruitsVegetablesData[index].quantity}
                    onChange={({ target }) =>
                      handleChangeFruitVegetable(target, "quantity", data.id)
                    }
                  />
                  {index + 1 === fruitsVegetablesData.length ? (
                    <button
                      type="button"
                      className={`${
                        index + 1 === fruitsVegetables.length
                          ? "disabled:border-white disabled:text-white disabled:cursor-auto"
                          : "disabled:border-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                      } px-4 rounded border border-gray-300 bg-gray-50 hover:border-gray-500 disabled:bg-transparent `}
                      disabled={
                        index + 1 === fruitsVegetables.length ||
                        fruitsVegetablesData[index].quantity == 0 ||
                        fruitsVegetablesData[index].quantity == "" ||
                        !fruitsVegetablesData[index].measurement ||
                        fruitsVegetablesData[index].fruit_vegetable_id == null
                      }
                      onClick={() =>
                        setFruitsVegetablesData((old) => [
                          ...old,
                          {
                            fruit_vegetable_id: null,
                            quantity: "",
                            id: uuid(),
                            measurement: "Kilogramos",
                          },
                        ])
                      }
                    >
                      +
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="px-4 text-gray-400 hover:text-gray-900"
                      onClick={() => {
                        setFruitsVegetablesData((old) =>
                          old.filter(
                            (d) => d.id !== fruitsVegetablesData[index].id
                          )
                        );
                      }}
                    >
                      x
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Mensaje
          </label>
          <textarea
            name="message"
            rows="4"
            className={`${
              error?.fields?.name
                ? "border-red-500 focus:border-red-300"
                : "border-gray-300 focus:border-green-700"
            } bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
            onChange={handleInputChange}
            value={message}
          ></textarea>
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
            "Publicar"
          ) : (
            <div className="flex items-center space-x-2">
              <span>Publicando</span>
              <CircularProgress color="inherit" size="1rem" />
            </div>
          )}
        </button>
      </form>
    </DivAnimate>
  );
};
export default AddSale;
