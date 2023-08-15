import { Button, Card, TextField, Typography } from "@mui/material";
import Logo from "../assets/leo.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import "@fontsource/fredericka-the-great";
import { useState } from "react";

function SignUp({ open, setOpen, handleClickOpen, handleClose }) {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
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
              setEmail(e.target.value);
            }}
            style={{ width: "100%" }}
            label="Email"
            type="email"
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
              const response = await fetch(
                "http://localhost:3000/auth/register",
                {
                  method: "POST",
                  body: JSON.stringify({
                    username: user,
                    email: email,
                    password: password,
                  }),
                  headers: { "Content-type": "application/json" },
                }
              );
              const data = await response.json();
              if (data) {
                alert("SignUp Successfull");
              }
            }}
            style={{
              backgroundColor: "#e1763b",
              borderRadius: "20px",
              width: "100%",
            }}
            variant="contained"
          >
            SignUp
          </Button>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Card>
      </Dialog>
    </div>
  );
}

export default SignUp;
