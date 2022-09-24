import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
// import FileDownload from "js-file-download";
import * as XLSX from "xlsx";
import { useEffect } from "react";

const Logo = styled.div`
  color: white;
  a {
    color: white;
    text-decoration: none;

    &:visited {
      text-decoration: none;
    }
  }
`;

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/userDetails/download");
      localStorage.setItem("subscriberDetails", JSON.stringify(res.data));
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(res.data);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "SubscriberData.xlsx");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // useEffect(() => {
  //   console.log(user);
  // }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Logo>
              <Link to="/">BookMyRoom</Link>
            </Logo>
          </Typography>
          {user?.isAdmin && (
            <Button color="inherit" onClick={handleDownload} type="submit">
              Download Subscribers
            </Button>
          )}
          {user ? (
            <>
              {" "}
              <Button color="inherit">{user.details.userName}</Button>{" "}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/register"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
