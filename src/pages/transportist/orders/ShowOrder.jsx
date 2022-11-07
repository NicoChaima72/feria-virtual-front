import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import {
  activeSale,
  addAuctionConfirm,
  changeStatusOrder,
  confirmOptionAuctionTransportist,
  getAuctionsBySale,
  getAuctionsForTransportist,
  onClearActive,
} from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../../../utils/utils";
import { useForm } from "../../../hooks/useForm";
import { setSessionStorage } from "../../../utils/session";
import AlertMessage from "../../../components/AlertMessage";
import uuid from "react-uuid";
import feriaApi from "../../../interceptors/feriaInterceptor";

const ShowOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sale_id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const {
    saleActive,
    loadingActive,
    error,
    auctions,
    loadingAuctions,
    loadingAction,
  } = useSelector((state) => state.sales);
  const [options, setOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    if (loadingActive && !saleActive) {
      dispatch(activeSale({ idSale: sale_id, roleUser: user.Role.id }));
      dispatch(getAuctionsForTransportist({ saleId: sale_id }));
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
      setOptions(orders.data.auctions);
      setLoadingOptions(false);
    };

    getAuctions();
  }, []);

  const handleChangeState = async (id) => {
    if (
      !confirm(
        "Al momento de seleccionar esta opcion no se podrá cambiar, estás seguro?"
      )
    )
      return null;

    const { meta } = await dispatch(
      changeStatusOrder({ saleId: sale_id, statusId: id })
    );

    if (meta.requestStatus === "fulfilled" && id === 18) {
      navigate("/transportist/orders");
    }

    if (id == 15) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Resultados de la subasta
      </h1>
      {loadingActive && loadingAuctions ? (
        <div className="flex items-center justify-center mt-7">
          <CircularProgress
            size={30}
            style={{ color: "#15803d" }}
          ></CircularProgress>
        </div>
      ) : !saleActive ? (
        <h1>Pedido no encontrado</h1>
      ) : (
        <div className="mt-5">
          <div className="gap-3">
            <div className="">
              <div className="relative w-full">
                <div className="sticky top-9 p-3 rounded border shadow">
                  <p className="font-semibold pb-1 text-sm">
                    Información del pedido: {saleActive.id}
                  </p>
                  {auctions &&
                    auctions.map((auction) => (
                      <div
                        className={`${
                          saleActive.status_id == 15
                            ? "border-2 border-green-500"
                            : "border"
                        } rounded p-3 `}
                        key={auction.Producer.id}
                      >
                        <div className="mt-2">
                          <label className="block text-sm text-gray-900 dark:text-gray-300">
                            Productos
                          </label>
                          <table className="mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="py-3 px-6">
                                  Fruta Verdura
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Cantidad
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {auction.Offers.map((offer) => (
                                <tr
                                  className="bg-white dark:bg-gray-800 dark:border-gray-700"
                                  key={offer.FruitVegetable.id}
                                >
                                  <th
                                    scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {offer.FruitVegetable.name}
                                  </th>
                                  <td className="py-4 px-6">
                                    {offer.quantity} {offer.measurement}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-4 text-lg mb-2">
                          Información del productor
                        </div>
                        <div className="mb-2">
                          <label className="block text-xs text-gray-900 dark:text-gray-300">
                            RUT
                          </label>
                          <p className="text-sm font-medium">
                            {auction.Producer.rut}
                          </p>
                        </div>
                        <div className="mb-2">
                          <label className="block text-xs text-gray-900 dark:text-gray-300">
                            Nombre
                          </label>
                          <p className="text-sm font-medium">
                            {auction.Producer.name}
                          </p>
                        </div>
                        <div className="mb-2">
                          <label className="block text-xs text-gray-900 dark:text-gray-300">
                            Razón social
                          </label>
                          <p className="text-sm font-medium">
                            {auction.Producer.business_name}
                          </p>
                        </div>
                        <div className="pt-2">
                          <label className="block text-xs text-gray-900 dark:text-gray-300">
                            Region
                          </label>
                          <p className="text-sm font-medium">
                            {auction.Producer.region}
                          </p>
                        </div>
                        <div className="pt-2">
                          <label className="block text-xs text-gray-900 dark:text-gray-300">
                            Comuna
                          </label>
                          <p className="text-sm font-medium">
                            {auction.Producer.commune}
                          </p>
                        </div>
                        <div className="pt-2">
                          <label className="block text-xs text-gray-900 dark:text-gray-300">
                            Calle
                          </label>
                          <p className="text-sm font-medium">
                            {auction.Producer.street}
                          </p>
                        </div>
                        <div className="pt-2">
                          <label className="block text-xs text-gray-900 dark:text-gray-300">
                            Observaciones
                          </label>
                          {auction.Producer.observations ? (
                            <p className="text-sm font-medium">
                              {auction.Producer.street}
                            </p>
                          ) : (
                            <p className="text-sm">Sin observaciones</p>
                          )}
                        </div>
                        <div className="pt-2">
                          <label className="block text-xs text-gray-900 dark:text-gray-300">
                            Link direccion
                          </label>
                          <a
                            href={auction.Producer.direction_url}
                            target="_blank"
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                          >
                            Ver dirección en Google Maps
                          </a>
                        </div>
                      </div>
                    ))}
                  <div>
                    <p className="pb-1 text-lg pt-16">
                      Información del cliente
                    </p>
                    <hr />
                    <div
                      className={`${
                        saleActive.status_id == 17
                          ? "border-2 border-green-500"
                          : "border"
                      } p-2`}
                    >
                      <div className="pt-4">
                        <label className="block text-sm text-gray-900 dark:text-gray-300">
                          RUT
                        </label>
                        <p className="text-lg font-medium">
                          {saleActive.Client.rut}
                        </p>
                      </div>
                      <div className="pt-2">
                        <label className="block text-sm text-gray-900 dark:text-gray-300">
                          Nombre
                        </label>
                        <p className="text-lg font-medium">
                          {saleActive.Client.name}
                        </p>
                      </div>
                      <div className="pt-2">
                        <label className="block text-sm text-gray-900 dark:text-gray-300">
                          Email
                        </label>
                        <p className="text-lg font-medium">
                          {saleActive.Client.email}
                        </p>
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
                        <p className="text-lg font-medium">
                          {saleActive.Client.region}
                        </p>
                      </div>
                      <div className="pt-2">
                        <label className="block text-sm text-gray-900 dark:text-gray-300">
                          Comuna
                        </label>
                        <p className="text-lg font-medium">
                          {saleActive.Client.commune}
                        </p>
                      </div>
                      <div className="pt-2">
                        <label className="block text-sm text-gray-900 dark:text-gray-300">
                          Calle
                        </label>
                        <p className="text-lg font-medium">
                          {saleActive.Client.street}
                        </p>
                      </div>
                      <div className="pt-2">
                        <label className="block text-sm text-gray-900 dark:text-gray-300">
                          Observaciones
                        </label>
                        {saleActive.Client.observations ? (
                          <p className="text-lg font-medium">
                            {saleActive.Client.street}
                          </p>
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
                          Ver dirección en eGoogle Maps
                        </a>
                      </div>
                    </div>
                  </div>
                  {saleActive.status_id == 13 && (
                    <button
                      type="button"
                      onClick={() => handleChangeState(15)}
                      className="mt-8 flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                    >
                      Comenzar entrega
                    </button>
                  )}
                  {saleActive.status_id == 15 && (
                    <button
                      type="button"
                      onClick={() => handleChangeState(17)}
                      className="mt-8 flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                    >
                      Confirmar productos recogidos
                    </button>
                  )}
                  {saleActive.status_id == 17 && (
                    <button
                      type="button"
                      onClick={() => handleChangeState(18)}
                      className="mt-8 flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                    >
                      Confirmar entrega al cliente
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DivAnimate>
  );
};
export default ShowOrder;
