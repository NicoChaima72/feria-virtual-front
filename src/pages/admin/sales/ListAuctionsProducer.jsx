import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import {
  activeSale,
  addAuctionConfirm,
  getAuctionsBySale,
  onClearActive,
} from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../../../utils/utils";
import { useForm } from "../../../hooks/useForm";
import { setSessionStorage } from "../../../utils/session";
import AlertMessage from "../../../components/AlertMessage";
import uuid from "react-uuid";

const ListAuctionsProducer = () => {
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

  const [selectedAuctionId, setSelectedAuctionId] = useState(null);
  const [dataSelected, setDataSelected] = useState([]);
  const [auctionSelectedOptions, setAuctionSelectedOptions] = useState({});
  const [action, setAction] = useState("");
  const [type, setType] = useState("");
  const [remainingProducts, setRemainingProducts] = useState([]);

  useEffect(() => {
    if (loadingActive && !saleActive) {
      dispatch(activeSale({ idSale: sale_id, roleUser: user.Role.id }));
      dispatch(getAuctionsBySale({ idSale: sale_id }));
    }

    return () => {
      dispatch(onClearActive());
    };
  }, []);

  useEffect(() => {
    if (!loadingActive && saleActive) {
      setRemainingProducts(
        saleActive.FruitsVegetables.map((fv) => ({
          ...fv,
          totalQuantity: fv.quantity,
        }))
      );
    }
  }, [saleActive]);

  useEffect(() => {
    let data = remainingProducts.map((r) => ({
      ...r,
      quantity:
        r.quantity -
        (dataSelected
          .map((d) => d.options)
          .flat()
          .filter((d) => d.FruitVegetable.id === r.id).length > 0
          ? dataSelected
              .map((d) => d.options)
              .flat()
              .filter((d) => d.FruitVegetable.id === r.id)
              .reduce((acc, obj) => acc + obj.quantitySelected, 0)
          : 0),
    }));
    setRemainingProducts((old) =>
      old.map((r) => ({
        ...r,
        quantity:
          r.totalQuantity -
          (dataSelected
            .map((d) => d.options)
            .flat()
            .filter((d) => d.FruitVegetable.id === r.id).length > 0
            ? dataSelected
                .map((d) => d.options)
                .flat()
                .filter((d) => d.FruitVegetable.id === r.id)
                .reduce((acc, obj) => acc * 1 + obj.quantitySelected * 1, 0)
            : 0),
      }))
    );
  }, [dataSelected]);

  const handleQuantityChange = ({ value }, option) => {
    if (value > option.quantity || value < 0) return null;

    value = value.replace(/\D/g, "");

    setAuctionSelectedOptions((old) =>
      old.map((o) =>
        o.id === option.id
          ? { ...o, quantitySelected: value ? value * 1 : "" }
          : o
      )
    );
  };

  const handleCancelOption = () => {
    setSelectedAuctionId(null);
    setAction("");
    setType("");
  };

  const handleAddAuction = (auction) => {
    setAction("add");
    setType("auctions");
    setSelectedAuctionId(auction.id);
    setAuctionSelectedOptions(
      auction.Offers.map((a) => ({
        ...a,
        quantitySelected: a.quantity,
        id: uuid(),
        measurement: saleActive.FruitsVegetables.filter(
          (f) => f.id === a.FruitVegetable.id
        )[0].measurement,
      }))
    );
  };

  const addAuction = (auction) => {
    setDataSelected((old) => [
      ...old,
      {
        ...auction,
        options: auctionSelectedOptions.map((a) => ({
          ...a,
          quantitySelected: a.quantitySelected * 1,
        })),
      },
    ]);
    setSelectedAuctionId(null);
    setAction("");
    setType("");
  };

  const handleEditAuction = (auction) => {
    setAction("edit");
    setSelectedAuctionId(auction.id);
    setAuctionSelectedOptions(
      dataSelected.filter((d) => d.id === auction.id)[0].options
    );
    setType("auctions");
  };

  const editAuction = (auction) => {
    setDataSelected((old) =>
      old.map((o) =>
        o.id === auction.id ? { ...o, options: auctionSelectedOptions } : o
      )
    );
    setSelectedAuctionId(null);
    setAction("");
    setType("");
  };

  const handleRemoveDataSelected = (auction) => {
    if (confirm("¿Eliminar seleccionado?")) {
      setDataSelected((old) => old.filter((o) => o.id !== auction.id));
    }
  };

  const handleEditSelected = (selected) => {
    setType("selected");
    setAction("edit");
    setSelectedAuctionId(selected.id);
    setAuctionSelectedOptions(
      dataSelected.filter((d) => d.id === selected.id)[0].options
    );
  };

  const handleSend = async () => {
    if (!confirm("Seguro que has terminado la cotizacion?")) return null;

    let data = [];

    dataSelected.forEach((s, index) => {
      s.options.forEach((o) => {
        o.quantitySelected > 0 &&
          data.push({
            auction_id: dataSelected[index].id,
            user_id: dataSelected[index].Producer.id,
            fruit_vegetable_id: o.FruitVegetable.id,
            quantity: o.quantitySelected,
            price: o.unitPrice,
          });
      });
    });

    const { meta } = await dispatch(
      addAuctionConfirm({ data: { sale_id, data } })
    );
    if (meta.requestStatus === "rejected")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (meta.requestStatus === "fulfilled") {
      setSessionStorage({
        message: "Cotización enviada correctamente",
        type: "success",
      });

      navigate("/admin/sales");
    }
  };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Resultados de la subasta
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
        <div className="mt-5">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-6">
              {loadingAuctions ? (
                <div className="flex items-center justify-center mt-7">
                  <CircularProgress
                    size={30}
                    style={{ color: "#15803d" }}
                  ></CircularProgress>
                </div>
              ) : (
                <div className="space-y-10">
                  {auctions.map((auction) => (
                    <div className="border rounded p-3 shadow" key={auction.id}>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-medium pb-1">
                          {auction.Producer.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ID:{" "}
                          <span className="font-semibold">{auction.id}</span>
                        </p>
                      </div>
                      <hr />
                      <div className="mt-3 mb-4">
                        <label className="block font-semibold text-sm text-gray-900 dark:text-gray-300">
                          Productos ofrecidos
                        </label>
                        <div className="space-y-3">
                          {auction.Offers.map((offer) => (
                            <div
                              className=""
                              key={auction.id + offer.FruitVegetable.id}
                            >
                              <p className="text-sm font-normal">
                                {offer.FruitVegetable.name} - {offer.quantity}{" "}
                                {
                                  saleActive.FruitsVegetables.filter(
                                    (f) => f.id == offer.FruitVegetable.id
                                  )[0].measurement
                                }{" "}
                              </p>
                              <p className="text-xs font-normal">
                                Precio unitario: $ {offer.unitPrice}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {!!auction.message && (
                        <div className="mb-2">
                          <label className="font-semibold block text-sm text-gray-900 dark:text-gray-300">
                            Mensaje
                          </label>
                          <p className="text-sm font-normal">
                            {auction.message}
                          </p>
                        </div>
                      )}

                      <div className="mb-2">
                        <label className="font-semibold block text-sm text-gray-900 dark:text-gray-300">
                          Region
                        </label>
                        <p className="text-sm font-normal">
                          {auction.Producer.region}
                        </p>
                      </div>
                      <div className="mb-4">
                        <label className="font-semibold block text-sm text-gray-900 dark:text-gray-300">
                          Comuna
                        </label>
                        <p className="text-sm font-normal">
                          {auction.Producer.commune}
                        </p>
                      </div>
                      <hr />
                      {/* si está seleccionado esa opcion */}
                      {selectedAuctionId === auction.id &&
                      type == "auctions" ? (
                        <div className="mt-3 space-y-4">
                          {auctionSelectedOptions.map((options) => (
                            <div
                              className="grid grid-cols-12 gap-3"
                              key={options.id}
                            >
                              <div className="col-span-3">
                                <label className="block text-xs font-semibold text-gray-900 dark:text-gray-300">
                                  Producto
                                </label>
                                <p>{options.FruitVegetable.name}</p>
                              </div>
                              <div className="col-span-3">
                                <label className="block text-xs font-semibold text-gray-900 dark:text-gray-300">
                                  Cantidad (&lt; {options.quantity})
                                </label>
                                <div className="flex flex-nowrap items-center">
                                  <input
                                    type="text"
                                    className="border-gray-300 focus:border-green-700 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-1 placeholder:text-gray-400"
                                    required
                                    value={options.quantitySelected}
                                    onChange={({ target }) =>
                                      handleQuantityChange(target, options)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-900 dark:text-gray-300">
                                  $ Unitario
                                </label>
                                <div className="flex flex-nowrap items-center">
                                  <span className="ml-1">
                                    ${options.unitPrice}
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-3">
                                <label className="block text-xs font-semibold text-gray-900 dark:text-gray-300">
                                  Total
                                </label>
                                <div className="flex flex-nowrap items-center">
                                  <span className="">
                                    ${" "}
                                    {options.unitPrice *
                                      options.quantitySelected}
                                  </span>
                                </div>
                              </div>
                              <div className="col-span-1">
                                {options.quantitySelected > 0 && (
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(
                                        { value: "" },
                                        options
                                      )
                                    }
                                    className="block mt-3 text-red-400"
                                  >
                                    x
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                          <div className="">
                            <hr />
                          </div>
                          <div className="flex justify-between items-center">
                            <p>
                              Total: ${" "}
                              {auctionSelectedOptions.reduce(
                                (accumulator, object) =>
                                  accumulator +
                                  object.quantitySelected * object.unitPrice,
                                0
                              )}
                            </p>
                            <div className="flex items-center space-x-1">
                              <button
                                type="button"
                                className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-4 py-1.5 text-center bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400"
                                onClick={handleCancelOption}
                              >
                                Cancelar
                              </button>
                              {action === "add" ? (
                                <button
                                  type="button"
                                  className="disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white font-medium rounded text-sm px-4 py-1.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                                  onClick={() => addAuction(auction)}
                                  disabled={
                                    auctionSelectedOptions.reduce(
                                      (accumulator, object) =>
                                        accumulator +
                                        object.quantitySelected *
                                          object.unitPrice,
                                      0
                                    ) <= 0
                                  }
                                >
                                  Agregar
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white font-medium rounded text-sm px-4 py-1.5 text-center bg-gradient-to-r from-sky-700 to-sky-500 hover:from-sky-600 hover:to-sky-400"
                                  onClick={() => editAuction(auction)}
                                  disabled={
                                    auctionSelectedOptions.reduce(
                                      (accumulator, object) =>
                                        accumulator +
                                        object.quantitySelected *
                                          object.unitPrice,
                                      0
                                    ) <= 0
                                  }
                                >
                                  Guardar
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : // si esa opcion ya se encuentra registrada
                      dataSelected.map((d) => d.id).includes(auction.id) ? (
                        <div className="flex justify-start mt-3">
                          <button
                            type="button"
                            className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm px-4 py-1.5 text-center bg-gradient-to-r from-sky-700 to-sky-500 hover:from-sky-600 hover:to-sky-400"
                            disabled={!!selectedAuctionId}
                            onClick={() => handleEditAuction(auction)}
                          >
                            Editar
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-start mt-3">
                          <button
                            type="button"
                            className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm px-4 py-1.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                            disabled={!!selectedAuctionId}
                            onClick={() => handleAddAuction(auction)}
                          >
                            Seleccionar
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-6">
              <div className="relative w-full">
                <div className="sticky top-0 p-3 rounded border shadow">
                  <p className="font-semibold pb-1 text-sm">
                    Información del pedido: {saleActive.id}
                  </p>
                  <hr />
                  <div className="pt-4 pb-3">
                    <label className="font-semibold block text-sm text-gray-900 dark:text-gray-300">
                      Productos restantes
                    </label>
                    <div className="space-y-1">
                      {remainingProducts.map((fv) => (
                        <p
                          className={`${
                            fv.quantity === 0
                              ? "text-green-500"
                              : fv.quantity < 0
                              ? "text-red-500"
                              : ""
                          } text-sm font-normal`}
                          key={fv.id}
                        >
                          <span>{fv.name}</span> - {fv.quantity}{" "}
                          {fv.measurement}.
                        </p>
                      ))}
                    </div>
                  </div>
                  <hr />
                  <div className="pt-3">
                    <label className="font-semibold block text-sm text-gray-900 dark:text-gray-300">
                      Productos
                    </label>
                    <div className="space-y-1">
                      {saleActive.FruitsVegetables.map((fv) => (
                        <p className="text-sm font-normal" key={fv.id}>
                          <span>{fv.name}</span> - {fv.quantity}{" "}
                          {fv.measurement}.
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <label className="font-semibold block text-sm text-gray-900 dark:text-gray-300">
                      Mensaje
                    </label>
                    {!!saleActive.message ? (
                      <p className="text-sm font-normal">
                        {saleActive.message}
                      </p>
                    ) : (
                      <p className="text-sm">Sin mensaje.</p>
                    )}
                  </div>
                  {dataSelected.length > 0 && (
                    <div className="">
                      <div className="pt-4">
                        <hr />
                      </div>
                      <div className="mt-4">
                        <label className="font-semibold block text-sm text-gray-900 dark:text-gray-300">
                          Seleccionados
                        </label>
                        <div className="mt-2 space-y-7">
                          {dataSelected.map((selected) => (
                            <div
                              className="border rounded p-2"
                              key={selected.id}
                            >
                              <div className="flex items-center justify-between pb-1">
                                <p className="font-medium text-sm">
                                  {selected.Producer.name}
                                </p>
                                <p className="text-xs">
                                  ID:{" "}
                                  <span className="font-medium">
                                    {selected.id}
                                  </span>
                                </p>
                              </div>
                              <hr />
                              <div className="space-y-3 mt-2">
                                {selected.options.map((option) => (
                                  <div
                                    className="flex items-center justify-between"
                                    key={option.id}
                                  >
                                    <div className="">
                                      {/* <pre>{JSON.stringify(option)}</pre> */}

                                      <p className="text-sm">
                                        {option.FruitVegetable.name} -{" "}
                                        {option.quantitySelected}{" "}
                                        {option.measurement}
                                      </p>
                                      <p className="text-xs">
                                        Precio unitario: $ {option.unitPrice}
                                      </p>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      ${" "}
                                      {option.quantitySelected *
                                        option.unitPrice}
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="pt-3 pb-2">
                                <hr />
                              </div>
                              <div className="flex items-center justify-between py-1">
                                <p>
                                  Total: ${" "}
                                  {selected.options.reduce(
                                    (accumulator, object) =>
                                      accumulator +
                                      object.quantitySelected *
                                        object.unitPrice,
                                    0
                                  )}
                                </p>
                                {!(
                                  selectedAuctionId === selected.id &&
                                  type === "selected"
                                ) && (
                                  <div className="flex space-x-2 text-xs">
                                    <button
                                      className="text-sky-600 hover:text-sky-900"
                                      onClick={() =>
                                        handleEditSelected(selected)
                                      }
                                      disabled={!!selectedAuctionId}
                                    >
                                      Editar
                                    </button>
                                    <button
                                      className="text-red-600 hover:text-red-900"
                                      disabled={!!selectedAuctionId}
                                      onClick={() =>
                                        handleRemoveDataSelected(selected)
                                      }
                                    >
                                      Quitar
                                    </button>
                                  </div>
                                )}
                              </div>
                              {selectedAuctionId === selected.id &&
                                type === "selected" && (
                                  <div className="mt-3 space-y-4">
                                    {auctionSelectedOptions.map((options) => (
                                      <div
                                        className="grid grid-cols-12 gap-3"
                                        key={options.id}
                                      >
                                        <div className="col-span-3">
                                          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-300">
                                            Producto
                                          </label>
                                          <p>{options.FruitVegetable.name}</p>
                                        </div>
                                        <div className="col-span-3">
                                          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-300">
                                            Cantidad (&lt; {options.quantity})
                                          </label>
                                          <div className="flex flex-nowrap items-center">
                                            <input
                                              type="text"
                                              className="border-gray-300 focus:border-green-700 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-1 placeholder:text-gray-400"
                                              required
                                              value={options.quantitySelected}
                                              onChange={({ target }) =>
                                                handleQuantityChange(
                                                  target,
                                                  options
                                                )
                                              }
                                              max={options.quantity}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-span-2">
                                          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-300">
                                            $ Unitario
                                          </label>
                                          <div className="flex flex-nowrap items-center">
                                            <span className="ml-1">
                                              ${options.unitPrice}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="col-span-3">
                                          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-300">
                                            Total
                                          </label>
                                          <div className="flex flex-nowrap items-center">
                                            <span className="">
                                              ${" "}
                                              {options.unitPrice *
                                                options.quantitySelected}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="col-span-1">
                                          {options.quantitySelected > 0 && (
                                            <button
                                              onClick={() =>
                                                handleQuantityChange(
                                                  { value: "" },
                                                  options
                                                )
                                              }
                                              className="block mt-3 text-red-400"
                                            >
                                              x
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                    <div className="">
                                      <hr />
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <p>
                                        Total: $
                                        {auctionSelectedOptions.reduce(
                                          (accumulator, object) =>
                                            accumulator +
                                            object.quantitySelected *
                                              object.unitPrice,
                                          0
                                        )}
                                      </p>
                                      <div className="flex items-center space-x-3 text-xs">
                                        <button
                                          type="button"
                                          className="text-red-600 hover:text-red-900"
                                          onClick={handleCancelOption}
                                        >
                                          Cancelar
                                        </button>
                                        <button
                                          type="button"
                                          className="disabled:cursor-not-allowed text-sky-600 hover:text-sky-900"
                                          onClick={() => editAuction(selected)}
                                          disabled={
                                            auctionSelectedOptions.reduce(
                                              (accumulator, object) =>
                                                accumulator +
                                                object.quantitySelected *
                                                  object.unitPrice,
                                              0
                                            ) <= 0
                                          }
                                        >
                                          Guardar
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-14">
                        <div className="text-center text-xl font-semibold">
                          TOTAL: ${" "}
                          {dataSelected.reduce(
                            (accumulator, object) =>
                              accumulator +
                              object.options.reduce(
                                (acc, obj) =>
                                  acc + obj.quantitySelected * obj.unitPrice,
                                0
                              ),
                            0
                          )}
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="mt-4 w-full flex items-center justify-center gap-2 text-white font-medium rounded text-sm px-4 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                            disabled={!!selectedAuctionId || loadingAction}
                            onClick={handleSend}
                          >
                            {!loadingAction ? (
                              "Enviar cotizacion al cliente"
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span>Enviando cotizacion</span>
                                <CircularProgress color="inherit" size="1rem" />
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
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
export default ListAuctionsProducer;
