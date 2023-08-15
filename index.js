const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const SECRET = "Secr3t";

//Admin Middleware

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json(err);
    }
    req.user = decoded;
    next();
  });
};

// Mongoose schema

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  purchasedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imgLink: String,
});

//creating models

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

//connecting to mongoose
mongoose
  .connect(
    "mongodb+srv://tanmayTech:T%40nm%40yMERN@cluster0.c34zkoh.mongodb.net/eCommerce",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const UserValidation = z.object({
  username: z.string().min(3),
  email: z.string().email().optional(),
  password: z.string().min(6),
});

//common
async function signUpUser(username, email, password, isAdmin = false) {
  const user = await User.findOne({ username });
  if (user) {
    throw new Error({ message: "user already exist" });
  } else {
    const newUser = new User({
      username,
      email,
      password,
      isAdmin,
      purchasedProducts: [],
    });
    await newUser.save();
  }
}

//auth

app.get("/profile", jwtMiddleware, (req, res) => {
  res.status(201).json({ username: req.user.username });
});

app.post("/auth/register", async (req, res) => {
  try {
    const validateData = UserValidation.safeParse(req.body);

    if (!validateData.success) {
      return res.status(411).json({ error: validateData.error });
    }
    const { username, email, password } = req.body;
    await signUpUser(username, email, password);
    res.json({ message: " User added successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Invalid user data" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const validLogin = UserValidation.safeParse(req.body);
    if (!validLogin.success) {
      return res.status(411).json({ error: validLogin.error });
    }
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    if (user.password === password) {
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        SECRET,
        { expiresIn: "1h" }
      );
      res.status(201).json({ message: "Login successfull", token });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid user data" });
  }
});

app.post("/auth/cart", jwtMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(401).json({ message: "no valid user" });
    }
    console.log(req.body.productId);
    user.purchasedProducts.push(req.body.productId);

    await user.save();
    res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    return res.status(500).json({ message: "cannot add to cart" });
  }
});

app.get("/auth/cart", jwtMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(401).json({ message: "no valid user" });
    }

    if (user._id === 0) {
      return res.json({ message: "empty cart" });
    }
    const cart = user.purchasedProducts;
    res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ message: "cannot add to cart" });
  }
});
// Admin routes

app.post("/admin/register", async (req, res) => {
  try {
    const validateData = UserValidation.safeParse(req.body);
    if (!validateData.success) {
      return res.status(411).json({ error: validateData.error });
    }
    const { username, email, password } = req.body;
    await signUpUser(username, email, password, true);
    res.json({ message: " Admin added successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Invalid user data" });
  }
});

//Products

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0)
      req.status(404).json({ message: "no products found" });

    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching products from the database.", err });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { title, description, price, imgLink } = req.body;
    const newProduct = new Product({ title, description, price, imgLink });
    await newProduct.save();
    res.status(201).json({ message: "product added successfully" });
  } catch (err) {
    res.status(500).json({ message: "error adding product", err });
  }
});

app.put("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  const { title, description, price, imgLink } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      title,
      description,
      price,
      imgLink,
    });
    if (!updatedProduct) {
      res.status(404).json({ message: "product not found" });
    }
    res.status(201).json({ message: "product updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "could not update product" });
  }
});

app.delete("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "product deleted succesfully" });
  } catch (err) {
    res.status(500).json({ message: "cannot delete product", err });
  }
});
