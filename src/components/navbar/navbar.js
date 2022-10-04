//components
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {  makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
	link: {
		margin: theme.spacing(1, 1.5),
	},
}));

const Navbar = () => {
  const classes = useStyles();
  const data = localStorage.getItem('user');
  const user = JSON.parse(data);

  if (!user) {
    return (
            <li className="nav-item">
              <Button
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
                component={NavLink}
                to="/login"
              >
                Login
              </Button>
            </li>
      );
    }
    else {
      return (
        <li className="nav-item">
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
              component={NavLink}
              to="/logout"
            >
              Logout
            </Button>
      </li>
      );
    };
};

export default Navbar;
