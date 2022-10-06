import React, { useState } from "react";

//dependencies
import NavbarAd from "../admin/navbarAd";
import Navbar from "../navbar/navbar";
import { NavLink } from "react-router-dom";

//componentes
import { styled } from "@mui/material/styles";
import {
  Container,
  Box,
  Toolbar,
  Typography,
  List,
  Collapse,
  Drawer,
  AppBar,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Link from "@material-ui/core/Link";
import ListItemButton from "@mui/material/ListItemButton";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import CategoryIcon from "@material-ui/icons/Category";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const Sidebar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openL, setOpenL] = useState(false);

  const handleClick = () => {
    setOpenL(!openL);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <DrawerHeader>
            <IconButton onClick={() => setOpen(false)}>x</IconButton>
          </DrawerHeader>
          <Divider />
          <Box
            display="flex"
            mt={2}
            mr={2}
            justifyContent="space-between"
            fontWeight={500}
          >
            <Typography component={"span"} variant={"body2"}>
              <Box mt={2} fontWeight="fontWeightBold">
                <p className={classes.paper}>Bienvenido</p>
              </Box>
              <Box ml={4} fontWeight="fontWeightLight" fontSize={14}>
                {props.user.name}
              </Box>
              <List className={classes.drawer}>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Categorias" />
                  {openL ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </List>
              <Collapse in={openL} timeout="auto" unmountOnExit>
                {props.categories.map((categoria) => (
                  <List
                    ml={4}
                    component="div"
                    disablePadding
                    key={categoria.id}
                  >
                    <ListItemButton sx={{ pl: 10 }}>
                      <li>{categoria.categoria}</li>
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
              <NavbarAd></NavbarAd>
            </Typography>
          </Box>
        </Drawer>
        <AppBar
          position="relative"
          open={open}
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <DehazeIcon />
            </IconButton>
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
      </Container>
    </React.Fragment>
  );
};

export default Sidebar;
