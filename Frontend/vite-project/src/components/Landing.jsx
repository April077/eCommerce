import { Card } from "@mui/material";
import Image from "../assets/Bakery.png";
import "@fontsource/fredericka-the-great";
import "../App.css";

function Landing() {
  return (
    <div>
      <Card style={{ position: "relative", width: "auto", height: "600px" }}>
        <div style={{ zIndex: "9", display: "flex", justifyContent: "center" }}>
          <h1
            style={{
              fontFamily: "Fredericka the Great, cursive",
              fontSize: "6rem",
              fontWeight: "bold",
              color: "white",
              position: "absolute",
              top: "2em",
              animation: "moveUpDown 2s ease-in-out infinite",
            }}
          >
            Welcome to Bakers Stop .
          </h1>
        </div>
        <div>
          <div>
            <img
              style={{
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              src={Image}
              alt="Cake-Image"
            ></img>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Landing;
