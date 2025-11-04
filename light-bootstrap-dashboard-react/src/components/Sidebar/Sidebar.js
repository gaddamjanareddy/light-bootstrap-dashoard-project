/*!
=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim
* Licensed under MIT
=========================================================
*/

import React, { useContext } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { MenuContext } from "../../context/MenuContext"; 

function Sidebar({ color, image }) {
  const location = useLocation();
  const { menus, loading } = useContext(MenuContext); // 👈 access live menus
  const activeRoute = (routeName) =>
    location.pathname.indexOf(routeName) > -1 ? "active" : "";

  if (loading) {
    return (
      <div className="sidebar">
        <div className="sidebar-wrapper">
          <p style={{ color: "#fff", textAlign: "center", marginTop: "20px" }}>
            Loading menu...
          </p>
        </div>
      </div>
    );
  }

  const visibleMenus = menus.filter((menu) => menu.visibility === 1); // 👈 only enabled

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-center">
          {/* <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={require("assets/img/reactlogo.png")} alt="..." />
            </div>
          </a> */}
          <a className="simple-text" style={{textAlign:"center", fontWeight:"bold", fontSize:"36px"}}>
           TITLE
          </a>
        </div>

        <Nav>
          {visibleMenus.map((item, index) => (
            <li
              className={
                item.upgrade
                  ? "active active-pro"
                  : activeRoute(item.layout + item.path)
              }
              key={index}
            >
              <NavLink
                to={item.layout + item.path}
                className="nav-link"
                activeClassName="active"
              >
                <i className={item.icon} />
                <p>{item.name}</p>
              </NavLink>
            </li>
          ))}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
