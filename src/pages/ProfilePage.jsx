import React, { useEffect, useState } from "react";
import ProfilePageNav from "../components/ProfilePage/ProfilePageNav";
import ProfileDetail from "../components/ProfilePage/ProfileDetail/ProfileDetail";
import ChangePassword from "../components/ProfilePage/ModalChangePassword/ChangePassword";
import AccountInformation from "../components/ProfilePage/AccountInformation/AccountInformation";
import { useDispatch, useSelector } from "react-redux";
import { isUpdating, isChangePass } from "../store/slices/instructorSlice";
import { fetchUserProfile } from "../store/slices/userSlice";

function ProfilePage() {
  const { isUpdate, isChanged } = useSelector(
    (state) => state.instructorReducer
  );
  const { role } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(true);
  const handleUpdate = () => {
    dispatch(isUpdating(true));
    dispatch(isChangePass(false));
  };

  const handleChangePass = () => {
    dispatch(isChangePass(true));
    dispatch(isUpdating(false));
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [isUpdate, isChanged]);
  return (
    <div className="bg-background_3 h-full">
      {role !== "User" ? <ProfilePageNav text={"Profile"} /> : null}
      <div className="grid grid-cols-12 gap-12 lg:px-10 sm: px-3 py-5">
        <div className="lg:col-span-4 sm: col-span-12">
          <ProfileDetail />
        </div>
        <div className="lg:col-span-8 col-span-12 bg-white px-4">
          <div className="w-[100%] h-full py-5 pr-5 ">
            <div className="flex flex-col h-full">
              <div className="h-[10%] flex justify-between items-center">
                {isChanged === false && (
                  <h1 className="mb-10 font-medium text-xl">
                    General information
                  </h1>
                )}
                {isChanged && (
                  <h1 className="font-bold text-xl">Change Password</h1>
                )}
              </div>
              <div className="mt-3 h-[80%]">
                {isChanged === true && <ChangePassword />}
                {showInfo && isChanged === false && <AccountInformation />}
              </div>
              <div className="mx-auto flex justify-between">
                <button
                  onClick={handleChangePass}
                  type="button"
                  className="!bg-blue-400 text-white px-4 py-2 rounded-2xl hover:!bg-black"
                >
                  Change Password
                </button>
                <button
                  onClick={handleUpdate}
                  type="button"
                  className="!bg-blue-400 text-white px-4 py-2 rounded-2xl hover:!bg-black ml-2"
                >
                  Edit profile
                </button>
              </div>
            </div>
          </div>{" "}
        </div>


      </div>
    </div>
  );
}

export default ProfilePage;
