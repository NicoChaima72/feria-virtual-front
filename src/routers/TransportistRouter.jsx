import { Route, Routes } from "react-router-dom"
import LocalDashboardPage from "../pages/local/LocalDashboardPage"
import AddSale from "../pages/local/sales/AddSale"
import CancelSale from "../pages/local/sales/CancelSale"
import ListSales from "../pages/local/sales/ListSales"
import ShowAuctionProducer from "../pages/local/sales/ShowAuctionProducer"
import ListAuctions from "../pages/transportist/auctions/ListAuctions"
import ParticipateAuction from "../pages/transportist/auctions/ParticipateAuction"
import ListOrders from "../pages/transportist/orders/ListOrders"
import ShowOrder from "../pages/transportist/orders/ShowOrder"
import TransportistDashboardPage from "../pages/transportist/TransportistDashboardPage"

const TransportistRouter = () => {
  return (
    <Routes>
      <Route index element={<TransportistDashboardPage></TransportistDashboardPage>}></Route>
      <Route path="auctions">
        <Route exact index element={<ListAuctions></ListAuctions>}></Route>
        <Route exact path=":sale_id/participate" element={<ParticipateAuction></ParticipateAuction>}></Route>
      </Route>
      <Route path="orders">
        <Route exact index element={<ListOrders></ListOrders>}></Route>
        <Route exact path=":sale_id" element={<ShowOrder></ShowOrder>}></Route>
      </Route>
    </Routes>
  )
}
export default TransportistRouter