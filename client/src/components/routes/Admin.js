import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

const PrivateAdminRoute = () => {
    const [ success, setSuccess ] = useState(false);

    const [ auth, setAuth ] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(process.env.REACT_APP_ADMIN_AUTH);

            if (res.data.success) {
                setSuccess(true);
            } else {
                setSuccess(false);
            }
        }

        if (auth?.token) authCheck();
    }, [auth?.token]);

    return success ? <Outlet /> : <Loader redirect={true} path='' />;
};

export default PrivateAdminRoute;