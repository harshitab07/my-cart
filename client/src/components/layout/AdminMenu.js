import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <h3>Admin Panel</h3>
      <div>
        <ul className="list-group">
          <NavLink to="/admin-dashboard/create-category" className="list-group-item list-group-item-action">
            Create Category
          </NavLink>
          <NavLink to="/admin-dashboard/create-product" className="list-group-item list-group-item">
            Create Product
          </NavLink>
          <NavLink to="/admin-dashboard/products" className="list-group-item list-group-item">
            Products
          </NavLink>
          <NavLink to="/admin-dashboard/users" className="list-group-item list-group-item">
            Users
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
