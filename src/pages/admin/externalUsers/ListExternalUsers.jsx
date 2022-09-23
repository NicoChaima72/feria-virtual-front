import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import AddIcon from "@mui/icons-material/Add";
import { getUsersByRole, onClearUsers } from "../../../features/usersSlice";
import DrawDataTable from "../../../components/DrawDataTable";
import { CircularProgress } from "@mui/material";

const ListExternalUsers = () => {
  const { users, error, loading, roleName } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersByRole({ role: "externals", name: "externals" }));
    return () => {
      dispatch(onClearUsers());
    };
  }, []);

  return (
    <DivAnimate>
      <div className="flex flex-wrap gap-y-1 items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Clientes extranjeros
        </h1>
        <Link
          to="/admin/users/externals/create"
          className="flex space-x-1 bg-green-700 hover:bg-green-600 text-white py-1.5 px-2 rounded shadow hover:shadow-green-700"
        >
          <AddIcon></AddIcon>
          <span>Agregar cliente</span>
        </Link>
      </div>
      <div className="mt-5">
        {loading || roleName !== 'externals' ? (
          <div className="flex items-center justify-center mt-7">
            <CircularProgress
              size={30}
              style={{ color: "#15803d" }}
            ></CircularProgress>
          </div>
        ) : (
          <DrawDataTable type={"externals"} data={users}></DrawDataTable>
        )}
      </div>
    </DivAnimate>
  );
};

export default ListExternalUsers;
