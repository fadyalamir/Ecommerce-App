import React, { useState, useContext } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="bg-nav fixed top-0 left-0 right-0 z-50 text-center shadow-md lg:py-2">
      <div className="container mx-auto py-2 flex justify-between items-center px-4">
        {/* Left - Logo and Menu */}
        <div className="flex items-center">
          <NavLink to="/">
            <img src={logo} width={175} alt="Fresh Cart Logo" />
          </NavLink>
          <ul className="hidden lg:flex ml-5 space-x-4">
            {userLogin && (
              <>
                <li><NavLink className="text-lg text-slate-900 font-extralight" to="/">Home</NavLink></li>
                <li><NavLink className="text-lg text-slate-900 font-extralight" to="/cart">Cart</NavLink></li>
                <li><NavLink className="text-lg text-slate-900 font-extralight" to="/products">Products</NavLink></li>
              </>
            )}
          </ul>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          {userLogin ? (
            <>
              <span onClick={logOut} className="text-lg text-slate-900 font-extralight cursor-pointer">Logout</span>
              <NavLink className="relative" to="/cart">
                <FaShoppingCart className="text-2xl text-black" />
                {cartItems > 0 && (
                  <span className="bg-main text-white text-sm font-medium absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-lg px-2 py-0.5">{cartItems}</span>
                )}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="text-lg text-slate-900 font-extralight" to="/login">Login</NavLink>
              <NavLink className="text-lg text-slate-900 font-extralight" to="/register">Register</NavLink>
            </>
          )}
          <div className="hidden lg:flex space-x-3">
            <Link><i className="fab fa-facebook fa-lg"></i></Link>
            <Link><i className="fab fa-twitter fa-lg"></i></Link>
            <Link><i className="fab fa-instagram fa-lg"></i></Link>
            <Link><i className="fab fa-youtube fa-lg"></i></Link>
            <Link><i className="fab fa-tiktok fa-lg"></i></Link>
          </div>
          {/* Hamburger Menu Button */}
          <button className="lg:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu className="text-2xl text-black" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white py-2 shadow-md">
          <ul className="flex flex-col space-y-2">
            {userLogin && (
              <>
                <li  onClick={() => setMenuOpen(!menuOpen)}><NavLink className="text-lg text-slate-900" to="/">Home</NavLink></li>
                <li  onClick={() => setMenuOpen(!menuOpen)}><NavLink className="text-lg text-slate-900" to="/cart">Cart</NavLink></li>
                <li  onClick={() => setMenuOpen(!menuOpen)}><NavLink className="text-lg text-slate-900" to="/products">Products</NavLink></li>
              </>
            )}
            {!userLogin && (
              <>
                <li  onClick={() => setMenuOpen(!menuOpen)}><NavLink className="text-lg text-slate-900" to="/login">Login</NavLink></li>
                <li  onClick={() => setMenuOpen(!menuOpen)}><NavLink className="text-lg text-slate-900" to="/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
