import React from 'react'
import Layout from '../../components/layout/layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth';

const Dashboard = () => {
  const [ auth ] = useAuth();
  return (
    <Layout>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
        </div>
        <div className='col-md-9'>
          <div className='card w-75 p-3'>
            <h5>Name: {auth?.user?.name}</h5>
            <h5>Email: {auth?.user?.email}</h5>
            {auth?.user?.address && <h5>Address: {auth?.user?.address}</h5>}
            {auth?.user?.phone && <h5>Phone Number: {auth?.user?.phone}</h5>}
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Dashboard
