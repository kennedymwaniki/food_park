import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { vouchers, TIVouchers, TSVoucher } from "../drizzle/schema";

export const getAllVouchersService = async (): Promise<TSVoucher[] | null> => {
  const voucherItems = await db.query.vouchers.findMany();
  return voucherItems;
};

export const getVoucherByIdService = async (id: number) => {
  const voucherItem = await db.query.vouchers.findFirst({
    where: eq(vouchers.id, id),
  });
  return voucherItem;
};

export const createVoucherService = async (voucherItem: TIVouchers) => {
  const newVoucher = await db.insert(vouchers).values(voucherItem);
  return newVoucher;
};

export const updateVoucherService = async (
  id: number,
  voucherItem: TIVouchers
) => {
  const updatedVoucher = await db
    .update(vouchers)
    .set(voucherItem)
    .where(eq(vouchers.id, id));
  return updatedVoucher;
};

export const deleteVoucherService = async (id: number) => {
  await db.delete(vouchers).where(eq(vouchers.id, id));
  return "Voucher successfully deleted";
};

export const getVoucherByCodeService = async (code: string) => {
  const voucher = await db.query.vouchers.findFirst({
    where: eq(vouchers.code, code),
  });
  return voucher;
};
