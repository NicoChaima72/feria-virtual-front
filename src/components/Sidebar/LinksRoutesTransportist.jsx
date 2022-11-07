import LinkSidebar from "./LinkSidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const LinksRoutesTransportist = () => {
  return (
    <ul className="space-y-2 mt-2">
      <LinkSidebar
        to="/transportist"
        icon={DashboardIcon}
        title="Dashboard"
        notification={3}
        end={true}
      ></LinkSidebar>
      <LinkSidebar
        to="/transportist/auctions"
        icon={FactCheckIcon}
        title="Ver subastas"
        end
      ></LinkSidebar>
      <LinkSidebar
        to="/transportist/orders"
        icon={RemoveRedEyeIcon}
        title="Mis entregas"
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
export default LinksRoutesTransportist;
