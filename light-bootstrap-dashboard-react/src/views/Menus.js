import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Typography,
} from "@material-ui/core";
import { MenuContext } from "../context/MenuContext";
import { blue, blueGrey, green } from "@material-ui/core/colors";

const MenuTable = () => {
  const { menus, loading, error, updateMenuVisibility } = useContext(MenuContext);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleVisibilityToggle = (id, currentVisibility) => {
    const newVisibility = currentVisibility === 1 ? 0 : 1;
    updateMenuVisibility(id, newVisibility); 
  };

  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: 16, width: "90%", margin: "auto" }}
    >
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        Menu Visibility Settings
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
            <TableCell>
              <b>Path</b>
            </TableCell>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell align="center">
              <b>Visibility</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menus.map((menu) => (
            <TableRow key={menu._id}>
              <TableCell>{menu.path}</TableCell>
              <TableCell>{menu.name}</TableCell>
              <TableCell align="center">
                <Switch
                  checked={menu.visibility === 1}
                  onChange={() => handleVisibilityToggle(menu._id, menu.visibility)}
                  color="primary"
                />
                {menu.visibility === 1 ? "Enabled" : "Disabled"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MenuTable;
