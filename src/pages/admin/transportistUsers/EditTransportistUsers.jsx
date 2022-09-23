import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DivAnimate from "../../../components/DivAnimate";
import { useForm } from "../../../hooks/useForm";
import moment from "moment";
import {
  activeUser,
  onClearUsers,
  updateUser,
} from "../../../features/usersSlice";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { setSessionStorage } from "../../../utils/session";
import AlertMessage from "../../../components/AlertMessage";

const EditTransportistUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const { error, userActive, loadingActive, loadingAction } = useSelector(
    (state) => state.users
  );

  const [availableData, setAvailableData] = useState(!!userActive);

  const [formValues, handleInputChange, reset] = useForm({
    rut: userActive?.rut || "",
    business_name: userActive?.business_name || "",
    name: userActive?.name || "",
    email: userActive?.email || "",
    type_id: userActive?.type_id || 1,
    phone: userActive?.phone || "",
    contract_created_at:
      moment(userActive?.Contract.created_at).format("YYYY-MM-DD") || "",
    contract_expired_at:
      moment(userActive?.Contract.expired_at).format("YYYY-MM-DD") || "",
  });

  const {
    rut,
    business_name,
    name,
    email,
    type_id,
    phone,
    contract_created_at,
    contract_expired_at,
  } = formValues;

  useEffect(() => {
    if (!userActive && loadingActive) {
      dispatch(activeUser({ user_id, role_id: 5 }));
    }

    return () => {
      dispatch(onClearUsers());
    };
  }, []);

  useEffect(() => {
    if (!loadingActive && userActive && !availableData) {
      handleInputChange([
        { name: "rut", value: userActive.rut },
        { name: "business_name", value: userActive.business_name },
        { name: "name", value: userActive.name },
        { name: "email", value: userActive.email },
        { name: "type_id", value: userActive.type_id },
        { name: "phone", value: userActive.phone },
        {
          name: "contract_created_at",
          value: moment(new Date(userActive.Contract.created_at)).format(
            "YYYY-MM-DD"
          ),
        },
        {
          name: "contract_expired_at",
          value: moment(new Date(userActive.Contract.expired_at)).format(
            "YYYY-MM-DD"
          ),
        },
      ]);
    }
  }, [userActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUser = {
      id: user_id,
      role_id: 5,
      rut,
      business_name,
      name,
      type_id,
      phone,
      contract_expired_at: moment(
        new Date(`${contract_expired_at}T18:24:00`)
      ).format("DD/MM/YYYY"),
    };

    const { meta } = await dispatch(updateUser({ user: newUser }));

    if (meta.requestStatus === "rejected")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (meta.requestStatus === "fulfilled") {
      setSessionStorage({
        message: "Usuario actualizado correctamente",
        type: "success",
      });

      navigate("/admin/users/transportists");
    }
  };

  return (
    <DivAnimate>
      <h1 className="text-2xl md:text-3xl font-semibold">
        Editar usuario transportista
      </h1>
      {loadingActive ? (
        <div className="flex items-center justify-center mt-7">
          <CircularProgress
            size={30}
            style={{ color: "#15803d" }}
          ></CircularProgress>
        </div>
      ) : !userActive ? (
        <h1>Usuario no encontrado</h1>
      ) : (
        <form
          className="border p-4 mt-5 shadow rounded"
          onSubmit={handleSubmit}
        >
          {error?.message && (
            <div className="mb-4">
              <AlertMessage
                type={error.message.type}
                message={error.message.message}
              ></AlertMessage>
            </div>
          )}
          <div className="mb-6">
            <label
              htmlFor="rut"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Rut (*)
            </label>
            <input
              type="text"
              name="rut"
              className={`${
                error?.fields?.rut
                  ? "border-red-500 focus:border-red-300"
                  : "border-gray-300 focus:border-green-700"
              } disabled:bg-gray-200 disabled:cursor-not-allowed bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
              placeholder="XXXXXXXX-X"
              value={rut}
              onChange={handleInputChange}
              // required
            />
            {error?.fields?.rut?.message && (
              <span className="text-xs text-red-500">
                {error.fields.rut.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="business_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Razón social (*)
            </label>
            <input
              type="text"
              name="business_name"
              className={`${
                error?.fields?.business_name
                  ? "border-red-500 focus:border-red-300"
                  : "border-gray-300 focus:border-green-700"
              } disabled:bg-gray-200 disabled:cursor-not-allowed bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
              value={business_name}
              onChange={handleInputChange}
              // required
            />
            {error?.fields?.business_name?.message && (
              <span className="text-xs text-red-500">
                {error.fields.business_name.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Nombre (*)
            </label>
            <input
              type="text"
              name="name"
              className={`${
                error?.fields?.name
                  ? "border-red-500 focus:border-red-300"
                  : "border-gray-300 focus:border-green-700"
              } disabled:bg-gray-200 disabled:cursor-not-allowed bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
              // required
              value={name}
              onChange={handleInputChange}
            />
            {error?.fields?.name?.message && (
              <span className="text-xs text-red-500">
                {error.fields.name.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email (*)
            </label>
            <input
              type="email"
              name="email"
              className={`${
                error?.fields?.email
                  ? "border-red-500 focus:border-red-300"
                  : "border-gray-300 focus:border-green-700"
              } disabled:bg-gray-200 disabled:cursor-not-allowed bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
              // required
              value={email}
              onChange={handleInputChange}
              disabled
            />
            {error?.fields?.email?.message && (
              <span className="text-xs text-red-500">
                {error.fields.email.message}
              </span>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Tipo
            </label>
            <select
              name="type_id"
              className={`${
                error?.fields?.type_id
                  ? "border-red-500 focus:border-red-300"
                  : "border-gray-300 focus:border-green-700"
              } bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
              value={type_id}
              onChange={handleInputChange}
            >
              <option value="1">Local</option>
              <option value="2">Extranjero</option>
              <option value="3">Local y extranjero</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Telefono (*)
            </label>
            <input
              type="text"
              name="phone"
              className={`${
                error?.fields?.phone
                  ? "border-red-500 focus:border-red-300"
                  : "border-gray-300 focus:border-green-700"
              } disabled:bg-gray-200 disabled:cursor-not-allowed bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
              // required
              value={phone}
              onChange={handleInputChange}
            />
            {error?.fields?.phone?.message && (
              <span className="text-xs text-red-500">
                {error.fields.phone.message}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400 border-b block mb-2 pb-1">
            Informacion del contrato
          </span>
          <div className="mb-6">
            <label
              htmlFor="contract_created_at"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Fecha inicio contrato
            </label>
            <input
              type="date"
              id="contract_created_at"
              className="focus:border-green-700 bg-gray-50 disabled:bg-gray-200 disabled:cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              value={contract_created_at}
              disabled
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="contract_expired_at"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Fecha termino contrato (*)
            </label>
            <input
              type="date"
              name="contract_expired_at"
              className={`${
                error?.fields?.contract_expired_at
                  ? "border-red-500 focus:border-red-300"
                  : "border-gray-300 focus:border-green-700"
              } disabled:bg-gray-200 disabled:cursor-not-allowed bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-gray-400`}
              // min={moment(new Date()).add(1, "days").format("YYYY-MM-DD")}
              // required
              value={contract_expired_at}
              onChange={handleInputChange}
            />
            {error?.fields?.contract_expired_at?.message && (
              <span className="text-xs text-red-500">
                {error.fields.contract_expired_at.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="disabled:bg-green-400 disabled:cursor-wait bg-green-700 hover:bg-green-600 text-white py-2 px-4 w-full md:w-auto rounded shadow"
            disabled={loadingAction}
          >
            {!loadingAction ? (
              "Actualizar"
            ) : (
              <div className="flex items-center space-x-2">
                <span>Actualizando</span>
                <CircularProgress color="inherit" size="1rem" />
              </div>
            )}
          </button>
        </form>
      )}
    </DivAnimate>
  );
};

export default EditTransportistUsers;
