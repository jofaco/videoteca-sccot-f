//components
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {  useContext } from "react";

//dependencias
import useUser from '../../hooks/useUser'
import Context from "../context/UserContext";


const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(3, 1),
    color: "black",
  },
}));
/**
 * Componente con botones para el nabvar
 * @returns Botones para el nabvar dependiendo si es admin o no
 */
const NavbarAd = () => {
  const { isLogged } = useUser()
  const { user } = useContext(Context)
  const classes = useStyles();
  return (
    <>
      {isLogged && user.is_superuser  &&
      <>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/"
        >
          Home
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Videos"
        >
          Videos
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Series"
        >
          Series
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Casos"
        >
          Casos
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/VideoForm"
        >
          Agregar video
        </Button>
      </>
      }
      {isLogged && !user.is_superuser  &&
        <>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/"
        >
          Home
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Videos"
        >
          Videos
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Series"
        >
          Series
        </Button>
        <Button
          sx={{ color: '#fff' }} 
          className={classes.link}
          component={NavLink}
          to="/Casos"
        >
          Casos
        </Button>
        </>
      } 
    </>
  )
}  

export default NavbarAd;
