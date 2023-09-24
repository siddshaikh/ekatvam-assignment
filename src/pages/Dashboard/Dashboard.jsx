import React, { useContext, useState } from "react";
import { myContext } from "../../Context/UserContext";
import { DataGrid } from "@material-ui/data-grid";
import {Container, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import Userdetail from "../../components/userDetails/Userdetail";
import Nav from "../../components/Nav";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
}));
const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "username",
    headerName: "User Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "address",
    headerName: "Address",
    description: "This column has a value getter and is not sortable.",
    width: 160,
    valueGetter: (params) => {
      if (params.row.address) {
        const { street, suite, city, zipcode } = params.row.address;
        return `${street || ""}, ${suite || ""}, ${city || ""}, ${
          zipcode || ""
        }`;
      } else {
        return "No address available";
      }
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    type: Number,
    width: 150,
  },
  {
    field: "website",
    headerName: "Website",
    width: 200,
  },
];

const Dashboard = () => {
  const { userData} = useContext(myContext);
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState()
  const handleUserNameClick = (e) => {
    const userId = e.row.id;
    const user = userData.find((user)=> user.id === userId)
    setSelectedUser(user)
  }
  return (
    <Container>
      <Nav/>
      <div className={classes.mainContainer}>
        <Container style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={userData}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            onRowClick={handleUserNameClick}
          />
        </Container>
        {<Userdetail  />}
      </div>
    </Container>
  );
};

export default Dashboard;
