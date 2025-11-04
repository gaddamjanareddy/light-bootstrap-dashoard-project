import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch menus
  const fetchMenus = async () => {
    try {
      const res = await axios.get("http://localhost:5000/menus", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenus(res.data || []);
    } catch (err) {
      console.error("Error fetching menus:", err);
    }
  };

  const updateMenuVisibility = async (id, visibility) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/menus/${id}`,
        { visibility },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMenus((prevMenus) =>
        prevMenus.map((menu) =>
          menu._id === id ? { ...menu, visibility } : menu
        )
      );
      console.log("Menu updated:", res.data);
    } catch (err) {
      console.error("Error updating menu visibility:", err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <MenuContext.Provider
      value={{ menus, fetchMenus, updateMenuVisibility }}
    >
      {children}
    </MenuContext.Provider>
  );
};
