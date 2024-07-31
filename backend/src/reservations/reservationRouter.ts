import { Hono } from "hono";
import {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} from "./reservationController";

export const reservationsRouter = new Hono();

reservationsRouter.get("/reservations", getReservations);
reservationsRouter.get("/reservations/:id", getReservation);
reservationsRouter.post("/reservations", createReservation);
reservationsRouter.put("/reservations/:id", updateReservation);
reservationsRouter.delete("/reservations/:id", deleteReservation);