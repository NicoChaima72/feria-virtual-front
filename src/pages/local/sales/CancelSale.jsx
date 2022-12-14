import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import {
  activeSale,
  cancelSale,
  onClearActive,
} from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../../../utils/utils";
import { useForm } from "../../../hooks/useForm";
import { setSessionStorage } from "../../../utils/session";
import AlertMessage from "../../../components/AlertMessage";

const CancelSale = () => {
  const dispatch = useDispatch();
  const { sale_id } = useParams();
  const navigate = useNavigate();
  const { saleActive, loadingActive, error } = useSelector(
    (state) => state.sales
  );
  const { user } = useSelector((state) => state.auth);

  const [formValues, handleInputChange, reset] = useForm({
    observations: "",
  });

  const { observations, auction_duration } = formValues;

  useEffect(() => {
    if (loadingActive && !saleActive) {
      dispatch(activeSale({ idSale: sale_id, roleUser: user.Role.id }));
    }

    return () => {
      dispatch(onClearActive());
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { meta } = await dispatch(
      cancelSale({
        roleUser: user.role_id,
        saleId: sale_id,
        statusId: 21,
        observations,
      })
    );

    if (meta.requestStatus === "rejected")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (meta.requestStatus === "fulfilled") {
      setSessionStorage({
        message: "Pedido rechazado correctamente",
        type: "success",
      });

      navigate("/local/sales");
    }
  };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">Cancelar pedido</h1>
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
          <p className="pb-1 text-lg">Informaci??n del pedido</p>
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

          <p className="pb-1 text-lg pt-16">Informaci??n del cliente</p>
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
              Raz??n social
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
          <div className="pt-2">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Comuna
            </label>
            <p className="text-lg font-medium">{saleActive.Client.commune}</p>
          </div>
          <div className="pt-2">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Calle
            </label>
            <p className="text-lg font-medium">{saleActive.Client.street}</p>
          </div>
          <div className="pt-2">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Observaciones
            </label>
            {saleActive.Client.observations ? (
              <p className="text-lg font-medium">{saleActive.Client.street}</p>
            ) : (
              <p className="text-lg">Sin observaciones</p>
            )}
          </div>
          <div className="pt-2">
            <label className="block text-sm text-gray-900 dark:text-gray-300">
              Link direccion
            </label>
            <a
              href={saleActive.Client.direction_url}
              target="_blank"
              className="text-lg text-blue-600 hover:text-blue-800 underline"
            >
              Ver direcci??n en Google Maps
            </a>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-1">
              Accion: <span>CANCELAR PEDIDO</span>
            </h3>
            <hr />

            <div className="mt-4 mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-gray-900 dark:text-gray-300"
              >
                Observaciones
              </label>
              <textarea
                name="observations"
                rows="4"
                className="border-gray-300 focus:border-green-700 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400"
                onChange={handleInputChange}
                value={observations}
                required
                // required
              ></textarea>
              {error?.fields?.observations?.message && (
                <span className="text-xs text-red-500">
                  {error.fields.observations.message}
                </span>
              )}
              <button
                type="submit"
                className="mt-6 flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400"
              >
                Cancelar pedido
              </button>
            </div>
          </div>
        </form>
      )}
    </DivAnimate>
  );
};
export default CancelSale;
