import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import {
  acceptAdminSale,
  activeSale,
  cancelSale,
  changeStatusOrder,
  getResultAuctionProducers,
  onClearActive,
} from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../../../utils/utils";
import { useForm } from "../../../hooks/useForm";
import { setSessionStorage } from "../../../utils/session";
import AlertMessage from "../../../components/AlertMessage";
import feriaApi from "../../../interceptors/feriaInterceptor";

const ReceivdeOrder = () => {
  const dispatch = useDispatch();
  const { sale_id } = useParams();
  const navigate = useNavigate();
  const { saleActive, loadingActive, error, auctions, loadingAuctions } =
    useSelector((state) => state.sales);
  const { user } = useSelector((state) => state.auth);
  const [optionSelected, setOptionSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [newAuctions, setNewAuctions] = useState([]);

  const [formValues, handleInputChange, reset] = useForm({
    observations: "",
  });

  const { observations } = formValues;

  useEffect(() => {
    if (loadingActive && !saleActive) {
      dispatch(activeSale({ idSale: sale_id, roleUser: user.Role.id }));
      dispatch(getResultAuctionProducers({ idSale: sale_id }));
    }

    return () => {
      dispatch(onClearActive());
    };
  }, []);

  useEffect(() => {
    const getAuctions = async () => {
      const orders = await feriaApi.get(
        `/transportists/auctions/${sale_id}/auctions/confirm`
      );

      setOptions(orders.data.auctions.filter((o) => o.state == 1));
      setLoadingOptions(false);
    };

    getAuctions();
  }, []);

  useEffect(() => {
    if (!!auctions && auctions.length > 0)
      console.log({
        auctions: auctions.reduce((acc, obj) => acc + obj.price - 0, 0),
      });
  }, [auctions]);

  useEffect(() => {
    if (!auctions) return;

    const uniqueIds = new Set();

    const d = auctions.filter((element) => {
      const isDuplicate = uniqueIds.has(element.id);

      uniqueIds.add(element.id);

      if (!isDuplicate) {
        return true;
      }

      return false;
    });

    setNewAuctions(d);
  }, [auctions]);

  const handleOptionSelected = (option) => {
    setOptionSelected(option);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 60);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (optionSelected === 1) {
      const { meta } = await dispatch(
        changeStatusOrder({ saleId: sale_id, statusId: 19 })
      );
      if (meta.requestStatus === "rejected")
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      if (meta.requestStatus === "fulfilled") {
        setSessionStorage({
          message: "Pedido aceptado correctamente",
          type: "success",
        });

        navigate("/admin/sales");
      }
    } else {
      const { meta } = await dispatch(
        cancelSale({
          roleUser: user.role_id,
          saleId: sale_id,
          statusId: 20,
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

        navigate("/admin/sales");
      }
    }
  };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">Entrega recibida</h1>
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
          <p className="pb-1 text-lg">Información del pedido</p>
          <hr />
          {!loadingOptions &&
            options.map((option) => (
              <div className="border shadow rounded p-2" key={option.id}>
                <p className="text-lg">{option.Transportist.name}</p>
                <hr />
                <div className="mb-2 mt-4">
                  <label className="text-sm block text-gray-900 dark:text-gray-300">
                    Precio
                  </label>
                  <p className="font-medium">$ {option.price}</p>
                </div>
                <div className="mb-2">
                  <label className="text-sm block text-gray-900 dark:text-gray-300">
                    Mensaje
                  </label>
                  <p className="font-medium">
                    {option.message ? option.message : "Sin mensaje."}
                  </p>
                </div>
                <div className="mb-2">
                  <label className="text-sm block text-gray-900 dark:text-gray-300">
                    Telefono
                  </label>
                  <p className="font-medium">{option.Transportist.phone}</p>
                </div>
              </div>
            ))}

          {loadingAuctions ? (
            <div className="flex items-center mt-2">
              <CircularProgress
                size={20}
                style={{ color: "#15803d" }}
              ></CircularProgress>
            </div>
          ) : (
            <div className="space-y-1 mt-10">
              <div className="mt-4">
                <table className="text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        Fruta Verdura
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Cantidad
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {newAuctions.map((auction) => (
                      <tr
                        className="bg-white dark:bg-gray-800 dark:border-gray-700"
                        key={auction.id}
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {auction.name}
                        </th>
                        <td className="py-4 px-6">
                          {auction.quantity}{" "}
                          {
                            saleActive.FruitsVegetables.filter(
                              (fv) => fv.id === auction.id
                            )[0].measurement
                          }
                        </td>
                        <td className="py-4 px-6">$ {auction.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {!loadingAuctions && !loadingOptions && (
            <p className="mt-6 text-xl font-semibold">
              TOTAL: ${" "}
              {auctions.reduce((acc, obj) => acc + obj.price - 0, 0) +
                options.reduce((acc, obj) => acc + obj.price - 0, 0)}
            </p>
          )}
          <div className="pt-8">
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

          <div className="mt-10 flex space-x-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
              onClick={() => handleOptionSelected(1)}
            >
              Confirmar recepcion
            </button>
            <button
              type="button"
              onClick={() => handleOptionSelected(2)}
              className="flex items-center justify-center gap-2 text-red-500 hover:text-red-700 font-medium rounded text-sm w-full sm:w-auto px-5 py-2 text-center border border-red-300 hover:border-red-500"
            >
              Rechazar recepcion
            </button>
          </div>

          {optionSelected && (
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-1">
                Estado:{" "}
                <span>{optionSelected == 1 ? "ACEPTADO" : "RECHAZADO"}</span>
              </h3>
              <hr />
              {optionSelected == 1 ? (
                <div className="mt-4 mb-6">
                  <p className="text-green-700">
                    IMPORTANTE: Al momento de aceptar el pedido automaticamente
                    se cerrará la venta.
                  </p>
                  <button
                    type="submit"
                    className="mt-6 flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                  >
                    Enviar resultado
                  </button>
                </div>
              ) : (
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
                    Enviar resultado
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      )}
    </DivAnimate>
  );
};
export default ReceivdeOrder;
