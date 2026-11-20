// withAuthorization.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { Roles } from "../../types/enums";
import { UNAUTHORIZED_URL } from "../../utils";
import { useUser } from "../../context";

interface WithAuthorizationProps {
  userRole: Roles | undefined;
  profileLoading?: boolean;
  profileError?: boolean;
  retryProfile?: () => void;
}

export const withAuthorization =
  (allowedRoles: Roles[]) =>
  <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthorizedComponent = (props: P & WithAuthorizationProps) => {
      const { userRole, profileLoading, profileError, retryProfile } = props;
      const profile = useUser();
      const loading = profileLoading ?? profile.profileLoading;
      const failed = profileError ?? profile.profileError;
      const retry = retryProfile ?? profile.retryProfile;
      if (userRole === undefined || userRole === null) {
        if (failed) return <div role="alert" className="p-6">Could not load your admin profile. <button className="underline" onClick={() => retry()}>Retry</button></div>;
        if (loading) return <div role="status" className="p-6">Loading your admin profile...</div>;
        return <div role="alert" className="p-6">Your admin profile is unavailable. Please sign in again.</div>;
      }
      if (allowedRoles.includes(userRole)) return <WrappedComponent {...props} />;
      return <Navigate to={UNAUTHORIZED_URL} replace />;
    };
    AuthorizedComponent.displayName = `WithAuthorization(${WrappedComponent.displayName || WrappedComponent.name || "Page"})`;
    return AuthorizedComponent;
  };
