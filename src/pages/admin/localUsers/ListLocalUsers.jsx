import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getUsersByRole, onClearUsers } from "../../../features/usersSlice";
import { CircularProgress } from "@mui/material";
import DrawDataTable from "../../../components/DrawDataTable";

const ListLocalUsers = () => {
  const { users, error, loading, roleName } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersByRole({ role: "locals", name: 'locals' }));
    return () => {
      dispatch(onClearUsers());
    };
  }, []);

  return (
    <DivAnimate>
      <div className="flex flex-wrap gap-y-1 items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">Clientes locales</h1>
        <Link
          to="/admin/users/locals/create"
          className="flex space-x-1 bg-green-700 hover:bg-green-600 text-white py-1.5 px-2 rounded shadow hover:shadow-green-700"
        >
          <AddIcon></AddIcon>
          <span>Agregar cliente</span>
        </Link>
      </div>
      <div className="mt-5">
        {loading || roleName !== 'locals' ? (
          <div className="flex items-center justify-center mt-7">
            <CircularProgress
              size={30}
              style={{ color: "#15803d" }}
            ></CircularProgress>
          </div>
        ) : (
          <DrawDataTable type={"locals"} data={users}></DrawDataTable>
        )}
      </div>
    </DivAnimate>
  );
};

export default ListLocalUsers;
