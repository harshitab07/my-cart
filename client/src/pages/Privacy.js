import React from 'react'
import Layout from '../components/layout/layout'

const Privacy = () => {
  return (
    <Layout title='Privacy Policies : My-Cart' description='Privacy policies at My-Cart'>
      <div className="row contactUs privacy">
        <div className="col-md-6 ">
          <img
            src="/images/contactUs.jpeg"
            alt="contactUs"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;