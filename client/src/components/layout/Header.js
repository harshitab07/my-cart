import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../Forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from 'antd';

const Header = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });

    localStorage.removeItem('auth');
  };

  useEffect(() => {
    let existingCartItems = localStorage.getItem('cart');
    if (existingCartItems) setCart(JSON.parse(existingCartItems));
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary header">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            🛒 My-Cart
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown" >
              <div style={{maxHeight:"200px", overflowY:"auto"}}>
                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </div>
                <ul className="dropdown-menu">
                  {categories?.map((c) => (
                  <li className="nav-item">
                    <NavLink to={`/category/${c?._id}`} className="nav-link">
                      {c?.name}
                    </NavLink>
                  </li>
                  ))}
                </ul>
              </div>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li class="nav-item dropdown">
              <div>
                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {auth.user.name}
                </div>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to={auth.user.role ? '/admin-dashboard' : '/dashboard'}>Dashboard</NavLink></li>
                  <li><NavLink className="dropdown-item" to='/login' onClick={handleLogout} >Logout</NavLink></li>
                </ul>
                </div>
            </li>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
              <Badge count={cart?.length}>
              <span style={{paddingRight:"10px", fontWeight:"500"}}>Cart</span>
              </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
  );
};

export default Header;
