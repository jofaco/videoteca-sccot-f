import React, { useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import { NavLink } from "react-router-dom";

//dependencies
import Sidebar from "./navbar/sidebarUser";
import { ListCategorias } from "../services/category";
//componentes
import {  Toolbar, Typography, AppBar,Box } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Header = () => {
  const classes = useStyles();
  //let history = useNavigate();
  const [open] = useState(false);
  const [categories, setCategories] = useState("");

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  const listCategorias = async () => {
    try {
      const res = await ListCategorias();
      setCategories(res);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    listCategorias();
  }, []);

  if (user && categories) {
    return <Sidebar user={user} categories={categories} />;
  } else {
    return (
      <React.Fragment>
        <Box>
          <AppBar
            position="relative"
            open={open}
            color="default"
            elevation={0}
            className={classes.appBar}
          >
            <Toolbar className={classes.toolbar}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.toolbarTitle}
              >
                <Link
                  component={NavLink}
                  to="/"
                  underline="none"
                  color="textPrimary"
                >
                  Videoteca
                </Link>
              </Typography>
              <Navbar></Navbar>
            </Toolbar>
          </AppBar>
        </Box>
      </React.Fragment>
    );
  }
};

export default Header;
