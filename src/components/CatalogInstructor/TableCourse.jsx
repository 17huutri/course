import React, { useEffect } from "react";
import { Space, Table } from "antd";
import { faBook, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  getCatalog,
  getCoursesIns,
  deleteCourse,
  setIsSelected,
} from "../../store/slices/courseSlice/courseSlice";
import {
  isUpdatingForm,
  isUpdatedForm,
} from "../../store/slices/courseSlice/createCourseSlice";
import { Link } from "react-router-dom";
import courseApi from "../../api/courseApi";
import { ToastContainer, toast } from "react-toastify";
import { HashLoader, PropagateLoader } from "react-spinners";
import {
  isCousedSelect,
  isFullingfull1,
} from "../../store/slices/courseSlice/curriculumSlice";
export default function TableCourse() {
  const dispatch = useDispatch();

  //declare
  const { courses, catalog, isLoading } = useSelector(
    (state) => state.courseReducer
  );
  const deleteSuccessNotify = () => toast.success("Delete done !!!!!!");

  const columns = [
    {
      title: "Item No",
      key: "index",
      render: (text, record) => courses.indexOf(record) + 1,
    },
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Create Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createTime) => {
        const newCreateTime = new Date(createTime);
        const showCreateTime = newCreateTime.toLocaleString();
        return (
          <div>
            <p>{showCreateTime}</p>
          </div>
        );
      },
      sorter: (a, b) => a.createdDate.localeCompare(b.createdDate),
    },
    {
      title: "Update Date",
      dataIndex: "UpdateDate",
      key: "UpdateDate",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (_, { price }) => <h1 className=" font-bold">{price} $</h1>,
    },
    {
      title: "Category",
      key: "Category",
      dataIndex: "categoryId",
      render: (_, { catalogIDs }) => {
        const categoryName =
          catalog &&
          catalog
            .filter((catl) => catalogIDs.includes(catl.id))
            .map((cat) => cat.name)
            .join(", ");

        return (
          <h1 className="bg-green_3 rounded-[5px] px-2 overflow-x-auto">
            {categoryName}
          </h1>
        );
      },
    },
    {
      title: "Action",
      key: "action",

      render: (record) => (
        <Space size="middle">
          <Link to={"/instructor/catalog/createcourse"}>
            <FontAwesomeIcon
              icon={faEdit}
              className="hover:cursor-pointer"
              onClick={() => handleEdit(record.id)}
            />
          </Link>

          <FontAwesomeIcon
            className="text-red-600 hover:cursor-pointer"
            icon={faTrash}
            onClick={() => handleDelete(record.id)}
          />
          <Link to={"/instructor/catalog/curriculum"}>
            <FontAwesomeIcon
              icon={faBook}
              className="hover:cursor-pointer"
              onClick={() => handleAddCurri(record.id)}
            />
          </Link>
        </Space>
      ),
    },
  ];

  const handleAddCurri = (id) => {
    dispatch(isCousedSelect(id));
  };
  const handleEdit = (id) => {
    const selectCourse = courses.filter((item) => item.id === id);
    dispatch(isUpdatedForm(true));
    dispatch(isUpdatingForm(selectCourse[0]));
  };

  const getcourses1 = { limit: 999 };
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to do this?");
    if (confirm) {
      dispatch(setIsSelected(id));

      dispatch(deleteCourse(id));
      deleteSuccessNotify();
    }
  };

  let locale = {
    emptyText: (
      <div className="flex justify-center mt-5 mb-5">
        <HashLoader color="#949f9d" size={30} />
      </div>
    ),
  };

  useEffect(() => {
    //Top Courses GET
    dispatch(getCoursesIns(getcourses1));
    dispatch(getCatalog());
  }, []);

  return (
    <>
      {isLoading === true && <PropagateLoader />}
      <Table
        locale={locale}
        columns={columns}
        dataSource={courses}
        rowKey={(record) => record.id}
      />
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}
