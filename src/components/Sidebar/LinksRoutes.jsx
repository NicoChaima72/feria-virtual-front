import { useSelector } from "react-redux";
import LinksRoutesAdmin from "./LinksRoutesAdmin";
import LinksRoutesLocal from "./LinksRoutesLocal";
import LinksRoutesProducer from "./LinksRoutesProducer";
import LinksRoutesTransportist from "./LinksRoutesTransportist";

const List = () => {
  const { user } = useSelector((state) => state.auth);

  switch (user.role_id) {
    case 1:
      return <LinksRoutesAdmin></LinksRoutesAdmin>;
    case 2:
      return <LinksRoutesLocal></LinksRoutesLocal>;
    case 3:
      return <h1>Cliente externo</h1>;
    case 4:
      return <LinksRoutesProducer></LinksRoutesProducer>;
    case 5:
      return <LinksRoutesTransportist></LinksRoutesTransportist>;
    default:
      return <h1>No acceso</h1>;
  }
};
export default List;
