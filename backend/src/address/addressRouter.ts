import { Hono } from "hono";
import {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} from "./addressController";

export const addressRouter = new Hono();

addressRouter.get("/address", getAddresses);
addressRouter.get("/address/:id", getAddress);
addressRouter.post("/address", createAddress);
addressRouter.put("/address/:id", updateAddress);
addressRouter.delete("/address/:id", deleteAddress);