import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AddExternalUsers from "../pages/admin/externalUsers/AddExternalUsers";
import EditExternalUsers from "../pages/admin/externalUsers/EditExternalUsers";
import ListExternalUsers from "../pages/admin/externalUsers/ListExternalUsers";
import AddLocalUsers from "../pages/admin/localUsers/AddLocalUsers";
import EditLocalUsers from "../pages/admin/localUsers/EditLocalUsers";
import ListLocalUsers from "../pages/admin/localUsers/ListLocalUsers";
import AddProducerUsers from "../pages/admin/producerUsers/AddProducerUsers";
import ListProducerUsers from "../pages/admin/producerUsers/ListProducerUsers";
import AddTransportistUser from "../pages/admin/transportistUsers/AddTransportistUser";
import EditTransportistUsers from "../pages/admin/transportistUsers/EditTransportistUsers";
import ListTransportistUsers from "../pages/admin/transportistUsers/ListTransportistUsers";

const AdminRouter = () => {
  const { showConfirmLogout } = useSelector((state) => state.ui);
  return (
    <Routes>
      <Route index element={<AdminDashboardPage></AdminDashboardPage>} />
      <Route  path="users/">
        <Route exact path="locals" element={<ListLocalUsers></ListLocalUsers>}></Route>
        <Route exact path="locals/create" element={<AddLocalUsers></AddLocalUsers>}></Route>
        <Route exact path="locals/:user_id/edit" element={<EditLocalUsers></EditLocalUsers>}></Route>
        <Route exact path="externals" element={<ListExternalUsers></ListExternalUsers>}></Route>
        <Route exact path="externals/create" element={<AddExternalUsers></AddExternalUsers>}></Route>
        <Route exact path="externals/:user_id/edit" element={<EditExternalUsers></EditExternalUsers>}></Route>
        <Route exact path="producers" element={<ListProducerUsers></ListProducerUsers>}></Route>
        <Route exact path="producers/create" element={<AddProducerUsers></AddProducerUsers>}></Route>
        <Route exact path="transportists" element={<ListTransportistUsers></ListTransportistUsers>}></Route>
        <Route exact path="transportists/create" element={<AddTransportistUser></AddTransportistUser>}></Route>
        <Route exact path="transportists/:user_id/edit" element={<EditTransportistUsers></EditTransportistUsers>}></Route>
      </Route>
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
