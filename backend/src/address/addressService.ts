import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { address, TIAddress, TSAddress } from "../drizzle/schema";

export const getAllAddressesService = async (): Promise<TSAddress[] | null> => {
  const addresses = await db.query.address.findMany();
  return addresses;
};

export const getAddressByIdService = async (id: number) => {
  const addressItem = await db.query.address.findFirst({
    where: eq(address.id, id),
  });
  return addressItem;
};

export const createAddressService = async (Address: TIAddress) => {
  const newAddress = await db.insert(address).values(Address);
  return newAddress;
};

export const updateAddressService = async (id: number, Address: TIAddress) => {
  const updatedAddress = await db
    .update(address)
    .set(Address)
    .where(eq(address.id, id));
  return updatedAddress;
};

export const deleteAddressService = async (id: number) => {
  await db.delete(address).where(eq(address.id, id));
  return "Address successfully deleted";
};