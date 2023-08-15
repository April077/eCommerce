import { Button, Card, TextField, Typography } from "@mui/material";
import Logo from "../assets/leo.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import "@fontsource/fredericka-the-great";
import { useState } from "react";

function Login({ open, setOpen, handleClickOpen, handleClose }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Dialog open={open} onClose={handleClose}>
        <Card
          style={{
            width: "400px",
            maxWidth: "500px",
            maxHeight: "500px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <div>
            <img src={Logo} alt="Leo Logo" style={{ width: "50px" }}></img>
          </div>
          <Typography
            style={{ fontFamily: "Fredericka the Great", fontSize: "2.5rem" }}
          >
            Bakers Stop
          </Typography>
          <br />
          <TextField
            onChange={(e) => {
              setUser(e.target.value);
            }}
            style={{ width: "100%" }}
            label="Username"
            variant="outlined"
          />

          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ width: "100%" }}
            label="Password"
            type="password"
            variant="outlined"
          />
          <br />

          <Button
            onClick={async () => {
              const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                body: JSON.stringify({
                  username: user,
                  password: password,
                }),
                headers: { "Content-type": "application/json" },
              });
              const data = await response.json();
              console.log(data);
              localStorage.setItem("token", data.token);
              window.location = "/";
            }}
            style={{
              backgroundColor: "black",
              borderRadius: "20px",
              width: "100%",
            }}
            variant="contained"
          >
            Login
          </Button>
          <DialogActions>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Card>
      </Dialog>
    </div>
  );
}

export default Login;
