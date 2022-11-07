import DivAnimate from "../../components/DivAnimate";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const Card = ({ title, value, icon: Icon, color }) => {
  return (
    <div
      className={`flex justify-between border text-white rounded shadow p-3`}
      style={{ backgroundColor: color }}
    >
      <div className="">
        <p>{title}</p>
        <p className="text-3xl">{value}</p>
      </div>
      <div className="">
        <div className="w-full text-2xl">
          <Icon className="" sx={{ width: 60, height: 60 }}></Icon>
        </div>
      </div>
    </div>
  );
};

const TransportistDashboardPage = () => {
  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Dashboard transportista
      </h1>
      <div className="py-2">
        <hr />
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-6 md:col-span-3">
          <Card
            title="Subastas activas"
            value={0}
            color="#0284c7"
            icon={FactCheckIcon}
          ></Card>
        </div>
        <div className="col-span-6 md:col-span-3">
          <Card
            title="Espera resultados"
            value={1}
            color="#059669"
            icon={FactCheckIcon}
          ></Card>
        </div>
        <div className="col-span-6 md:col-span-3">
          <Card
            title="Entregas asignadas"
            value={4}
            color="#525252"
            icon={FactCheckIcon}
          ></Card>
        </div>
        <div className="col-span-6 md:col-span-3">
          <Card
            title="Entregas pendientes"
            value={2}
            color="#be185d"
            icon={FactCheckIcon}
          ></Card>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-lg">Ultimos pedidos entregados</p>

        <div class="overflow-x-auto relative mt-1 border">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Cliente
                </th>
                <th scope="col" class="py-3 px-6">
                  País
                </th>
                <th scope="col" class="py-3 px-6">
                  Región
                </th>
                <th scope="col" class="py-3 px-6">
                  Comuna
                </th>
                <th scope="col" class="py-3 px-6">
                  Fecha entrega
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Duoc UC
                </th>
                <td class="py-4 px-6">Chile</td>
                <td class="py-4 px-6">Metropolitana</td>
                <td class="py-4 px-6">Providencia</td>
                <td class="py-4 px-6">04/11/2022</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Duoc UC
                </th>
                <td class="py-4 px-6">Chile</td>
                <td class="py-4 px-6">Metropolitana</td>
                <td class="py-4 px-6">Providencia</td>
                <td class="py-4 px-6">02/11/2022</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Krishna Aranguiz
                </th>
                <td class="py-4 px-6">Chile</td>
                <td class="py-4 px-6">Valparaiso</td>
                <td class="py-4 px-6">Petorca</td>
                <td class="py-4 px-6">01/11/2022</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </DivAnimate>
  );
};
export default TransportistDashboardPage;
