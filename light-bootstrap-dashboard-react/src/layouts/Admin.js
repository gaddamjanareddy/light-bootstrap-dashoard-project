/*!
=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================
*/

import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
import { MenuContext } from "../context/MenuContext";


import Dashboard from "views/Dashboard";
import UserProfile from "views/UserProfile";
import TableList from "views/TableList";
import Typography from "views/Typography";
import Icons from "views/Icons";
import Maps from "views/Maps";
import Notifications from "views/Notifications";
import Upgrade from "views/Upgrade";
import Home from "views/Home";
import Forms from "views/Forms";
import Menus from "views/Menus";

function Admin() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const location = useLocation();
  const mainPanel = useRef(null);

  const { menus, fetchMenus } = useContext(MenuContext);

  
  const componentsMap = {
    Dashboard,
    UserProfile,
    TableList,
    Typography,
    Icons,
    Maps,
    Notifications,
    Upgrade,
    Home,
    Forms,
    Menus,
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanel.current) mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      const element = document.getElementById("bodyClick");
      if (element) element.parentNode.removeChild(element);
    }

    localStorage.setItem("lastVisitedPath", location.pathname);
    
  }, [location]);

  
  const getRoutes = (menus) => {
    return menus
      .filter((menu) => menu.visibility === 1) 
      .map((prop, key) => {
        const Component = componentsMap[prop.component];
        if (prop.layout === "/admin" && Component) {
          return (
            <Route
              exact
              path={prop.layout + prop.path}
              render={(props) => <Component {...props} />}
              key={key}
            />
          );
        }
        return null;
      });
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar
          color={color}
          image={hasImage ? image : ""}
          menus={menus}
        />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(menus)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );
}

export default Admin;
