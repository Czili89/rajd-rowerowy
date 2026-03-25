// src/Navbar.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar({ admin, wyloguj, dodajRajd }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Rajd Rowerowy</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex flex-column flex-lg-row gap-2 gap-lg-3 align-items-lg-center">
            {!admin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Logowanie</NavLink>
              </li>
            )}

            {admin && (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-success w-100 w-lg-auto"
                    onClick={dodajRajd}
                  >
                    Nowy rajd
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger w-100 w-lg-auto"
                    onClick={wyloguj}
                  >
                    Wyloguj
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;