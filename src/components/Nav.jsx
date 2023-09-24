import {
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { myContext } from "../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "3rem",
    position: "fixed",
    border:"1px solid gray",
    boxShadow:"0 1px 3px 2px gray",
    borderRadius:"4px",
    padding:"5px 0"
  },
  tabs: {
    cursor: "pointer",
    position: "relative",
    fontSize: "20px",
  },
  links: {
    textDecoration: "none",
    color: "gray",
    fontWeight: "bold",
  },
  dark: {
    color: "black",
  },
  btn: {
    color: "#fff",
    backgroundColor: "red",
    margin: "2px",
    transition: "border 0.5s ease",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
}));

const Nav = () => {
  const { setFormData } = useContext(myContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("formData");
    setFormData(false);
    navigate("/signup");
  };
  return (
    <div>
      {/* nav bar */}
      <Container className={classes.main}>
        <Link to={"/dashboard"} className={classes.links}>
          <Typography
            className={
              location.pathname === "/dashboard" ? classes.tabs : classes.dark
            }
          >
            User Dashboard
          </Typography>
        </Link>
        <Link to={"/createuser"} className={classes.links}>
          <Typography className={classes.tabs}>Create User</Typography>
        </Link>
        <Button className={classes.btn} onClick={handleLogout}>
          Log Out
        </Button>
      </Container>
    </div>
  );
};

export default Nav;
