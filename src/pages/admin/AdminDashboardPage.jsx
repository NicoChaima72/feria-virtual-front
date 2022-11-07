import React from "react";
import DivAnimate from "../../components/DivAnimate";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import EggAltIcon from "@mui/icons-material/EggAlt";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import "tailwindcss/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadDashboardAdmin } from "../../features/uiSlice";
import { CircularProgress } from "@mui/material";
import { formatDate } from "../../utils/utils";

const Card = ({ title, value, icon: Icon, color }) => {
  return (
    <div
      className={`grid grid-cols-12 border text-white rounded shadow p-3`}
      style={{ backgroundColor: color }}
    >
      <div className="col-span-8">
        <p>{title}</p>
        <p className="text-3xl">{value}</p>
      </div>
      <div className="col-span-4">
        <div className="w-full text-2xl">
          <Icon className="" sx={{ width: 60, height: 60 }}></Icon>
        </div>
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { dashboard: data, loadingDashboard } = useSelector(
    (state) => state.ui
  );

  useEffect(() => {
    dispatch(loadDashboardAdmin({}));
  }, []);

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Dashboard administrador
      </h1>
      <div className="py-2">
        <hr />
      </div>

      {loadingDashboard ? (
        <div className="flex items-center justify-center mt-7">
          <CircularProgress
            size={30}
            style={{ color: "#15803d" }}
          ></CircularProgress>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-6 md:col-span-3">
              <Card
                title="Administradores"
                value={data.data.admin_count}
                color="#0284c7"
                icon={PeopleAltIcon}
              ></Card>
            </div>
            <div className="col-span-6 md:col-span-3">
              <Card
                title="Externos"
                value={data.data.external_count}
                color="#059669"
                icon={PeopleAltIcon}
              ></Card>
            </div>
            <div className="col-span-6 md:col-span-3">
              <Card
                title="Locales"
                value={data.data.local_count}
                color="#525252"
                icon={PeopleAltIcon}
              ></Card>
            </div>
            <div className="col-span-6 md:col-span-3">
              <Card
                title="Productores"
                value={data.data.producer_count}
                color="#be185d"
                icon={PeopleAltIcon}
              ></Card>
            </div>
            <div className="col-span-6 md:col-span-3">
              <Card
                title="Transportistas"
                value={data.data.transportist_count}
                color="#9333ea"
                icon={PeopleAltIcon}
              ></Card>
            </div>
            <div className="col-span-6 md:col-span-3">
              <Card
                title="Contratos vencidos"
                value={data.data.contracts_expired}
                color="#ef4444"
                icon={ContactPageIcon}
              ></Card>
            </div>
            <div className="col-span-6 md:col-span-3">
              <Card
                title="Usuarios de baja"
                value={data.data.users_down}
                color="#eab308"
                icon={PersonOffIcon}
              ></Card>
            </div>
            <div className="col-span-6 md:col-span-3">
              <Card
                title="Frutas y verduras"
                value={data.data.fruits_vegetables_count}
                color="#65a30d"
                icon={EggAltIcon}
              ></Card>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-10 gap-3">
            <div className="col-span-6">
              <label className="text-xl">Ultimos pedidos completados</label>
              <div className="overflow-x-auto relative mt-2">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        ID
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Cliente
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Fecha pedido
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Monto final
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.last_sales.map((sale) => (
                      <tr
                        key={sale.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {sale.id}
                        </th>
                        <td className="py-4 px-6">{sale.client}</td>
                        <td className="py-4 px-6">
                          {formatDate(sale.created_at, "DD/MM/yyy")}
                        </td>
                        <td className="py-4 px-6">$ {sale.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-span-6">
              <label className="text-xl">Clientes con más pedidos</label>
              <div className="overflow-x-auto relative mt-2">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        RUT
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Razon social
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Nombre
                      </th>
                      <th scope="col" className="py-3 px-6">
                        N° Pedidos
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.users_sales.map((user) => (
                      <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {user.rut}
                        </th>
                        <td className="py-4 px-6">{user.business_name}</td>
                        <td className="py-4 px-6">{user.name}</td>
                        <td className="py-4 px-6">{user.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </DivAnimate>
  );
};

export default AdminDashboardPage;
