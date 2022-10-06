//components
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, Box } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
      <ListItem button>
        <Box color="inherit">
          <AddCircleOutlineIcon />
          <Link
            sx={{ pl: 2 }}
            color="textPrimary"
            href="#"
            className={classes.link}
            component={NavLink}
            to="/VideoForm"
          >
            Agregar video
          </Link>
        </Box>
      </ListItem>
    );
  } else {
    return <p> </p>;
  }
};

export default NavbarAd;
