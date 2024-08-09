import { Context } from "hono";
import {
  getAllVouchersService,
  getVoucherByIdService,
  createVoucherService,
  updateVoucherService,
  deleteVoucherService,
  getVoucherByCodeService,
} from "./voucherService";
import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { vouchers } from "../drizzle/schema";

export const getVouchers = async (c: Context) => {
  const voucherItems = await getAllVouchersService();
  return c.json(voucherItems);
};

export const getVoucher = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const voucherItem = await getVoucherByIdService(id);
  if (!voucherItem) {
    return c.json({ error: "No such voucher is available" }, 404);
  }

  return c.json(voucherItem, 200);
};

export const createVoucher = async (c: Context) => {
  try {
    const voucherItem = await c.req.json();

    // Check if the voucher already exists
    const existingVoucher = await db.query.vouchers.findFirst({
      where: eq(vouchers.code, voucherItem.code),
    });

    if (existingVoucher) {
      return c.json({ error: "Voucher with this code already exists" }, 400);
    }

    const createdVoucher = await createVoucherService(voucherItem);
    return c.json(createdVoucher, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateVoucher = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const voucherItem = await c.req.json();
    const voucherExists = await getVoucherByIdService(id);
    if (!voucherExists) return c.text("Sorry no such voucher exists", 404);

    const updatedVoucher = await updateVoucherService(id, voucherItem);
    return c.json({ msg: updatedVoucher });
  } catch (error: any) {
    return c.text(error.message, 400);
  }
};

export const deleteVoucher = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const voucherExists = await getVoucherByIdService(id);
    if (!voucherExists) return c.text("Voucher could not be found");

    const res = await deleteVoucherService(id);
    return c.json({ msg: res }, 200);
  } catch (error) {
    return c.json("Invalid ID", 400);
  }
};

export const getVoucherCode = async (c: Context) => {
  try {
    //1 receive code
    const code = await c.req.json();
    //2 check if code exists
    const voucher = await getVoucherByCodeService(code);
    if (!voucher) return c.text("Such a voucher does not exist");
    //3 return voucher details
    return c.json(voucher);
  } catch (error: any) {
    return c.text(error.message, 400);
  }
};
