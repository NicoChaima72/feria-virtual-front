import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import DrawDataTable from "../../../components/DrawDataTable";
import { getFruitsAndVegetables } from "../../../features/fruitsVegetablesSlice";

const ListFruitsVegetables = () => {
  const dispatch = useDispatch();
  const { fruitsVegetables, error, loading } = useSelector(
    (state) => state.fruitsVegetables
  );

  useEffect(() => {
    dispatch(getFruitsAndVegetables({}));
  }, []);

  return (
    <DivAnimate>
      <div className="flex flex-wrap gap-y-1 items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Frutas y verduras
        </h1>
        <Link
          to="/admin/fruits-vegetables/create"
          className="flex space-x-1 bg-green-700 hover:bg-green-600 text-white py-1.5 px-2 rounded shadow hover:shadow-green-700"
        >
          <AddIcon></AddIcon>
          <span>Agregar producto</span>
        </Link>
      </div>
      <div className="mt-5">
        {loading ? (
          <div className="flex items-center justify-center mt-7">
            <CircularProgress
              size={30}
              style={{ color: "#15803d" }}
            ></CircularProgress>
          </div>
        ) : (
          <DrawDataTable type={"fruitsVegetables"} data={fruitsVegetables}></DrawDataTable>
        )}
      </div>
    </DivAnimate>
  );
};
export default ListFruitsVegetables;
