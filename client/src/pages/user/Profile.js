import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ address, setAddress ] = useState('');
  const [auth, setAuth] = useAuth();
  const [ id, setId ] = useState('');

  useEffect(() => {
    const {name, email, phone, address, id} = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    setId(id);
  }, [auth.user]);
console.log({name, email, phone, address, id})
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(process.env.REACT_APP_PROFILE, { email, address, phone, id });

      if (!data.success) toast.error(data.message);
      else {
        setAuth({...auth, user: data?.data});
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data?.data;
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('User details updated successful');
      }

    } catch (error) {
      console.log('Update user details failed', { error });
      toast.error('Unable to update details at the moment!');
    }
}

  return (
    <Layout title='My-Cart : Profile'>
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
            <div className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="row mb-3">
          <div className="col-sm-10">
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control"  placeholder="Enter name.." disabled />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control"  placeholder="Enter email.." disabled />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <textarea
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value.toLowerCase())} 
              className="form-control"
              placeholder="Enter your current address"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value.toLowerCase())} 
              className="form-control"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className="register-btn">
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        </div>
      </form>
    </div>
            </div>
          </div>
        </div>
    </div>
    </Layout>
  )
}

export default Profile;