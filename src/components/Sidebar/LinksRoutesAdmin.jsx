import LinkSidebar from "./LinkSidebar";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EggIcon from '@mui/icons-material/Egg';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ListAdmin = () => {
  return (
    <ul className="space-y-2 mt-2">
      <LinkSidebar
        to="/admin"
        icon={DashboardIcon}
        title="Dashboard"
        notification={3}
        end={true}
      ></LinkSidebar>
      <LinkSidebar
        to="/admin/users/locals"
        icon={GroupIcon}
        title="Clientes locales"
      ></LinkSidebar>
      <LinkSidebar
        to="/admin/users/externals"
        icon={GroupIcon}
        title="Clientes extranjeros"
      ></LinkSidebar>
      <LinkSidebar
        to="/admin/users/producers"
        icon={GroupIcon}
        title="Usuarios productores"
      ></LinkSidebar>
      <LinkSidebar
        to="/admin/users/transportists"
        icon={GroupIcon}
        title="Usuarios transportistas"
      ></LinkSidebar>
      <LinkSidebar
        to="/admin/fruits-vegetables"
        icon={EggIcon}
        title="Frutas y verduras"
      ></LinkSidebar>
      <LinkSidebar
        to="/admin/sales"
        icon={FactCheckIcon}
        title="Ver pedidos"
        end
      ></LinkSidebar>
      <LinkSidebar
        to="/producer/sales/create"
        icon={AttachMoneyIcon}
        title="Ver pagos"
      ></LinkSidebar>
    </ul>
  );
};
export default ListAdmin;
