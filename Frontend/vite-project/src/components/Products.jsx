import { Button, Card, TextField, Typography } from "@mui/material";
import Logo from "../assets/leo.png";
import "@fontsource/fredericka-the-great";
import { useState } from "react";

function AddProducts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgLink, setImgLink] = useState("");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {" "}
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
            setTitle(e.target.value);
          }}
          style={{ width: "100%" }}
          label="Title"
          variant="outlined"
        />

        <br />
        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          style={{ width: "100%" }}
          label="Description"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          style={{ width: "100%" }}
          label="Price"
          variant="outlined"
        />

        <br />
        <TextField
          onChange={(e) => {
            setImgLink(e.target.value);
          }}
          style={{ width: "100%" }}
          label="ImageLink"
          variant="outlined"
        />
        <br />

        <Button
          onClick={async () => {
            const response = await fetch("http://localhost:3000/products", {
              method: "POST",
              body: JSON.stringify({
                title,
                description,
                price,
                imgLink,
              }),
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
            const data = await response.json();
            console.log(data);
          }}
          style={{
            backgroundColor: "black",
            borderRadius: "20px",
            width: "100%",
          }}
          variant="contained"
        >
          Add Product
        </Button>
      </Card>
    </div>
  );
}

export default AddProducts;
