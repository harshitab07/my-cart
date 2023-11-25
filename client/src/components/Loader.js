import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Loader = ({redirect, path = 'login'}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ count, setCount ] = useState(3);

    useEffect(() => {
        if (redirect) {
            const interval = setInterval(() => {
                setCount((prevValue) => --prevValue);
            }, 1000);
    
            count === 0 && navigate(`/${path}`, {
                state: location.pathname
            });
    
            return () => clearInterval(interval);
        }
    }, [count, navigate, redirect, location, path]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      { 
        redirect ? <h5 className="text-center mt-2">Redirecting in {count} seconds...</h5> : null
      }
    </div>
  );
};
export default Loader;
