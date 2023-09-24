import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, Paper, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Center vertically in viewport
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const handleSubmit = (values) => {
    localStorage.setItem("formData", JSON.stringify(values));
    Swal.fire("Welcome", "Signup Successfuly.", "success");
    navigate("/login")
  };
  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h5">Sign Up</Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      type="text"
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      required
                      fullWidth
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      type="text"
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      required
                      fullWidth
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      type="email"
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      required
                      fullWidth
                      as={TextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      type="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      required
                      fullWidth
                      as={TextField}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Signup;
