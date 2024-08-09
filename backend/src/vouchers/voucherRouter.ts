import { Hono } from "hono";
import {
  getVouchers,
  getVoucher,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  getVoucherCode,
} from "./voucherController";

export const vouchersRouter = new Hono();

vouchersRouter.get("/vouchers", getVouchers);
vouchersRouter.get("/vouchers/:id", getVoucher);
vouchersRouter.post("/vouchers/voucher", getVoucherCode);
vouchersRouter.post("/vouchers", createVoucher);
vouchersRouter.put("/vouchers/:id", updateVoucher);
vouchersRouter.delete("/vouchers/:id", deleteVoucher);
