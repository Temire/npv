import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  DASHBOARD_URL,
  LOGIN_PAGE_URL,
  SUBSCRIPTIONS_URL,
  UPLOAD_MGMNT_URL,
  MANAGE_PROPERTY_URL,
  USER_MGMNT_URL,
  SETTINGS_URL,
  MANAGE_USER_URL,
  ROLE_MGMNT_URL,
  UNAUTHORIZED_URL,
} from "../utils/routes.url";
import { RouteGuard } from "../utils";
import {
  Home,
  PropertyManagement,
  Settings,
  UserManagement,
  Subscriptions,
  ManageProperty,
  ManageUser,
  RoleManagement,
} from "../pages/app";
import { Login } from "../pages/auth";
import { AuthLayout, Dashboardlayout } from "../components";
import { UnauthorizedPage } from "../pages/unauthorized";
import { Roles } from "../types/enums";
import { withAuthorization } from "../hoc";
import { useUser } from "../context";

const MainRoutes = () => {
  const { user } = useUser();
  const [userRole, setUserRole] = useState<Roles | undefined>(undefined);
  // const userRole: Roles = user?.role as Roles;

  useEffect(() => {
    if (user) {
      setUserRole(user?.role);
    }
  }, [user]);

 

  const RoleManagementWithAuthorization = withAuthorization([
    Roles.SUPER_ADMIN,
  ])(RoleManagement);

  // User
  const UserManagementWithAuthorization = withAuthorization([
    Roles.ADMIN_USER_MGT,
    Roles.SUPER_ADMIN,
  ])(UserManagement);
  const ManageUserWithAuthorization = withAuthorization([
    Roles.ADMIN_USER_MGT,
    Roles.SUPER_ADMIN,
  ])(ManageUser);

  // Property
  const PropertyManagementWithAuthorization = withAuthorization([
    Roles.ADMIN_PROPERTY_MGT,
    Roles.SUPER_ADMIN,
  ])(PropertyManagement);
  const ManagePropertyWithAuthorization = withAuthorization([
    Roles.ADMIN_PROPERTY_MGT,
    Roles.SUPER_ADMIN,
  ])(ManageProperty);

  return (
    <Routes>
      {/* Login and Sign-up Screens */}
      <Route element={<AuthLayout />}>
        <React.Fragment>
          <Route path={LOGIN_PAGE_URL} element={<Login />} />
          {/* <Route path={SIGNUP_PAGE_URL} element={<SignUp />} /> */}
        </React.Fragment>
      </Route>

      {/* Dashboard Screens */}
      <Route element={<RouteGuard />}>
        <Route element={<Dashboardlayout />}>
          <React.Fragment>
            <Route path={DASHBOARD_URL} element={<Home />} />

            {/* User */}
            <Route
              path={USER_MGMNT_URL}
              element={<UserManagementWithAuthorization userRole={userRole} />}
            />
            <Route
              path={MANAGE_USER_URL}
              element={<ManageUserWithAuthorization userRole={userRole} />}
            />

            {/* Property */}
            <Route
              path={UPLOAD_MGMNT_URL}
              element={
                <PropertyManagementWithAuthorization userRole={userRole} />
              }
            />
            <Route
              path={MANAGE_PROPERTY_URL}
              element={<ManagePropertyWithAuthorization userRole={userRole} />}
            />

            {/* Subscriptions */}
            <Route path={SUBSCRIPTIONS_URL} element={<Subscriptions />} />

            {/* Roles */}
            <Route
              path={ROLE_MGMNT_URL}
              element={<RoleManagementWithAuthorization userRole={userRole} />}
            />

            {/* Settings */}
            <Route path={SETTINGS_URL} element={<Settings />} />
          </React.Fragment>
        </Route>
      </Route>

      {/* Unauthorized */}
      <Route path={UNAUTHORIZED_URL} element={<UnauthorizedPage />} />
    </Routes>
  );
};

export default MainRoutes;
