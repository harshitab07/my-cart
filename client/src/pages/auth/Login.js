import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from "../../components/layout/layout";
import '../../styles/auth.css';
import { useAuth } from "../../context/auth";

const Login = () => {
  const [ auth, setAuth ] = useAuth();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleForgotPassword = () => navigate('/forgot-password')

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(process.env.REACT_APP_LOGIN, { email, password });

        if (!res.data.success) toast.error(res.data.message);
        else {
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token
          });
          localStorage.setItem('auth', JSON.stringify(res.data));
          toast.success('Login successful');
          setTimeout(() => {
            navigate(location.state || '/');
          }, 2000 );
        }

      } catch (error) {
        console.log('Login failed', { error });
        toast.error('Failed to login');
      }
  }
  return (
    <Layout title='My-Cart Login'>
<div className="form-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"  placeholder="Enter email.." />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter password.."
            />
          </div>
        </div>
        <div className="register-btn">
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
        <button className="btn btn-primary" onClick={handleForgotPassword} style={{backgroundColor:"#404040"}}>
          Forgot Password
        </button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default Login;
