import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/Nav";
import axios from "axios";
import { myContext } from "../../Context/UserContext";
import {
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  navContainer: {
    width: "100vw",
    marginLeft: "5rem",
    position: "relative",
    transition: "position 0.3s ease",
    top:0
  },

  container: {
    marginTop: theme.spacing(12),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));

const CreateUser = () => {
  const classes = useStyles();
  const { postedData, setPostedData } = useContext(myContext);
  const [scroll, setScroll] = useState(false);

  const fetchData = async () => {
    try {
      if (postedData) {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "POST",
            body: JSON.stringify({
              id: postedData ? postedData.id : null,
              name: postedData ? postedData.name : null,
              username: postedData ? postedData.username : null,
              email: postedData ? postedData.email : null,
              phone: postedData ? postedData.phone : null,
              website: postedData ? postedData.website : null,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        response && setPostedData(response.data);
      }
    } catch (error) {
      console.log({ err: error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (postedData) {
      Swal.fire("Thank You!", "Data posted successfully.", "success");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostedData({ ...postedData, [name]: value });
  };

  const defaultUser = {
    id: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  };

  const user = postedData || defaultUser;

  return (
    <div className={classes.main}>
      <div
        className={classes.navContainer}
        style={{ display: scroll ? "none" : "" }}
      >
        <Nav />
      </div>
      <div onScroll={() => setScroll(true)}>
        <Container maxWidth="xs" className={classes.container}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            className={classes.title}
          >
            User Form
          </Typography>
          <form className={classes.form}>
            <TextField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Website"
              name="website"
              value={user.website}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </form>
          <div className={classes.tableContainer}>
            <Typography variant="h5" gutterBottom>
              User Data
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="user data table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Website</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.website}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CreateUser;
