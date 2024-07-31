import { Hono } from "hono";
import {
  getVouchers,
  getVoucher,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "./voucherController";

export const vouchersRouter = new Hono();

vouchersRouter.get("/vouchers", getVouchers);
vouchersRouter.get("/vouchers/:id", getVoucher);
vouchersRouter.post("/vouchers", createVoucher);
vouchersRouter.put("/vouchers/:id", updateVoucher);
vouchersRouter.delete("/vouchers/:id", deleteVoucher);