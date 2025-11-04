import React, { useState, useRef } from "react";
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
import NotificationAlert from "react-notification-alert";

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
  signupLink: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontWeight: 500,
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const notificationAlertRef = useRef(null);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const notify = (type, message) => {
    const options = {
      place: "tr", 
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 3,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await axios.post("http://localhost:5000/auth/login", formData);
    console.log("Getting:", res.data);

    if (!res.data.token) {
      setError("No token received");
      setLoading(false);
      notify("danger", "No token received from server");
      return;
    }

    localStorage.setItem("token", res.data.token);

    notify("success", "Login Successful  Redirecting...");

    
    const lastVisited = localStorage.getItem("lastVisitedPath");

    if (lastVisited) {
      setTimeout(() => {
        history.push(lastVisited);
      }, 800);
      return;
    }

    
    const menuRes = await axios.get("http://localhost:5000/menus", {
      headers: { Authorization: `Bearer ${res.data.token}` },
    });

    const menus = menuRes.data || [];
    const firstVisible = menus.find((m) => m.visibility === 1);

    if (firstVisible) {
      const redirectPath = `${firstVisible.layout}${firstVisible.path}`;
      setTimeout(() => {
        history.push(redirectPath);
      }, 800);
    } else {
      setTimeout(() => {
        history.push("/admin/dashboard");
      }, 800);
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
    const errMsg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Login failed. Please check your credentials.";
    setError(errMsg);
    notify("danger", errMsg);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>

      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography variant="h5" className={classes.title}>
              Login
            </Typography>

            {error && <Typography className={classes.errorText}>{error}</Typography>}

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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>

            <Typography className={classes.footerText}>
              Don’t have an account?{" "}
              <span
                onClick={() => history.push("/signup")}
                className={classes.signupLink}
              >
                Signup
              </span>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;