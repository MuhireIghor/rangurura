/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, Navigate } from "react-router-dom";
import { FC, Suspense } from "react";
import { isAuthenticated } from "services/token";
import { decodeToken } from "utils/auth";
import Loader from "components/molecules/Loader";
interface PublicRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  redirect?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, redirect }) => {
  const location = useLocation();
  const newRedirect = redirect;

  return !newRedirect ? (

    <Suspense fallback={<Loader />}>
      {
        isAuthenticated() && location.pathname === "/auth/login" ? (
          <Navigate to={"/"} />
        ) : (
          <Component />
        )
      }
    </Suspense>

  ) :
    (
      <Suspense fallback={<Loader />}>
        <Navigate to={redirect} />
      </Suspense>
    )


};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthRoute: FC<{ component: React.ComponentType<any>, allowedRoles: string[] }> = ({ component: Component, allowedRoles }) => {
  const location = useLocation();
  let allowedUsers = false;

  if (isAuthenticated()) {
    const userRole = decodeToken().role;
    allowedUsers = allowedRoles.includes(userRole);
  }

  return (
    <Suspense fallback={<Loader />}>
      {allowedUsers ? (
        <Component />
      ) : (
        <Navigate to="/auth/login" state={{ from: location }} replace />
      )}
    </Suspense>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PrivateRoute: FC<{ component: React.ComponentType<any>, allowedRoles: string[], redirect: string }> = ({ component: Component, allowedRoles, redirect }) => {
  const location = useLocation();
  let allowedUsers = false;

  if (isAuthenticated()) {
    const userRole = decodeToken()?.role;
    allowedUsers = allowedRoles.includes(userRole);
  }

  const nextUrl = location.pathname + location.search;

  return (
    <Suspense fallback={<Loader />}>
      {isAuthenticated() ? (
        allowedUsers ? (
          redirect ? (
            <Navigate to={redirect + location.search} replace />
          ) : (
            <Component />
          )
        ) : (
          <Navigate to="/not-found" replace />
        )
      ) : (
        <Navigate to={`/login?nextUrl=${nextUrl}`} state={{ from: location }} replace />
      )}
    </Suspense>
  );
};

