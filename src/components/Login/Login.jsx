import React, {useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

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
  error: {
    color: "red",
  },
}));

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const validateData = localStorage.getItem("formData");
    const formData = JSON.parse(validateData);

    if (!validateData) {
      setError("You must be sign up first");
    } else if (
      formData.email !== values.email ||
      formData.password !== values.password
    ) {
      setError("Email and password does not match");
    } else {
      navigate("/dashboard");
    }
  };

  console.log(error);
  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h5">Sign In</Typography>
          <Typography variant="h6" className={classes.error}>
            {error && error + "*"}
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
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
                >
                  Log In
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2">
                Create an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Login;
