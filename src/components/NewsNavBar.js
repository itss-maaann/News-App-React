import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">NewsMonkey</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/" className={({ isActive, isPending }) => `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/general" className={({ isActive, isPending }) => `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`}>General</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/business" className={({ isActive, isPending }) => `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`}>Business</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/entertainment" className={({ isActive, isPending }) => `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`}>Entertainment</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/health" className={({ isActive, isPending }) => `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`}>Health</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/science" className={({ isActive, isPending }) => `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`}>Science</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/sports" className={({ isActive, isPending }) => `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`}>Sports</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/technology" className={({ isActive, isPending }) => `nav-link ${isPending ? "pending" : isActive ? "active" : ""}`}>Technology</NavLink>
                                </li>
                            </ul>
                            {/* <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-warning" type="submit">Search</button>
                            </form> */}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
