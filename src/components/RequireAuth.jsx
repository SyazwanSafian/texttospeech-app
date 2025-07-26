import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAuth({ children }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}
