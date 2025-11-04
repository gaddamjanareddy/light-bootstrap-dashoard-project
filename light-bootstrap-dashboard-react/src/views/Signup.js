import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "350px",
    boxShadow: theme.shadows[4],
    borderRadius: 10,
  },
  content: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  errorText: {
    color: "red",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
    fontSize: "0.9rem",
    color: "#666",
  },
  loginLink: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontWeight: 500,
  },
}));

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { username, email, password } = formData;
      await axios.post("http://localhost:5000/auth/signup", {
        username,
        email,
        password,
      });

      history.push("/");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5" className={classes.title}>
            Signup
          </Typography>

          {error && <Typography className={classes.errorText}>{error}</Typography>}

          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
          </Button>

          <Typography className={classes.footerText}>
            Already have an account?{" "}
            <span
              onClick={() => history.push("/")}
              className={classes.loginLink}
            >
              Login
            </span>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
