import LinkSidebar from "./LinkSidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const LinksRoutesLocal = () => {
  return (
    <ul className="space-y-2 mt-2">
      <LinkSidebar
        to="/local"
        icon={DashboardIcon}
        title="Dashboard"
        notification={3}
        end={true}
      ></LinkSidebar>
      <LinkSidebar
        to="/local/sales/create"
        icon={AddBoxIcon}
        title="Nuevo pedido"
      ></LinkSidebar>
      <LinkSidebar
        to="/local/sales"
        icon={FactCheckIcon}
        title="Mis pedidos"
        end
      ></LinkSidebar>
      <LinkSidebar
        to="/producer/sales/create"
        icon={AttachMoneyIcon}
        title="Mis pagos"
      ></LinkSidebar>
    </ul>
  );
};
export default LinksRoutesLocal;
