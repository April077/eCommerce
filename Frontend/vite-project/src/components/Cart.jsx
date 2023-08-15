import { useEffect, useState } from "react";
import { Card, Grid, Typography } from "@mui/material";

function Cart({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/auth/cart", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);
      console.log(products);
      const filterd = products.filter((product) => {
        return data.includes(product._id);
      });
      setFilteredProducts(filterd);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Grid container>
        {filteredProducts.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </Grid>
    </div>
  );
}
function Product(props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={{ padding: "1rem" }}>
      <Card
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "500px",
          maxHeight: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <img
            style={{ width: "100%", height: "200px" }}
            src={props.item.imgLink}
            alt="img"
          ></img>
        </div>
        <div style={{ padding: "1em" }}>
          <Typography style={{ fontFamily: "Oswald" }} variant="h5">
            {props.item.title}
          </Typography>
          <Typography
            style={{ fontFamily: "Oswald", fontWeight: "100" }}
            variant="subtile1"
          >
            {props.item.description}
          </Typography>
          <Typography> ${props.item.price}</Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            {" "}
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default Cart;
