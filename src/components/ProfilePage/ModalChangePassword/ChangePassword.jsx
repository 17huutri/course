import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordThunk } from "../../../store/slices/changePassSlice";
import { isChangePass } from "../../../store/slices/instructorSlice";
import { useForm } from "react-hook-form";
import yup from "../../../YupGlobal/YupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import schemaChangePass from "../../../YupGlobal/schemaYup/changePassYup";

function ChangePassword({}) {
  const { isChanged } = useSelector((state) => state.instructorReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isPasswordValid, setIsPasswordValid] = useState(true);
  // const { username } = useSelector((state) => state.accountReducer);

  const dispatch = useDispatch();

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schemaChangePass),
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    dispatch(
      changePasswordThunk({
        // username,
        currentPassword,
        newPassword,
        confirmNewPassword,
      })
    );
    dispatch(isChangePass(!isChanged));

    reset();
  };

  const handleCancel = () => {
    reset();
    dispatch(isChangePass(false));
  };
  useEffect(() => {
    if (isChanged === true) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isChanged]);

  return (
    <>
      {isModalOpen && (
        <div className="w-[70%] m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <div>
                <div className="flex justify-between mt-2">
                  <label>Current Password</label>
                  <input
                    name="currentPassword"
                    type="password"
                    {...register("currentPassword")}
                    className={` ${
                      errors.currentPassword ? "is-invalid" : ""
                    } rounded-2xl`}
                  />
                  {/* {!isPasswordValid && (
                    <div className="error-message">Incorrect password</div>
                  )} */}
                </div>
                <div className="text-right mt-2 text-red-500">
                  {errors.currentPassword?.message}
                </div>
              </div>
              <div>
                <div className="flex justify-between mt-2">
                  <label>New Password</label>
                  <input
                    name="newPassword"
                    type="password"
                    {...register("newPassword")}
                    className={` ${
                      errors.newPassword ? "is-invalid" : ""
                    }rounded-2xl`}
                  />
                </div>
                <div className="text-right mt-2 text-red-500">
                  {errors.newPassword?.message}
                </div>
              </div>
              <div>
                <div className="flex justify-between mt-2">
                  <label>Confirmm New Password</label>
                  <input
                    name="confirmNewPassword"
                    type="password"
                    {...register("confirmNewPassword")}
                    className={` ${
                      errors.confirmNewPassword ? "is-invalid" : ""
                    }rounded-2xl`}
                  />
                </div>
                <div className="text-right mt-2 text-red-500">
                  {errors.confirmNewPassword?.message}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="!bg-green-600/100 text-white px-3 py-1 mr-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                className="!bg-red-600/100 text-white px-2 py-1 rounded-lg"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ChangePassword;
