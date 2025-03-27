import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            PDF QA App
          </Link>
          <nav className="header-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/upload" className="nav-link">
              Upload Document
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
