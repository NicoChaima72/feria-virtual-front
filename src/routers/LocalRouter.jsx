import { Route, Routes } from "react-router-dom"
import AcceptOrDeclineSale from "../pages/admin/sales/AcceptOrDeclineSale"
import LocalDashboardPage from "../pages/local/LocalDashboardPage"
import AddSale from "../pages/local/sales/AddSale"
import CancelSale from "../pages/local/sales/CancelSale"
import ListSales from "../pages/local/sales/ListSales"
import ReceivdeOrder from "../pages/local/sales/ReceivedOrder"
import ShowAuctionProducer from "../pages/local/sales/ShowAuctionProducer"
import ShowAuctionTransportist from "../pages/local/sales/ShowAuctionTransportist"
import ShowSale from "../pages/local/sales/ShowSale"
import ListOrders from "../pages/transportist/orders/ListOrders"

const LocalRouter = () => {
  return (
    <Routes>
      <Route index element={<LocalDashboardPage></LocalDashboardPage>}></Route>
      <Route path="sales">
        <Route exact index element={<ListSales></ListSales>}></Route>
        <Route exact path="create" element={<AddSale></AddSale>}></Route>
        <Route exact path=":sale_id" element={<ShowSale></ShowSale>}></Route>
        <Route exact path=":sale_id/cancel" element={<CancelSale></CancelSale>}></Route>
        <Route exact path=":sale_id/auction-producer" element={<ShowAuctionProducer></ShowAuctionProducer>}></Route>
        <Route exact path=":sale_id/auction-transportist" element={<ShowAuctionTransportist></ShowAuctionTransportist>}></Route>
        <Route exact path=":sale_id/received" element={<ReceivdeOrder></ReceivdeOrder>}></Route>
      </Route>
      <Route path="orders">
        <Route exact index element={<ListOrders></ListOrders>}></Route>
      </Route>
    </Routes>
  )
}
export default LocalRouter