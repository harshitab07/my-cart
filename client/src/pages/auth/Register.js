import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import Layout from "../../components/layout/layout";

const Register = () => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ answer, setAnswer ] = useState('');
    const [ role, setRole ] = useState('user');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isAdmin = role === 'user' ? 0 : 1;
        try {
          const res = await axios.post(process.env.REACT_APP_REGISTER, { name, email, password, answer, role: isAdmin });

          if (!res.data.success) toast.error(res.data.message);
          else {
            toast.success('Registration successful');
            setTimeout(() => navigate('/login'), 2000 );
          }

        } catch (error) {
          console.log('Signup failed', { error });
          toast.error('Failed to register');
        }
    }

  return (
    <Layout title='My-Cart Register'>
<div className="form-container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
      <div className="row mb-3">
          <div className="col-sm-10">
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control"  placeholder="Enter name.." />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control"  placeholder="Enter email.." />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control"
              placeholder="Enter password.."
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toLowerCase())} 
              className="form-control"
              placeholder="What's your favorite dish?"
            />
          </div>
        </div>
        <fieldset className="row mb-3" style={{display:"flex", flexDirection:"column"}}>
          <legend className="col-form-label col-sm-2 pt-0 mt-2">Role</legend>
          <div className="col-sm-10" style={{display:"flex", gap:"6px"}}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios1"
                defaultValue="user"
                defaultChecked
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="gridRadios1">
                User
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios2"
                defaultValue="admin"
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="gridRadios2">
                Admin
              </label>
            </div>
          </div>
        </fieldset>
        <div className="register-btn">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default Register;
