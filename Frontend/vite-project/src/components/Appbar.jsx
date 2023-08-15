import { Toolbar, AppBar, InputBase, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import {} from "../App.css";
import Logo from "../assets/leo.png";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
import "@fontsource/montserrat";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Appbar() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleClickOpen2() {
    setLoginOpen(true);
  }
  function handleClose2() {
    setLoginOpen(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data.username);
      setName(data.username);
    };
    fetchData();
  }, []);

  if (!name) {
    return (
      <>
        <AppBar position="sticky" style={{ background: "black" }}>
          <Toolbar
            style={{
              height: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <img src={Logo} alt="Leo Logo" style={{ width: "45px" }}></img>
              </div>
              <div>
                <Tabs
                  value={value}
                  onChange={(e, newValue) => {
                    setValue(newValue);
                  }}
                  style={{ marginLeft: "1em" }}
                >
                  <Tab style={{ color: "white" }} label="Products">
                    {" "}
                  </Tab>
                  <Tab style={{ color: "white" }} label="contact us">
                    {" "}
                  </Tab>
                </Tabs>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "1em" }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search..."
                    inputProps={{ "aria-label": "Search" }}
                  />
                </Search>
              </div>
              <div>
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  disableElevation
                  style={{ backgroundColor: "#e1763b", borderRadius: "20px" }}
                >
                  <Typography
                    style={{
                      fontFamily: "Montserrat,cursive",
                      textTransform: "none",
                      fontWeight: "thin",
                    }}
                  >
                    SignUp
                  </Typography>
                </Button>

                <Button onClick={handleClickOpen2} variant="Outlined">
                  Login
                </Button>
              </div>
              <div>
                <SignUp
                  open={open}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                />
              </div>
              <div>
                <Login
                  open={loginOpen}
                  handleClickOpen={handleClickOpen2}
                  handleClose={handleClose2}
                />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </>
    );
  }

  return (
    <>
      <AppBar position="sticky" style={{ background: "black" }}>
        <Toolbar
          style={{
            height: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={Logo} alt="Leo Logo" style={{ width: "45px" }}></img>
            </div>
            <div>
              <Tabs
                value={value}
                onChange={(e, newValue) => {
                  setValue(newValue);
                }}
                style={{ marginLeft: "1em" }}
              >
                <Tab
                  style={{ color: "white" }}
                  onClick={() => {
                    navigate("/");
                  }}
                  label="Products"
                >
                  {" "}
                </Tab>
                <Tab
                  style={{ color: "white" }}
                  onClick={() => {
                    navigate("/Products");
                  }}
                  label="Products"
                >
                  {" "}
                </Tab>
                <Tab
                  onClick={() => {
                    navigate("/Cart");
                  }}
                  style={{ color: "white" }}
                  label="cart"
                >
                  {" "}
                </Tab>
                <Tab style={{ color: "white" }} label="contact us">
                  {" "}
                </Tab>
              </Tabs>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "1em" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "Search" }}
                />
              </Search>
            </div>
            <div>
              <Button
                style={{ color: "white", backgroundColor: "#e1763b" }}
                variant="contained"
                onClick={() => {
                  localStorage.setItem("token", null);
                  window.location = "/";
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Appbar;
