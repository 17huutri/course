import React, { useEffect } from "react";
import yup from "../../../YupGlobal/YupGlobal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Select, Space, Image } from "antd";
import { isUpdating } from "../../../store/slices/instructorSlice";
import {
  fetchUserProfile,
  setValuesUpdate,
  updateUserProfile,
} from "../../../store/slices/userSlice";

const { Option } = Select;

function AccountInformation() {
  const { isUpdate } = useSelector((state) => state.instructorReducer);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.userReducer);
  const [form] = Form.useForm();

  const genderOptions = {
    "0": "Male",
    "1": "Female",
    "2": "Other",
  };
  const schema = yup.object().shape({
    gender: yup.string().required("Please select a gender"),
    phoneNumber: yup
      .string()
      .phoneNumber()
      .required("Phone number is required"),
    image: yup
      .string()
      .required('Image is required')
      .matches(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
        'Please enter a valid image URL'
      )
  });

  const yupSync = {
    async validator({ field }, value) {
      await schema.validateSyncAt(field, { [field]: value });
    },
  };


  const handleSave = (values) => {
    dispatch(isUpdating(false));
    dispatch(setValuesUpdate(values));

    dispatch(updateUserProfile(values))
      .then(() => {
        toast.success("Update successed!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCancel = () => {
    form.setFieldsValue(profile);
    dispatch(isUpdating(false));
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <Form className="grid grid-cols-10 gap-4 "
        form={form}
        onFinish={handleSave}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        initialValues={profile}
        validationSchema={schema}
        labelAlign="left"
        style={{ fontSize: "17px", marginLeft: "30px" }}
      >


        <div className="col-span-7 text-2xl font-semibold">

          <Form.Item

            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please enter your first name",
              },
            ]}
          >
            {isUpdate ? (
              <Input
                placeholder="First name"
                style={{ width: 200 }}
                disabled={!isUpdate}
              />
            ) : (
              <span>{profile?.firstName}</span>
            )}
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please enter your last name",
              },
            ]}
          >
            {isUpdate ? (
              <Input
                placeholder="Last name"
                style={{ width: 200 }}
                disabled={!isUpdate}
              />
            ) : (
              <span>{profile?.lastName}</span>
            )}
          </Form.Item>


          <Form.Item label="Email" name="email" className="text-left ml-3" >


            <span>{profile?.email}</span>
          </Form.Item>


          <Form.Item label="Phone Number" name="phoneNumber" className="col-span-1 ml-3"
            rules={[yupSync]} >
            {isUpdate ? (
              <Input
                placeholder="Phone Number"
                style={{ width: 200 }}
                disabled={!isUpdate}
              />
            ) : (
              <span>{profile?.phoneNumber}</span>
            )}
          </Form.Item>

          <Form.Item
            className="ml-3"
            label="Gender"
            name="gender"
            rules={[yupSync]}
          >
            {isUpdate ? (
              <Select style={{ width: 200 }} disabled={!isUpdate}>
                {Object.values(genderOptions).map(option => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            ) : (
              <span>{profile?.gender || '-'}</span>
            )}
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
          >
            {isUpdate ? (
              <Input
                placeholder="Address"
                style={{ width: 200 }}
                disabled={!isUpdate}
              />
            ) : (
              <span>{profile?.address}</span>
            )}
          </Form.Item>
        </div> <div className="col-span-3 font-semibold">
          <Form.Item label="Image" name="image"
            rules={[yupSync]}>
            {isUpdate ? (
              <>
                <Space>
                  <Input
                    defaultValue={profile?.image}
                    placeholder="Image URL"
                    style={{ width: 150 }}
                    allowClear
                  />
                </Space>
              </>
            ) : (
              <Image src={profile?.image} alt="User Image" width={150} />
            )}
          </Form.Item>
        </div>

        {
          isUpdate && (
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button className="!bg-black text-white" htmlType="submit">
                  Save All
                </Button>
                <Button type="default" onClick={handleCancel}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          )
        }
      </Form >
    </div >
  );
}

export default AccountInformation;
