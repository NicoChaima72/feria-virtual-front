import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DivAnimate from "../../../components/DivAnimate";
import {
  cancelSale,
  getAllSales,
  getMySales,
} from "../../../features/salesSlice";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { setSessionStorage } from "../../../utils/session";
import { NavigateBeforeRounded } from "@mui/icons-material";
import feriaApi from "../../../interceptors/feriaInterceptor";

const ListAuctions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sales, error, loading } = useSelector((state) => state.sales);
  const { user } = useSelector((state) => state.auth);
  const [idsParticipate, setIdsParticipate] = useState([]);
  const [loadingIdsParticipate, setLoadingIdsParticipate] = useState(true);
  const { message: messageSession, type: typeSession } = useSelector(
    (state) => state.session
  );

  useEffect(() => {
    dispatch(getAllSales({}));
  }, []);

  useEffect(() => {
    const getIdsParticipate = async () => {
      const { data } = await feriaApi.get("transportists/auctions/participate");

      setIdsParticipate(data.ids);
      setLoadingIdsParticipate(false);
    };

    getIdsParticipate();
  }, []);

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Subastas para transporte
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
            <div className="space-y-7 mt-4">
              {sales.filter((s) => s.status_id == 10).length === 0 && (
                <p className="text-lg text-gray-500 ">
                  No hay subastas disponibles
                </p>
              )}
              {sales
                .filter((s) => s.status_id == 10)
                .map((sale) => (
                  <div className="border rounded p-4" key={sale.id}>
                    <div className="flex flex-wrap justify-between gap-x-5">
                      <h3 className="text-lg font-medium">
                        {sale.Client.name}
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
                        <div className="">
                          Pedido el:{" "}
                          <span className="font-semibold">
                            {" "}
                            {formatDate(sale.created_at, "DD MMM YYYY")}
                          </span>
                        </div>
                        <hr />
                        <div className="">
                          Tipo: <span className="font-semibold">Local</span>
                        </div>
                        <div className="">
                          Region:{" "}
                          <span className="font-semibold">
                            {sale.Client.region}
                          </span>
                        </div>
                        <div className="">
                          Comuna:{" "}
                          <span className="font-semibold">
                            {sale.Client.commune}
                          </span>
                        </div>
                      </div>
                      <div className="pt-7 sm:pt-0 space-y-1">
                        {!idsParticipate.includes(sale.id) ? (
                          <Link
                            to={`/transportist/auctions/${sale.id}/participate`}
                            className="flex items-center justify-center gap-2 text-white font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400"
                            // onClick={() => handleActiveSale(sale)}
                          >
                            Participar
                          </Link>
                        ) : (
                          <div className="">
                            <span className="text-lg text-gray-500 mt-3 block">
                              PARTICIPANDO
                            </span>
                          </div>
                        )}
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
export default ListAuctions;
