import { Navigate, useLocation } from "react-router-dom";

interface Auth {
    children: object
}

export function RequireAuth({ children}: Auth) {
    const token = localStorage.getItem("token-admin")
    let location = useLocation();

    if (!token) {
        return <Navigate to ="/auth" state={{ from: location }} replace />;
    } else {
        return children;
    }
}