import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DivAnimate from "../../../components/DivAnimate";
import { getAllSales, onActiveSale } from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../../../utils/utils";
import { Link } from "react-router-dom";

const ListSales = () => {
  const dispatch = useDispatch();
  const { sales, error, loading } = useSelector((state) => state.sales);

  const [sortBy, setSortBy] = useState("default");
  const [salesSorted, setSalesSorted] = useState([]);

  useEffect(() => {
    dispatch(getAllSales({}));
  }, []);

  useEffect(() => {
    setSalesSorted(sales);
  }, [sales]);

  const sortSales = (type) => {
    setSortBy(type);
    if (type === "all") setSalesSorted(sales);
    if (type === "in progress")
      setSalesSorted(sales.filter((s) => s.status_id != 19));
    if (type === "completed")
      setSalesSorted(sales.filter((s) => s.status_id == 19));
  };

  // const handleActiveSale = (sale) => {
  //   dispatch(onActiveSale(sale));
  // };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Pedidos de clientes
      </h1>
      <div className="mt-5">
        {loading ? (
          <div className="flex items-center justify-center mt-7">
            <CircularProgress
              size={30}
              style={{ color: "#15803d" }}
            ></CircularProgress>
          </div>
        ) : (
          <div className="">
            <div className="flex gap-x-6">
              <button
                onClick={() => sortSales("default")}
                className={`${
                  sortBy == "default"
                    ? "font-medium border-green-500"
                    : "border-transparent hover:text-green-800"
                } text-lg border-b-4`}
              >
                Por defecto
              </button>
              <button
                onClick={() => sortSales("all")}
                className={`${
                  sortBy == "all"
                    ? "font-medium border-green-500"
                    : "border-transparent hover:text-green-800"
                } text-lg border-b-4`}
              >
                Todos
              </button>
              <button
                onClick={() => sortSales("in progress")}
                className={`${
                  sortBy == "in progress"
                    ? "font-medium border-green-500"
                    : "border-transparent hover:text-green-800"
                } text-lg border-b-4`}
              >
                En progreso ({sales.filter((s) => s.status_id != 19).length})
              </button>
              <button
                onClick={() => sortSales("completed")}
                className={`${
                  sortBy == "completed"
                    ? "font-medium border-green-500"
                    : "border-transparent hover:text-green-800"
                } text-lg border-b-4`}
              >
                Completados
              </button>
            </div>
            <div className="space-y-7 mt-4">
              {salesSorted.map((sale) => (
                <div className="border rounded p-4" key={sale.id}>
                  <div className="flex flex-wrap justify-between gap-x-5">
                    <h3 className="text-lg font-medium">
                      {sale.Status.description}
                    </h3>
                    <p className="text-gray-600 pb-3">
                      Actualizado el{" "}
                      {formatDate(sale.updated_at, "DD MMM YYYY - HH:mm")}
                    </p>
                  </div>
                  <hr />
                  <div className="pt-3 flex flex-col sm:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="">
                        Orden de compra:{" "}
                        <span className="font-semibold">{sale.id}</span>
                      </div>
                      <div className="flex items-center">
                        <p>Productos:</p>
                        <div className="pl-2 flex gap-2">
                          {sale.fruits_vegetables.map((fruitVegetable) => (
                            <div
                              className="bg-gray-300 py-1 px-2 rounded text-sm"
                              key={fruitVegetable}
                            >
                              {fruitVegetable}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="">
                        Pedido el:{" "}
                        <span className="font-semibold">
                          {" "}
                          {formatDate(sale.created_at, "DD MMM YYYY")}
                        </span>
                      </div>
                      {sale.status_id == 4 && (
                        <div className="">
                          Termino subasta:{" "}
                          <span className="font-semibold">
                            {" "}
                            {formatDate(
                              sale.AuctionProducer.ended_at,
                              "DD MMM YYYY - HH:mm"
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="pt-7 sm:pt-0 space-y-1">
                      {sale.status_id == 1 && (
                        <Link
                          to={`/admin/sales/${sale.id}/accept-decline`}
                          className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                          // onClick={() => handleActiveSale(sale)}
                        >
                          Aceptar pedido
                        </Link>
                      )}
                      {sale.status_id != 19 && (
                        <Link
                          to={`/admin/sales/${sale.id}/details`}
                          className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                          // onClick={() => handleActiveSale(sale)}
                        >
                          Rastrear pedido
                        </Link>
                      )}
                      {sale.status_id == 4 && (
                        <Link
                          to={`/admin/sales/${sale.id}/auctions-producer`}
                          className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                          // onClick={() => handleActiveSale(sale)}
                        >
                          Ver subastas
                        </Link>
                      )}
                      {sale.status_id == 8 && (
                        <>
                          <Link
                            to={`/admin/sales/${sale.id}/transportist/start`}
                            className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                            // onClick={() => handleActiveSale(sale)}
                          >
                            Subastar transporte
                          </Link>
                        </>
                      )}
                      {sale.status_id == 10 && (
                        <Link
                          to={`/admin/sales/${sale.id}/auctions-transportist`}
                          className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                          // onClick={() => handleActiveSale(sale)}
                        >
                          Ver subastas
                        </Link>
                      )}
                      {sale.status_id == 19 && (<p className="text-lg text-gray-500">Estado: COMPLETADO.</p>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DivAnimate>
  );
};
export default ListSales;
