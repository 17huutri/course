import React, { useEffect, useState } from "react";
import HeaderReusable from "../../components/Admin/HeaderReusable";
import { useDispatch, useSelector } from "react-redux";
import { Card, Modal } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import {
  createCatalog,
  deleteCatalog,
  getCatalog,
  updateCatalog,
} from "../../store/slices/adminSlice";

export default function CatalogAdmin() {
  //declare
  const dispatch = useDispatch();
  const { catalog, isFlag } = useSelector((state) => state.adminReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalogToDelete, setCatalogToDelete] = useState(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCatalogData, setEditCatalogData] = useState(null);
  const [error, setError] = useState("");
  const { handleSubmit, register, reset } = useForm();

  //handle
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onSubmit = (values) => {
    const newCatalogName = values.name;
    //edit
    if (isEditing) {
      const checkCatalog = catalog.some((item) => item.name === newCatalogName);
      if (checkCatalog) {
        setError("Catalog already exists");
        return;
      } else {
        dispatch(updateCatalog({ id: editCatalogData.id, name: values.name }));
      }
      setIsEditing(false);
      setIsModalOpen(false);
      setError("");
      reset();
    } else {
      //create
      const checkCatalog = catalog.some((item) => item.name === newCatalogName);
      if (checkCatalog) {
        setError("Catalog already exists");
        return;
      } else {
        dispatch(createCatalog(values));
      }
      reset();
      setIsModalOpen(false);
      setError("");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setError("");
    reset();
    if (isEditing) {
      setEditCatalogData(null);
      setIsEditing(false);
    }
  };
  //Delete
  const showConfirmDeleteModal = (catalogId) => {
    setCatalogToDelete(catalogId);
    setConfirmDeleteModalOpen(true);
  };

  const hideConfirmDeleteModal = () => {
    setCatalogToDelete(null);
    setConfirmDeleteModalOpen(false);
  };
  const confirmDelete = () => {
    if (catalogToDelete) {
      dispatch(deleteCatalog(catalogToDelete));
      // dispatch(getCatalog());
      hideConfirmDeleteModal();
    }
  };
  //Edit
  const handleEditClick = (catalogId) => {
    const catalogToEdit = catalog.find((item) => item.id === catalogId);
    if (catalogToEdit) {
      setEditCatalogData(catalogToEdit);

      setIsEditing(true);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    dispatch(getCatalog());
  }, [isFlag]);

  return (
    <div className="w-full h-full overflow-y-auto px-4">
      <HeaderReusable text={"Catalog Management"} border={"b"} />
      <div className="flex flex-col ">
        <div className="pb-4">
          <button
            onClick={showModal}
            className="float-right px-4 py-2 bg-blue_2 text-white rounded-[8px] font-medium"
          >
            Add new catalog
          </button>
        </div>
        <div className="px-[3%]  py-[1%] grid grid-cols-12 gap-10 bg-gray_1 rounded-[5px]">
          {catalog &&
            catalog?.map((item) => (
              <Card
                key={item.id}
                title={item.name}
                className="col-span-3"
                actions={[
                  <span
                    className=" text-blue-600 text-[16px]"
                    onClick={() => handleEditClick(item.id)}
                  >
                    <EditOutlined key="edit" />
                  </span>,
                  <span
                    className="text-red-600 text-[16px]  "
                    onClick={() => showConfirmDeleteModal(item.id.trim())}
                  >
                    <DeleteOutlined key="delete" />
                  </span>,
                ]}
              >
                <p className="text-[16px]">
                  Have{" "}
                  <span className="text-[#bf0000] font-semibold">
                    {item.courseCount}
                  </span>{" "}
                  Course Active in Catalog{" "}
                </p>
              </Card>
            ))}
        </div>
      </div>

      {/* Create và Edit */}
      <Modal
        title={isEditing ? "Edit Catalog" : "Add Catalog"}
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col pb-4">
            <label className="pb-2 font-medium">Name Catalog</label>
            <input
              className="border border-solid h-[35px] px-2"
              defaultValue={editCatalogData ? editCatalogData.name : ""}
              {...register("name", {
                required: "Required",
              })}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mr-2 !bg-green-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      {/* Delete */}
      <Modal
        open={confirmDeleteModalOpen}
        footer={null}
        onCancel={hideConfirmDeleteModal}
      >
        Are you sure you want to delete this catalog?
        <div className="flex justify-end">
          <button
            onClick={confirmDelete}
            className="mr-2 !bg-green-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            onClick={hideConfirmDeleteModal}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
