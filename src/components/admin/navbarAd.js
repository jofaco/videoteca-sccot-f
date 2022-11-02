//components
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(3, 1),
    color: "black",
  },
}));
const NavbarAd = () => {
  const classes = useStyles();
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  if (user.is_superuser) {
    return (
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
            to="/"
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
    );
  } 
  else{
    return (
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
            to="/"
          >
            Casos
          </Button>          
      </>
    );
  }
};

export default NavbarAd;
