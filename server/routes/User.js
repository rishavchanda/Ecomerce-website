import express from "express";
import {
  UserLogin,
  UserRegister,
  addToCart,
  addToFavorites,
  getAllCartItems,
  getAllOrders,
  getUserFavourites,
  placeOrder,
  removeFromCart,
  removeFromFavorites,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

//cart
router.get("/cart", verifyToken, getAllCartItems);
router.post("/cart", verifyToken, addToCart);
router.patch("/cart", verifyToken, removeFromCart);

//order
router.get("/order", verifyToken, getAllOrders);
router.post("/order", verifyToken, placeOrder);

//favourites
router.get("/favorite", verifyToken, getUserFavourites);
router.post("/favorite", verifyToken, addToFavorites);
router.patch("/favorite", verifyToken, removeFromFavorites);

export default router;
