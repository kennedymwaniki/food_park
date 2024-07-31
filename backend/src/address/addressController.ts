import { Context } from "hono";
import {
  getAllAddressesService,
  getAddressByIdService,
  createAddressService,
  updateAddressService,
  deleteAddressService,
} from "./addressService";
import { eq, and } from "drizzle-orm";
import { db } from "../drizzle/db";
import { address } from "../drizzle/schema";

export const getAddresses = async (c: Context) => {
  const addresses = await getAllAddressesService();
  return c.json(addresses);
};

export const getAddress = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const Address = await getAddressByIdService(id);
  if (!Address) {
    return c.json({ error: "No such address is available" }, 404);
  }

  return c.json(Address, 200);
};

export const createAddress = async (c: Context) => {
  try {
    const Address = await c.req.json();

    // Check if the address already exists
    const existingAddress = await db.query.address.findFirst({
      where: and(eq(address.user_id, Address.user_id)),
    });

    if (existingAddress) {
      return c.json(
        { error: "Address already exists for this user and type" },
        400
      );
    }

    const createdAddress = await createAddressService(Address);
    return c.json(createdAddress, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateAddress = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Address = await c.req.json();
    const addressExists = await getAddressByIdService(id);
    if (!addressExists) return c.text("Sorry no such address exists", 404);

    const updatedAddress = await updateAddressService(id, Address);
    return c.json({ msg: updatedAddress });
  } catch (error: any) {
    return c.text(error.message, 400);
  }
};

export const deleteAddress = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const addressExists = await getAddressByIdService(id);
    if (!addressExists) return c.text("Address could not be found");

    const res = await deleteAddressService(id);
    return c.json({ msg: res }, 200);
  } catch (error) {
    return c.json("Invalid ID", 400);
  }
};
