import DivAnimate from "../../../components/DivAnimate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFruitsAndVegetables } from "../../../features/fruitsVegetablesSlice";
import AlertMessage from "../../../components/AlertMessage";
import { useForm } from "../../../hooks/useForm";
import Select from "react-select";
import feriaApi from "../../../interceptors/feriaInterceptor";
import {
  activeSale,
  addAuctionProducer,
  createSale,
  onClearActive,
} from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { setSessionStorage } from "../../../utils/session";
import { formatDate } from "../../../utils/utils";

const ParticipateAuction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sale_id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { error, loadingAction, saleActive, loadingActive } = useSelector(
    (state) => state.sales
  );

  const [fruitsVegetablesData, setfruitsVegetablesData] = useState(null);

  const [formValues, handleInputChange, reset] = useForm({
    message: "",
  });
  const { message } = formValues;

  useEffect(() => {
    if (loadingActive && !saleActive) {
      dispatch(activeSale({ idSale: sale_id, roleUser: user.Role.id }));
    }

    return () => {
      dispatch(onClearActive());
    };
  }, []);

  useEffect(() => {
    if (saleActive && !loadingActive) {
      const fruitsVegetablesByUser = saleActive.FruitsVegetables.filter((s) =>
        user.fruits_vegetables.includes(s.name)
      );

      const options = fruitsVegetablesByUser.map((f) => ({
        ...f,
        unitPrice: "",
        quantityProducer: "",
      }));

      setfruitsVegetablesData(options);
    }
  }, [saleActive, loadingActive]);

  const handleChangeFruitVegetable = (data, type, id) => {
    setfruitsVegetablesData((old) =>
      old.map((d) =>
        d.id === id
          ? type === "unitPrice"
            ? { ...d, unitPrice: data.value }
            : { ...d, quantityProducer: data.value }
          : d
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = fruitsVegetablesData.filter(
      (f) => f.quantityProducer && f.unitPrice
    );
    if (data.length === 0) {
      alert("Debes ofertar a lo menos 1 producto");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return null;
    }

    data = {
      sale_id,
      message,
      fruits_vegetables: data.map((d) => ({
        fruit_vegetable_id: d.id,
        quantity: d.quantityProducer,
        unitPrice: d.unitPrice,
      })),
    };

    const { meta } = await dispatch(
      addAuctionProducer({
        auction: data,
      })
    );

    if (meta.requestStatus === "rejected")
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      if (meta.requestStatus === "fulfilled") {
        setSessionStorage({
          message: "Oferta publicada correctamente",
          type: "success",
        });

        navigate("/producer/auctions");
      }
  };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">Crear oferta</h1>
      {loadingActive ? (
        <div className="flex items-center justify-center mt-7">
          <CircularProgress
            size={30}
            style={{ color: "#15803d" }}
          ></CircularProgress>
        </div>
      ) : !saleActive ? (
        <h1>Pedido no encontrado</h1>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="border p-4 mt-5 shadow rounded"
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
              Nueva oferta
            </label>
            <div className="space-y-4">
              {!!fruitsVegetablesData &&
                fruitsVegetablesData.map((fv, index) => (
                  <div
                    className="grid grid-cols-12 gap-y-2 gap-x-4 border-b pb-3"
                    key={fv.id}
                  >
                    <div className="col-span-12 md:col-span-4 text-lg">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Pedido
                      </label>
                      <div className="flex items-center">
                        <span
                          className={`${
                            fruitsVegetablesData[index].quantityProducer &&
                            fruitsVegetablesData[index].unitPrice
                              ? "bg-green-500"
                              : fruitsVegetablesData[index].quantityProducer ||
                                fruitsVegetablesData[index].unitPrice
                              ? "bg-yellow-300"
                              : "bg-red-500"
                          } p-1 inline-block rounded-full mr-1`}
                        ></span>
                        <p>
                          {fv.name} - {fv.quantity} {fv.measurement}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-4 text-lg">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Cantidad ofrecida
                      </label>
                      <input
                        type="number"
                        placeholder={``}
                        className="border-gray-300 focus:border-green-700 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2 placeholder:text-gray-400"
                        value={fruitsVegetablesData[index].quantityProducer}
                        max={fv.quantity}
                        required={!!fruitsVegetablesData[index].unitPrice}
                        onChange={({ target }) =>
                          handleChangeFruitVegetable(
                            target,
                            "quantityProducer",
                            fv.id
                          )
                        }
                      />
                    </div>
                    <div className="col-span-6 md:col-span-4 text-lg">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Precio unitario (CLP)
                      </label>
                      <input
                        type="number"
                        placeholder={`$`}
                        className="border-gray-300 focus:border-green-700 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2 placeholder:text-gray-400"
                        value={fruitsVegetablesData[index].unitPrice}
                        required={
                          !!fruitsVegetablesData[index].quantityProducer
                        }
                        onChange={({ target }) =>
                          handleChangeFruitVegetable(target, "unitPrice", fv.id)
                        }
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-gray-900 dark:text-gray-300"
              >
                Mensaje
              </label>
              <textarea
                name="message"
                rows="4"
                className="border-gray-300 focus:border-green-700 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400"
                onChange={handleInputChange}
                value={message}
              ></textarea>
              {error?.fields?.message?.message && (
                <span className="text-xs text-red-500">
                  {error.fields.message.message}
                </span>
              )}
            </div>
          </div>
          <p className="pt-16 pb-1 text-lg">Detalles del pedido</p>
          <hr />
          <div className="pt-4">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Orden de compra
            </label>
            <p className="text-lg font-medium">{saleActive.id}</p>
          </div>
          <div className="pt-4">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Fecha pedido
            </label>
            <p className="text-lg font-medium">
              {formatDate(saleActive.created_at, "DD/MM/YYYY HH:mm")}
            </p>
          </div>
          <div className="pt-4">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Estado
            </label>
            <p className="text-lg font-medium">
              {saleActive.Status.description}
            </p>
          </div>
          <div className="pt-4">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Productos
            </label>
            <div className="space-y-1">
              {saleActive.FruitsVegetables.map((fv) => (
                <p className="text-lg font-medium" key={fv.id}>
                  <span>{fv.name}</span> - {fv.quantity} {fv.measurement}.
                </p>
              ))}
            </div>
          </div>
          <div className="pt-6">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Mensaje
            </label>
            {!!saleActive.message ? (
              <p className="text-lg font-medium">{saleActive.message}</p>
            ) : (
              <p className="text-lg">Sin mensaje.</p>
            )}
          </div>

          <p className="pb-1 text-lg pt-16">Información del cliente</p>
          <hr />
          <div className="pt-4">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              RUT
            </label>
            <p className="text-lg font-medium">{saleActive.Client.rut}</p>
          </div>
          <div className="pt-2">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Nombre
            </label>
            <p className="text-lg font-medium">{saleActive.Client.name}</p>
          </div>
          <div className="pt-2">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Email
            </label>
            <p className="text-lg font-medium">{saleActive.Client.email}</p>
          </div>
          <div className="pt-2 pb-2">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Razón social
            </label>
            <p className="text-lg font-medium">
              {saleActive.Client.bussiness_name}
            </p>
          </div>
          <hr />
          <div className="pt-2">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Region
            </label>
            <p className="text-lg font-medium">{saleActive.Client.region}</p>
          </div>

          <button
            type="submit"
            className="mt-10 flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
            disabled={loadingAction}
          >
            {!loadingAction ? (
              "Publicar oferta"
            ) : (
              <div className="flex items-center space-x-2">
                <span>Publicando</span>
                <CircularProgress color="inherit" size="1rem" />
              </div>
            )}
          </button>
        </form>
      )}
    </DivAnimate>
  );
};
export default ParticipateAuction;
