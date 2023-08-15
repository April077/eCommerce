import { Card, Grid, Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import "@fontsource/oswald";

function ShowProducts({ products, setProducts }) {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/products", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: "3em",
        marginRight: "3rem",
        marginTop: "2em",
      }}
    >
      <Grid container spacing={2} style={{ margin: 0 }}>
        {products.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </Grid>
    </Box>
  );

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
              src={props.product.imgLink}
              alt="img"
            ></img>
          </div>
          <div style={{ padding: "1em" }}>
            <Typography style={{ fontFamily: "Oswald" }} variant="h5">
              {props.product.title}
            </Typography>
            <Typography
              style={{ fontFamily: "Oswald", fontWeight: "100" }}
              variant="subtile1"
            >
              {props.product.description}
            </Typography>
            <Typography> ${props.product.price}</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              {" "}
              <Button
                style={{
                  backgroundColor: "black",
                  borderRadius: "20px",
                  width: "100%",
                }}
                variant="contained"
                onClick={async () => {
                  const response = await fetch(
                    "http://localhost:3000/auth/cart",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        productId: props.product._id,
                      }),
                      headers: {
                        "Content-type": "application/json",
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  const data = await response.json();
                  console.log(data);
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      </Grid>
    );
  }
}

export default ShowProducts;
