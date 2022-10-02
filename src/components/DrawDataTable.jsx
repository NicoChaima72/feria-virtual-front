import React from "react";
import { DataTable } from "./DataTable";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import moment from "moment";
import { useDispatch } from "react-redux";
import { changeStatusUser, onActiveUser } from "../features/usersSlice";
import { Link } from "react-router-dom";
import { onActiveFruitVegetable } from "../features/fruitsVegetablesSlice";

const DrawDataTable = ({ type, data }) => {
  const dispatch = useDispatch();

  const handleChangeStatus = async (id) => {
    const { meta } = await dispatch(changeStatusUser({ id }));

    console.log({ meta });
    if (meta.requestStatus === "fulfilled") alert("Estado actualizado");
  };

  let columns = [];

  if (type === "locals") {
    columns = [
      // {
      //   header: () => <span>Estado</span>,
      //   id: 'status',
      //   accessorFn: (row) => `${row.status ? "Activo" : "Inactivo"}`,
      // },
      { header: () => <span>Rut</span>, accessorKey: "rut" },
      { header: () => <span>Razon Social</span>, accessorKey: "business_name" },
      {
        header: () => <span>Estado contrato</span>,
        accessorFn: (row) =>
          `${
            new Date() > new Date(row.Contract.expired_at)
              ? "Vencido"
              : "En curso"
          }`,
        id: "status_contract",
        cell: (info) => (
          <div className="flex">
            <p
              className={`${
                info.getValue() === "En curso" ? "bg-green-500" : "bg-red-500"
              } py-1 px-2 text-xs text-white rounded`}
            >
              {info.getValue()}
            </p>
          </div>
        ),
      },
      {
        header: () => <span>Estado usuario</span>,
        id: "status",
        accessorFn: (row) => `${row.status ? "Activo" : "Inactivo"}`,
        cell: (info) => (
          <div className="flex">
            <p
              className={`${
                info.getValue() === "Activo" ? "bg-green-500" : "bg-red-500"
              } py-1 px-2 text-xs text-white rounded`}
            >
              {info.getValue()}
            </p>
          </div>
        ),
      },
      { header: () => <span>Nombre</span>, accessorKey: "name" },
      { header: () => <span>Email</span>, accessorKey: "email" },
      { header: () => <span>Region</span>, accessorKey: "region" },
      { header: () => <span>Comuna</span>, accessorKey: "commune" },
      { header: () => <span>Telefono</span>, accessorKey: "phone" },
      {
        header: () => <span>Creacion contrato</span>,
        accessorKey: "Contract.created_at",
        cell: (info) => (
          <p>{moment(new Date(info.getValue())).format("DD-MM-YYYY")}</p>
        ),
      },
      {
        header: () => <span>Expiración contrato</span>,
        accessorKey: "Contract.expired_at",
        cell: (info) => (
          <p>{moment(new Date(info.getValue())).format("DD-MM-YYYY")}</p>
        ),
      },
      // { header: () => <span>Expiración contratio</span>,  },
      // {
      //   header: () => <span>Estado</span>,
      //   id: "status",
      //   accessorFn: (row) => (row.status ? "Activo" : "Inactivo"),
      //   // cell: ({cell}) => (cell.row.original.status ? <p>Activo</p> : <p>Inactivo</p>)
      // },
      {
        header: () => <span></span>,
        id: "actions",
        cell: ({ cell }) => (
          <div className="flex space-x-1">
            <Link
              to={`/admin/users/locals/${cell.row.original.id}/edit`}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 rounded px-2 py-1.5"
              title="Editar"
              onClick={() => dispatch(onActiveUser(cell.row.original))}
            >
              <EditIcon sx={{ width: 22, height: 22 }}></EditIcon>
            </Link>
            <button
              type="button"
              className={`${
                cell.row.original.status == 1
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-green-700 hover:bg-green-800"
              } text-white  rounded px-2 py-1.5`}
              title="Cambiar estado"
              onClick={() =>
                confirm(
                  `Dar de ${
                    cell.row.original.status == 1 ? "BAJA" : "ALTA"
                  } a ${JSON.stringify(
                    cell.row.original.name
                  )} - ${JSON.stringify(cell.row.original.business_name)}`
                )
                  ? handleChangeStatus(cell.row.original.id)
                  : null
              }
            >
              {cell.row.original.status == 1 ? (
                <ArrowDownwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowDownwardIcon>
              ) : (
                <ArrowUpwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowUpwardIcon>
              )}
            </button>
          </div>
        ),
      },
    ];
  }
  if (type === "externals") {
    columns = [
      // {
      //   header: () => <span>Estado</span>,
      //   id: 'status',
      //   accessorFn: (row) => `${row.status ? "Activo" : "Inactivo"}`,
      // },
      { header: () => <span>Rut</span>, accessorKey: "rut" },
      { header: () => <span>Razon Social</span>, accessorKey: "business_name" },
      {
        header: () => <span>Estado contrato</span>,
        accessorFn: (row) =>
          `${
            new Date() > new Date(row.Contract.expired_at)
              ? "Vencido"
              : "En curso"
          }`,
        id: "status_contract",
        cell: (info) => (
          <div className="flex">
            <p
              className={`${
                info.getValue() === "En curso" ? "bg-green-500" : "bg-red-500"
              } py-1 px-2 text-xs text-white rounded`}
            >
              {info.getValue()}
            </p>
          </div>
        ),
      },
      {
        header: () => <span>Estado usuario</span>,
        id: "status",
        accessorFn: (row) => `${row.status ? "Activo" : "Inactivo"}`,
        cell: (info) => (
          <div className="flex">
            <p
              className={`${
                info.getValue() === "Activo" ? "bg-green-500" : "bg-red-500"
              } py-1 px-2 text-xs text-white rounded`}
            >
              {info.getValue()}
            </p>
          </div>
        ),
      },
      { header: () => <span>Nombre</span>, accessorKey: "name" },
      { header: () => <span>Email</span>, accessorKey: "email" },
      { header: () => <span>País</span>, accessorKey: "country" },
      { header: () => <span>Region</span>, accessorKey: "region" },
      { header: () => <span>Comuna</span>, accessorKey: "commune" },
      { header: () => <span>Telefono</span>, accessorKey: "phone" },
      {
        header: () => <span>Creacion contrato</span>,
        accessorKey: "Contract.created_at",
        cell: (info) => (
          <p>{moment(new Date(info.getValue())).format("DD-MM-YYYY")}</p>
        ),
      },
      {
        header: () => <span>Expiración contrato</span>,
        accessorKey: "Contract.expired_at",
        cell: (info) => (
          <p>{moment(new Date(info.getValue())).format("DD-MM-YYYY")}</p>
        ),
      },
      // { header: () => <span>Expiración contratio</span>,  },
      // {
      //   header: () => <span>Estado</span>,
      //   id: "status",
      //   accessorFn: (row) => (row.status ? "Activo" : "Inactivo"),
      //   // cell: ({cell}) => (cell.row.original.status ? <p>Activo</p> : <p>Inactivo</p>)
      // },
      {
        header: () => <span></span>,
        id: "actions",
        cell: ({ cell }) => (
          <div className="flex space-x-1">
            <Link
              to={`/admin/users/externals/${cell.row.original.id}/edit`}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 rounded px-2 py-1.5"
              title="Editar"
              onClick={() => dispatch(onActiveUser(cell.row.original))}
            >
              <EditIcon sx={{ width: 22, height: 22 }}></EditIcon>
            </Link>
            <button
              type="button"
              className={`${
                cell.row.original.status == 1
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-green-700 hover:bg-green-800"
              } text-white  rounded px-2 py-1.5`}
              title="Cambiar estado"
              onClick={() =>
                confirm(
                  `Dar de ${
                    cell.row.original.status == 1 ? "BAJA" : "ALTA"
                  } a ${JSON.stringify(
                    cell.row.original.name
                  )} - ${JSON.stringify(cell.row.original.business_name)}`
                )
                  ? handleChangeStatus(cell.row.original.id)
                  : null
              }
            >
              {cell.row.original.status == 1 ? (
                <ArrowDownwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowDownwardIcon>
              ) : (
                <ArrowUpwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowUpwardIcon>
              )}
            </button>
          </div>
        ),
      },
    ];
  }

  if (type === "producers") {
    columns = [
      // {
      //   header: () => <span>Estado</span>,
      //   id: 'status',
      //   accessorFn: (row) => `${row.status ? "Activo" : "Inactivo"}`,
      // },
      { header: () => <span>Rut</span>, accessorKey: "rut" },
      { header: () => <span>Razon Social</span>, accessorKey: "business_name" },
      {
        header: () => <span>Estado contrato</span>,
        accessorFn: (row) =>
          `${
            new Date() > new Date(row.Contract.expired_at)
              ? "Vencido"
              : "En curso"
          }`,
        id: "status_contract",
        cell: (info) => (
          <div className="flex">
            <p
              className={`${
                info.getValue() === "En curso" ? "bg-green-500" : "bg-red-500"
              } py-1 px-2 text-xs text-white rounded`}
            >
              {info.getValue()}
            </p>
          </div>
        ),
      },
      {
        header: () => <span>Estado usuario</span>,
        id: "status",
        accessorFn: (row) => `${row.status ? "Activo" : "Inactivo"}`,
        cell: (info) => (
          <div className="flex">
            <p
              className={`${
                info.getValue() === "Activo" ? "bg-green-500" : "bg-red-500"
              } py-1 px-2 text-xs text-white rounded`}
            >
              {info.getValue()}
            </p>
          </div>
        ),
      },
      { header: () => <span>Nombre</span>, accessorKey: "name" },
      { header: () => <span>Email</span>, accessorKey: "email" },
      {
        header: () => <span>Frutas y verduras</span>,
        accessorFn: (row) =>
          row.fruits_vegetables.length > 0
            ? row.fruits_vegetables.join(", ")
            : "...",
        id: "fruits_vegetables",
      },
      { header: () => <span>Region</span>, accessorKey: "region" },
      { header: () => <span>Comuna</span>, accessorKey: "commune" },
      { header: () => <span>Telefono</span>, accessorKey: "phone" },
      {
        header: () => <span>Creacion contrato</span>,
        accessorKey: "Contract.created_at",
        cell: (info) => (
          <p>{moment(new Date(info.getValue())).format("DD-MM-YYYY")}</p>
        ),
      },
      {
        header: () => <span>Expiración contrato</span>,
        accessorKey: "Contract.expired_at",
        cell: (info) => (
          <p>{moment(new Date(info.getValue())).format("DD-MM-YYYY")}</p>
        ),
      },
      // { header: () => <span>Expiración contratio</span>,  },
      // {
      //   header: () => <span>Estado</span>,
      //   id: "status",
      //   accessorFn: (row) => (row.status ? "Activo" : "Inactivo"),
      //   // cell: ({cell}) => (cell.row.original.status ? <p>Activo</p> : <p>Inactivo</p>)
      // },
      {
        header: () => <span></span>,
        id: "actions",
        cell: ({ cell }) => (
          <div className="flex space-x-1">
            <Link
              to={`/admin/users/producers/${cell.row.original.id}/edit`}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 rounded px-2 py-1.5"
              title="Editar"
              onClick={() => dispatch(onActiveUser(cell.row.original))}
            >
              <EditIcon sx={{ width: 22, height: 22 }}></EditIcon>
            </Link>
            <button
              type="button"
              className={`${
                cell.row.original.status == 1
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-green-700 hover:bg-green-800"
              } text-white  rounded px-2 py-1.5`}
              title="Cambiar estado"
              onClick={() =>
                confirm(
                  `Dar de ${
                    cell.row.original.status == 1 ? "BAJA" : "ALTA"
                  } a ${JSON.stringify(
                    cell.row.original.name
                  )} - ${JSON.stringify(cell.row.original.business_name)}`
                )
                  ? handleChangeStatus(cell.row.original.id)
                  : null
              }
            >
              {cell.row.original.status == 1 ? (
                <ArrowDownwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowDownwardIcon>
              ) : (
                <ArrowUpwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowUpwardIcon>
              )}
            </button>
          </div>
        ),
      },
    ];
  }

  if (type === "transportists") {
    columns = [
      // {
      //   header: () => <span>Estado</span>,
      //   id: 'status',
      //   accessorFn: (row) => `${row.status ? "Activo" : "Inactivo"}`,
      // },
      { header: () => <span>Rut</span>, accessorKey: "rut" },
      { header: () => <span>Razon Social</span>, accessorKey: "business_name" },
      {
        header: () => <span>Estado contrato</span>,
        accessorFn: (row) =>
          `${
            new Date() > new Date(row.Contract.expired_at)
              ? "Vencido"
              : "En curso"
          }`,
        id: "status_contract",
        cell: (info) => (
          <div className="flex">
            <p
              className={`${
                info.getValue() === "En curso" ? "bg-green-500" : "bg-red-500"
              } py-1 px-2 text-xs text-white rounded`}
            >
              {info.getValue()}
            </p>
          </div>
        ),
      },
      {
        header: () => <span>Estado usuario</span>,
        id: "status",
        accessorFn: (row) => `${row.status ? "Activo" : "Inactivo"}`,
        cell: (info) => (
          <div className="flex">
            <p
              className={`${
                info.getValue() === "Activo" ? "bg-green-500" : "bg-red-500"
              } py-1 px-2 text-xs text-white rounded`}
            >
              {info.getValue()}
            </p>
          </div>
        ),
      },
      { header: () => <span>Nombre</span>, accessorKey: "name" },
      { header: () => <span>Email</span>, accessorKey: "email" },
      { header: () => <span>Tipo</span>, accessorKey: "Type.description" },
      { header: () => <span>Telefono</span>, accessorKey: "phone" },
      {
        header: () => <span>Creacion contrato</span>,
        accessorKey: "Contract.created_at",
        cell: (info) => (
          <p>{moment(new Date(info.getValue())).format("DD-MM-YYYY")}</p>
        ),
      },
      {
        header: () => <span>Expiración contrato</span>,
        accessorKey: "Contract.expired_at",
        cell: (info) => (
          <p>{moment(new Date(info.getValue())).format("DD-MM-YYYY")}</p>
        ),
      },
      // { header: () => <span>Expiración contratio</span>,  },
      // {
      //   header: () => <span>Estado</span>,
      //   id: "status",
      //   accessorFn: (row) => (row.status ? "Activo" : "Inactivo"),
      //   // cell: ({cell}) => (cell.row.original.status ? <p>Activo</p> : <p>Inactivo</p>)
      // },
      {
        header: () => <span></span>,
        id: "actions",
        cell: ({ cell }) => (
          <div className="flex space-x-1">
            <Link
              to={`/admin/users/transportists/${cell.row.original.id}/edit`}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 rounded px-2 py-1.5"
              title="Editar"
              onClick={() => dispatch(onActiveUser(cell.row.original))}
            >
              <EditIcon sx={{ width: 22, height: 22 }}></EditIcon>
            </Link>
            <button
              type="button"
              className={`${
                cell.row.original.status == 1
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-green-700 hover:bg-green-800"
              } text-white  rounded px-2 py-1.5`}
              title="Cambiar estado"
              onClick={() =>
                confirm(
                  `Dar de ${
                    cell.row.original.status == 1 ? "BAJA" : "ALTA"
                  } a ${JSON.stringify(
                    cell.row.original.name
                  )} - ${JSON.stringify(cell.row.original.business_name)}`
                )
                  ? handleChangeStatus(cell.row.original.id)
                  : null
              }
            >
              {cell.row.original.status == 1 ? (
                <ArrowDownwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowDownwardIcon>
              ) : (
                <ArrowUpwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowUpwardIcon>
              )}
            </button>
          </div>
        ),
      },
    ];
  }

  if (type === "fruitsVegetables") {
    columns = [
      {
        header: () => <span>ID</span>,
        id: "id",
        cell: ({ cell }) => cell.row.original.id,
      },
      { header: () => <span>Nombre</span>, accessorKey: "name" },
      {
        header: () => <span></span>,
        id: "actions",
        cell: ({ cell }) => (
          <div className="flex space-x-1">
            <Link
              to={`/admin/fruits-vegetables/${cell.row.original.id}/edit`}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 rounded px-2 py-1.5"
              title="Editar"
              onClick={() => dispatch(onActiveFruitVegetable(cell.row.original))}
            >
              <EditIcon sx={{ width: 22, height: 22 }}></EditIcon>
            </Link>
            {/* <button
              type="button"
              className={`${
                cell.row.original.status == 1
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-green-700 hover:bg-green-800"
              } text-white  rounded px-2 py-1.5`}
              title="Cambiar estado"
              onClick={() =>
                confirm(
                  `Dar de ${
                    cell.row.original.status == 1 ? "BAJA" : "ALTA"
                  } a ${JSON.stringify(
                    cell.row.original.name
                  )} - ${JSON.stringify(cell.row.original.business_name)}`
                )
                  ? handleChangeStatus(cell.row.original.id)
                  : null
              }
            >
              {cell.row.original.status == 1 ? (
                <ArrowDownwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowDownwardIcon>
              ) : (
                <ArrowUpwardIcon
                  sx={{ width: 22, height: 22 }}
                ></ArrowUpwardIcon>
              )}
            </button> */}
          </div>
        ),
      },
    ];
  }
  return <DataTable columns={columns} data={data}></DataTable>;
};

export default DrawDataTable;
