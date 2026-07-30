import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoutes = ({children}) => {
    const {user, loading} = use(AuthContext)
    const location = useLocation()

    if(loading) {
        return <h4 className="text-3xl font-semibold my-10 text-center">loading.....</h4>
    }

    if(user) {
        return children
    }

    return (
        <Navigate state={location?.pathname} to="/login"></Navigate>
    );
};

export default PrivateRoutes;