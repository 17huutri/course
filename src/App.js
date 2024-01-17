import "./App.css";
import LandingPageLayout from "./layouts/LandingPageLayout";
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import SubcriptionPage from "./pages/SubcriptionPage";
import HomeCoursesPage from "./pages/HomeCoursesPage";
import LandingPage from "./pages/LandingPage";
import CourseCatalogPage from "./pages/CourseCatalogPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ProfilePage from "./pages/ProfilePage";
import CreateCoursePage from "./pages/CreateCoursePage";
import Cart from "./components/CartDetail/Cart";
import { useDispatch, useSelector } from "react-redux";
import storageService from "./api/storageService";
import { setIsLogin, setRole } from "./store/slices/accountSlice";
import jwtDecode from "jwt-decode";
import CatalogPage from "./pages/CatalogPage";
import { ROLE } from "./api/constant_api";
import StudentProfile from "./pages/StudentProfile";
import ProtectedRoute from "./pages/protected/ProtectedRoute";
import NotFound from "./NotFound";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardPage from "./pages/admin/DashBoardPage";
import CatalogAdmin from "./pages/admin/CatalogAdmin";
import UsersPage from "./pages/admin/UsersPage";
import CoursesInCatalogPage from "./pages/CoursesInCatalogPage";
import InstructorHomePage from "./pages/InstructorHomePage";
import CurriculumPage from "./pages/CurriculumPage";
import InstructorProfile from "./components/Instructor/InstructorProfile";
import PaymentStatusPage from "./pages/PaymentStatusPage";
// import ProtectedRoute from "./pages/protected/ProtectedRoute";
import LearnCoursePage from "./pages/LearnCoursePage";
import StatusPayment from "./components/PaymentStatus/StatusPayment";
import SearchPage from "./pages/protected/SearchPage";
import ScrollToTop from "./ScrollToTop";

function App() {
  const { isLogin } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const role = storageService.getRole();
  const token = storageService.getAccessToken();

  useEffect(() => {
    let token = storageService.getAccessToken();
    if (token) {
      token = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > token.expire) {
        // storageService.removeAccessToken();
        storageService.setAccessToken("");
        dispatch(setIsLogin(false));
        storageService.removeRole();
        dispatch(setRole(""));
      } else {
        dispatch(setIsLogin(true));
        dispatch(setRole(token[ROLE]));
        storageService.setRole(token[ROLE]);
      }
    }
  }, []);

  return (
    <BrowserRouter basename="">
      <ScrollToTop />
      <Routes>
        {/* LANGDING PAGE */}
        <Route path="/payment-status" element={<StatusPayment />} />

        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/courses" element={<CourseCatalogPage />} />
          <Route
            path="/courses/:catlName"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={role === "User"}>
                <CoursesInCatalogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/course-detail/:id"
            element={<CourseDetailPage />}
          />
          <Route path="/instructor/instructor-profile/:instructorId"
            element={<InstructorProfile />}
          />

          <Route path="/search-results/:searchTerm"
            element={<SearchPage />}
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={role === "User"}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={role === "User"}>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studyingcourse"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={role === "User"}>
                <HomeCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studyingcourse/:id"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={role === "User"}>
                <LearnCoursePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {!isLogin && (
          <>
            <Route
              path="/login"
              element={
                <ProtectedRoute redirectPath="/" isAllowed={!token}>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute redirectPath="/" isAllowed={!token}>
                  <RegisterPage />
                </ProtectedRoute>
              }
            />
          </>
        )}

        {/* MainLayout */}

        {/* <Route index element={<Navigate to="/profile" />} /> */}

        {/* {role === "Instructor" && (
              <>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Navigate to="/profile" />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute
                        redirectPath="/login"
                        isAllowed={role === "Instructor"}
                      >
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/subcription"
                    element={
                      <ProtectedRoute
                        redirectPath="/login"
                        isAllowed={role === "Instructor"}
                      >
                        <SubcriptionPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/mycourses"
                    element={
                      <ProtectedRoute
                        redirectPath="/login"
                        isAllowed={role === "Instructor"}
                      >
                        <HomeCoursesPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route
                    path="/catalog/createcourse"
                    element={<CreateCoursePage />}
                  />
                </Route>
              </>
            )} */}

        <Route
          path="/instructor"
          element={
            <MainLayout
              redirectPath="/login"
              isAllowed={role === "Instructor"}
            />
          }
        >
          <Route index element={<Navigate to="/instructor/home" />} />
          <Route path="/instructor/home" element={<InstructorHomePage />} />
          <Route path="/instructor/profile" element={<ProfilePage />} />
          <Route path="/instructor/subcription" element={<SubcriptionPage />} />
          <Route path="/instructor/mycourses" element={<HomeCoursesPage />} />
          <Route path="/instructor/catalog" element={<CatalogPage />} />
          <Route
            path="/instructor/catalog/createcourse"
            element={<CreateCoursePage />}
          />
          <Route
            path="/instructor/catalog/curriculum"
            element={<CurriculumPage />}
          />
          {/* <Route path="*" element={<ProfilePage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* AdminLayout */}

        <Route
          path="/admin"
          element={
            <AdminLayout redirectPath="/login" isAllowed={role === "Admin"} />
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="/admin/dashboard" element={<DashBoardPage />} />

          <Route path="/admin/catalogs" element={<CatalogAdmin />} />
          <Route path="/admin/users" element={<UsersPage />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
