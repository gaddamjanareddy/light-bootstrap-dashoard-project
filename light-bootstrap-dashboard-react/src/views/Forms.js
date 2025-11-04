import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    bio: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: "bold", marginBottom: "40px" }}
      >
        EDIT PROFILE
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6} lg={5}>
          <Card style={{ borderRadius: "10px", boxShadow: "0px 2px 10px #ddd" }}>
            <CardContent>
              <form onSubmit={handleUpdate}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Username"
                      name="username"
                      value={profile.username}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                      }}
                      fullWidth
                    >
                      Update Profile
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          lg={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
            alt="City"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "20px",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
            }}
          />
          <Avatar
            alt="Profile"
            src="https://randomuser.me/api/portraits/men/45.jpg"
            style={{ width: 100, height: 100 }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfile;
