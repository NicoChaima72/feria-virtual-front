import { AnimatePresence } from "framer-motion";
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AddExternalUsers from "../pages/admin/externalUsers/AddExternalUsers";
import EditExternalUsers from "../pages/admin/externalUsers/EditExternalUsers";
import ListExternalUsers from "../pages/admin/externalUsers/ListExternalUsers";
import AddFruitsVegetables from "../pages/admin/fruitsVegetables/AddFruitsVegetables";
import EditFruitsVegetables from "../pages/admin/fruitsVegetables/EditFruitsVegetables";
import ListFruitsVegetables from "../pages/admin/fruitsVegetables/ListFruitsVegetables";
import AddLocalUsers from "../pages/admin/localUsers/AddLocalUsers";
import EditLocalUsers from "../pages/admin/localUsers/EditLocalUsers";
import ListLocalUsers from "../pages/admin/localUsers/ListLocalUsers";
import AddProducerUsers from "../pages/admin/producerUsers/AddProducerUsers";
import EditProducerUsers from "../pages/admin/producerUsers/EditProducerUsers";
import ListProducerUsers from "../pages/admin/producerUsers/ListProducerUsers";
import AddTransportistUser from "../pages/admin/transportistUsers/AddTransportistUser";
import EditTransportistUsers from "../pages/admin/transportistUsers/EditTransportistUsers";
import ListTransportistUsers from "../pages/admin/transportistUsers/ListTransportistUsers";
import ListSales from "../pages/admin/sales/ListSales";
import AcceptOrDeclineSale from "../pages/admin/sales/AcceptOrDeclineSale";
import ListAuctionsProducer from "../pages/admin/sales/ListAuctionsProducer";
import StartAuctionTransportist from "../pages/admin/sales/StartAuctionTransportist";
import ListAuctionsTransportist from "../pages/admin/sales/ListAuctionsTransportist";
import ShowSale from "../pages/admin/sales/ShowSale";

// const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
// const AddExternalUsers = lazy(() => import("../pages/admin/externalUsers/AddExternalUsers"));
// const EditExternalUsers = lazy(() => import("../pages/admin/externalUsers/EditExternalUsers"));
// const ListExternalUsers = lazy(() => import("../pages/admin/externalUsers/ListExternalUsers"));
// const AddLocalUsers = lazy(() => import("../pages/admin/localUsers/AddLocalUsers"));
// const EditLocalUsers = lazy(() => import("../pages/admin/localUsers/EditLocalUsers"));
// const ListLocalUsers = lazy(() => import("../pages/admin/localUsers/ListLocalUsers"));
// const AddProducerUsers = lazy(() => import("../pages/admin/producerUsers/AddProducerUsers"));
// const ListProducerUsers = lazy(() => import("../pages/admin/producerUsers/ListProducerUsers"));
// const AddTransportistUser = lazy(() => import("../pages/admin/transportistUsers/AddTransportistUser"));
// const EditTransportistUsers = lazy(() => import("../pages/admin/transportistUsers/EditTransportistUsers"));
// const ListTransportistUsers = lazy(() => import("../pages/admin/transportistUsers/ListTransportistUsers"));

const AdminRouter = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboardPage></AdminDashboardPage>} />
      <Route path="sales/">
        <Route exact index element={<ListSales></ListSales>}></Route>
        <Route exact path=":sale_id/accept-decline" element={<AcceptOrDeclineSale></AcceptOrDeclineSale>}></Route>
        <Route exact path=":sale_id/details" element={<ShowSale></ShowSale>}></Route>
        <Route exact path=":sale_id/auctions-producer" element={<ListAuctionsProducer></ListAuctionsProducer>}></Route>
        <Route exact path=":sale_id/transportist/start" element={<StartAuctionTransportist></StartAuctionTransportist>}></Route>
        <Route exact path=":sale_id/auctions-transportist" element={<ListAuctionsTransportist></ListAuctionsTransportist>}></Route>
      </Route>
      <Route  path="users/">
        <Route exact path="locals" element={<ListLocalUsers></ListLocalUsers>}></Route>
        <Route exact path="locals/create" element={<AddLocalUsers></AddLocalUsers>}></Route>
        <Route exact path="locals/:user_id/edit" element={<EditLocalUsers></EditLocalUsers>}></Route>
        <Route exact path="externals" element={<ListExternalUsers></ListExternalUsers>}></Route>
        <Route exact path="externals/create" element={<AddExternalUsers></AddExternalUsers>}></Route>
        <Route exact path="externals/:user_id/edit" element={<EditExternalUsers></EditExternalUsers>}></Route>
        <Route exact path="producers" element={<ListProducerUsers></ListProducerUsers>}></Route>
        <Route exact path="producers/create" element={<AddProducerUsers></AddProducerUsers>}></Route>
        <Route exact path="producers/:user_id/edit" element={<EditProducerUsers></EditProducerUsers>}></Route>
        <Route exact path="transportists" element={<ListTransportistUsers></ListTransportistUsers>}></Route>
        <Route exact path="transportists/create" element={<AddTransportistUser></AddTransportistUser>}></Route>
        <Route exact path="transportists/:user_id/edit" element={<EditTransportistUsers></EditTransportistUsers>}></Route>
      </Route>

      <Route exact path="fruits-vegetables" element={<ListFruitsVegetables></ListFruitsVegetables>}></Route>
      <Route exact path="fruits-vegetables/create" element={<AddFruitsVegetables></AddFruitsVegetables>}></Route>
      <Route exact path="fruits-vegetables/:fruit_vegetable_id/edit" element={<EditFruitsVegetables></EditFruitsVegetables>}></Route>
      {/* <Route path="users/producers" element={<ProducersIndexPage />} />
        <Route path="users/producers/create" element={<ProducersCreatePage />} />
        <Route path="users/producers/:user_id/edit" element={<ProducersEditPage />} />
        <Route path="users/internals" element={<InternalsIndexPage />} />
        <Route path="users/internals/create" element={<InternalsCreatePage />} />
        <Route path="users/internals/:user_id/edit" element={<InternalsEditPage />} /> */}
    </Routes>
  );
};

export default AdminRouter;
