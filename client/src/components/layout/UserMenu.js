import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <h3>Dashboard</h3>
      <div>
        <ul className="list-group">
          <NavLink to="/dashboard/profile" className="list-group-item list-group-item-action">
            My Profile
          </NavLink>
          <NavLink to="/dashboard/orders" className="list-group-item list-group-item">
            My Orders
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
