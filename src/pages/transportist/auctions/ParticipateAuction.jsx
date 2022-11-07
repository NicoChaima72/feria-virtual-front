import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import {
  acceptAdminSale,
  activeSale,
  addAuctionTransportist,
  cancelSale,
  getAuctionsForTransportist,
  onClearActive,
  startAuctionTransportist,
} from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../../../utils/utils";
import { useForm } from "../../../hooks/useForm";
import { setSessionStorage } from "../../../utils/session";
import AlertMessage from "../../../components/AlertMessage";

const StartAuctionTransportist = () => {
  const dispatch = useDispatch();
  const { sale_id } = useParams();
  const navigate = useNavigate();
  const { saleActive, loadingActive, error, auctions, loadingAuctions } =
    useSelector((state) => state.sales);
  const { user } = useSelector((state) => state.auth);
  const [optionSelected, setOptionSelected] = useState(null);

  const [formValues, handleInputChange, reset] = useForm({
    price: "",
    message: "",
  });

  const { price, message } = formValues;

  useEffect(() => {
    if (loadingActive && !saleActive) {
      dispatch(activeSale({ idSale: sale_id, roleUser: user.Role.id }));
      dispatch(getAuctionsForTransportist({ saleId: sale_id }));
    }

    return () => {
      dispatch(onClearActive());
    };
  }, []);

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
    const { meta } = await dispatch(
      addAuctionTransportist({
        saleId: sale_id,
        message: message,
        price,
      })
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

      navigate("/transportist/auctions");
    }
  };

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
          <p className="pb-1 text-lg">Información de los productos</p>
          <hr />
          {loadingAuctions ? (
            <div className="flex items-center mt-2">
              <CircularProgress
                size={20}
                style={{ color: "#15803d" }}
              ></CircularProgress>
            </div>
          ) : (
            <div className="pt-4 space-y-4 bg-gray-50">
              {auctions.map((auction) => (
                <div className="border rounded p-3 border-gray-500" key={auction.Producer.id}>
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
            </div>
          )}
          <p className="pb-1 text-lg pt-16">Información del pedido</p>
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

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-1">Participar</h3>
            <hr />
            <div className="mt-4 mb-6">
              <div className="mb-6 mt-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-900 dark:text-gray-300"
                >
                  Precio ofertado ($)
                </label>
                <input
                  type="number"
                  name="price"
                  className="border-gray-300 focus:border-green-700 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400"
                  required
                  value={price}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
            </div>
            <div className="mt-4 mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-gray-900 dark:text-gray-300"
              >
                Observaciones
              </label>
              <textarea
                name="message"
                rows="4"
                className="border-gray-300 focus:border-green-700 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400"
                onChange={handleInputChange}
                value={message}
                // required
                // required
              ></textarea>
              {error?.fields?.observations?.message && (
                <span className="text-xs text-red-500">
                  {error.fields.observations.message}
                </span>
              )}
              <button
                type="submit"
                className="mt-4 flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
              >
                Enviar propuesta
              </button>
            </div>
          </div>
        </form>
      )}
    </DivAnimate>
  );
};
export default StartAuctionTransportist;
