import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function Notification() {
  const classes = useStyles();

  return function ntf({ message, ...props }) {
    if (!message) return <p></p>;
    return (
      <p className={classes.link} style={{ fontSize: "25px", color: "red" }}>
        {message}
      </p>
    );
  };
}

export default Notification;
