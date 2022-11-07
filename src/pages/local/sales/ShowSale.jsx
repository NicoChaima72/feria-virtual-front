import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import {
  acceptAdminSale,
  activeSale,
  cancelSale,
  onClearActive,
} from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../../../utils/utils";
import { useForm } from "../../../hooks/useForm";
import { setSessionStorage } from "../../../utils/session";
import AlertMessage from "../../../components/AlertMessage";
import feriaApi from "../../../interceptors/feriaInterceptor";

const ShowSale = () => {
  const dispatch = useDispatch();
  const { sale_id } = useParams();
  const navigate = useNavigate();
  const { saleActive, loadingActive, error } = useSelector(
    (state) => state.sales
  );
  const { user } = useSelector((state) => state.auth);
  const [optionSelected, setOptionSelected] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const [formValues, handleInputChange, reset] = useForm({
    observations: "",
    auction_duration: 48,
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

  useEffect(() => {
    const getHistory = async () => {
      const { data } = await feriaApi.get(`/admin/sales/${sale_id}/history`);
      setHistory(data.history);
      setLoadingHistory(false);
    };

    getHistory();
  }, []);

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Detalles del pedido
      </h1>
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
        <div className="border p-4 mt-5 shadow rounded">
          {error?.message && (
            <div className="mb-4">
              <AlertMessage
                type={error.message.type}
                message={error.message.message}
              ></AlertMessage>
            </div>
          )}
          <p className="pb-1 text-lg">Información del pedido</p>
          <hr />
          {!loadingHistory &&
            history.map((h) => (
              <div className="pt-5 leading-tight" key={h.status_id}>
                <p className="text-lg font-medium">{h.Status.description}</p>
                <span className="text-sm">
                  {formatDate(h.created_at, "DD MMM YYYY - HH:mm")}
                </span>
              </div>
            ))}
          <div className="pt-10 pb-10">
            <hr />
          </div>
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
              Ver dirección en Google Maps
            </a>
          </div>
        </div>
      )}
    </DivAnimate>
  );
};
export default ShowSale;
