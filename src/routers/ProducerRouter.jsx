import { Route, Routes } from "react-router-dom"
import ListAuctions from "../pages/producer/auctions/ListAuctions"
import ParticipateAuction from "../pages/producer/auctions/ParticipateAuction"
import ProducerDashboardPage from "../pages/producer/ProducerDashboardPage"

const ProducerRouter = () => {
  return (
    <Routes>
      <Route index element={<ProducerDashboardPage></ProducerDashboardPage>}></Route>
      <Route path="auctions">
        <Route exact index element={<ListAuctions></ListAuctions>}></Route>
        <Route exact path=":sale_id/participate" element={<ParticipateAuction></ParticipateAuction>}></Route>
        {/* <Route exact path=":sale_id/cancel" element={<CancelSale></CancelSale>}></Route> */}
      </Route>
    </Routes>
  )
}
export default ProducerRouter