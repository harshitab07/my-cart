import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from "../../components/layout/layout";
import '../../styles/auth.css';

const ForgotPassword = () => {
  const [ email, setEmail ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(process.env.REACT_APP_FORGOT_PASSWORD, { email, answer, password });

        if (!res.data.success) toast.error(res.data.message);
        else {
          toast.success('Password changed successfully!');
          setTimeout(() => navigate('/login'), 2000 );
        }

      } catch (error) {
        console.log('Forgot password failed', { error });
        toast.error('Failed to change password');
      }
  }
  return (
    <Layout title='My-Cart : Forgot password'>
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
              type="text"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="New Password.."
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="text"
              value={answer} onChange={(e) => setAnswer((e.target.value).toLowerCase())}
              className="form-control"
              placeholder="What's your favorite dish?"
            />
          </div>
        </div>
        <div className="register-btn">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default ForgotPassword;
