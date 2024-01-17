import React, { useEffect, useState } from "react";
import HeaderReusable from "../../components/Admin/HeaderReusable";
import { useDispatch, useSelector } from "react-redux";

import { Input, Modal, Select, Table } from "antd";
import { format, parseISO } from "date-fns";
import { CiLocationOn } from "react-icons/ci";
import { getUsers, updateActiveUser } from "../../store/slices/adminSlice";

import RegisterInstructor from "../../components/Admin/RegisterInstructor";
import { ToastContainer } from "react-toastify";
export default function UsersPage() {
  //declare
  const dispatch = useDispatch();
  const { users, isFlag } = useSelector((state) => state.adminReducer);
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const columns = [
    {
      title: "Full name",
      dataIndex: "fullname",
      key: "fullname",
      sorter: (a, b) => {
        const nameA = `${a.lastName} ${a.firstName}`;
        const nameB = `${b.lastName} ${b.firstName}`;
        return nameA.localeCompare(nameB);
      },
      defaultSortOrder: "ascend",
      render: (_, { firstName, lastName, image }) => (
        <div className="font-semibold flex items-center ">
          <img
            className="rounded-full w-[35px] h-[35px] mr-4"
            src={image}
            alt=""
          />
          <span className="px-2 rounded-md font-semibold bg-[#adad09] text-[#fbffb6]">
            {" "}
            {`${lastName} ${firstName}`}
          </span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",

      render: (email) => <p>{email}</p>,
    },
    {
      title: "Career",
      dataIndex: "career",
      key: "career",
      render: (_, { career }) => <p>{career}</p>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (_, { gender }) => <p>{gender}</p>,
    },
    {
      title: "Create Date",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) => {
        const dateA = new Date(a.createdDate);
        const dateB = new Date(b.createdDate);
        return dateA - dateB;
      },
      render: (_, { createdDate }) => (
        <p>{format(parseISO(createdDate), "MMM dd, yyyy")}</p>
      ),
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
      render: (_, { address }) => (
        <p className="flex items-center">
          <CiLocationOn className="mr-1" />
          {address}
        </p>
      ),
    },
    {
      title: "Permissions",
      dataIndex: "role",
      key: "role",

      render: (_, { role }) => (
        <span
          className={`px-2 py-1 rounded-md font-semibold ${role === "Instructor"
              ? "bg-[#eaeaa8b3] text-[#b68300]"
              : role === "User"
                ? "bg-[#a0d3ff96] text-[#0e2aff]"
                : "bg-black text-white"
            }`}
        >
          {role}
        </span>
      ),
    },

    {
      title: "Enable/Disable",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status, record) => (
        <button
          onClick={() => {
            handleActiveUser(record.id, status);
          }}
          className={`px-3 py-[2px] rounded-md font-semibold  ${status === "Enable"
              ? "text-white bg-[#07c807ba]"
              : "text-white bg-[#ff0000de]"
            }`}
        >
          {status}
        </button>
      ),
    },
  ];
  //handle
  const filterData = () => {
    let filteredUsers = users;

    if (selectedRole) {
      filteredUsers = filteredUsers.filter(
        (user) => user.role === selectedRole
      );
    }
    if (selectedStatus) {
      const statusValue = selectedStatus === "Enable" ? "Enable" : "Disable";
      filteredUsers = filteredUsers.filter(
        (user) => user.status === statusValue
      );
    }
    if (searchText) {
      filteredUsers = filteredUsers.filter((user) => {
        const fullname = `${user.lastName} ${user.firstName}`;
        return fullname.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    return filteredUsers;
  };
  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchText(inputValue);
  };
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };
  const handleActiveUser = (id, status) => {
    let newStatus;
    if (status === "Enable") {
      newStatus = "Disable";
    } else {
      newStatus = "Enable";
    }
    dispatch(updateActiveUser({ id: id, status: newStatus }));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(getUsers());
  }, [isFlag]);

  return (
    <div className="w-full h-full overflow-y-auto px-4">
      <HeaderReusable text={"Users Management"} border={"b"} />
      <div className="px-[5%] py-[2%]">
        <div className="flex pb-4 justify-between items-center">
          <div className="flex gap-4">
            <Input
              placeholder="Search by Full Name"
              value={searchText}
              onChange={handleSearch}
            />
            <Select
              placeholder="Permissions: "
              value={
                selectedRole
                  ? `Permissions: ${selectedRole}`
                  : "Permissions: All"
              }
              onChange={handleRoleChange}
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="Instructor">Instructor</Select.Option>
              <Select.Option value="User">User</Select.Option>
              <Select.Option value="Admin">Admin</Select.Option>
            </Select>
            <Select
              value={
                selectedStatus
                  ? `Activation Options: ${selectedStatus}`
                  : "Activation Options: All"
              }
              onChange={handleStatusChange}
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="Enable">Enable</Select.Option>
              <Select.Option value="Disable">Disabled</Select.Option>
            </Select>
          </div>
          <button
            onClick={showModal}
            className="float-right px-4 py-2 bg-blue_2 text-white rounded-[8px] font-medium"
          >
            Create Instructor
          </button>
          <Modal
            title="Create Account"
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <RegisterInstructor onCancel={handleCancel} />
          </Modal>
        </div>
        <Table
          columns={columns}
          dataSource={filterData()}
          rowKey={(record) => record.id}
        />
      </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}
