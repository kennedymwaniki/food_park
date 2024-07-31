import { Context } from "hono";
import {
  getAllReservationsService,
  getReservationByIdService,
  createReservationService,
  updateReservationService,
  deleteReservationService,
} from "./reservationService";
import { eq, and } from "drizzle-orm";
import { db } from "../drizzle/db";
import { reservations } from "../drizzle/schema";

export const getReservations = async (c: Context) => {
  const reservationItems = await getAllReservationsService();
  return c.json(reservationItems);
};

export const getReservation = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const reservationItem = await getReservationByIdService(id);
  if (!reservationItem) {
    return c.json({ error: "No such reservation is available" }, 404);
  }

  return c.json(reservationItem, 200);
};

export const createReservation = async (c: Context) => {
  try {
    const reservationItem = await c.req.json();
    
    // Check if the reservation already exists (based on user_id and date)
    const existingReservation = await db.query.reservations.findFirst({
      where: and(
        eq(reservations.user_id, reservationItem.user_id),
        eq(reservations.date, reservationItem.date)
      ),
    });
    
    if (existingReservation) {
      return c.json({ error: "Reservation already exists for this user on this date" }, 400);
    }
    
    const createdReservation = await createReservationService(reservationItem);
    return c.json(createdReservation, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateReservation = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const reservationItem = await c.req.json();
    const reservationExists = await getReservationByIdService(id);
    if (!reservationExists) return c.text("Sorry no such reservation exists", 404);

    const updatedReservation = await updateReservationService(id, reservationItem);
    return c.json({ msg: updatedReservation });
  } catch (error: any) {
    return c.text(error.message, 400);
  }
};

export const deleteReservation = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const reservationExists = await getReservationByIdService(id);
    if (!reservationExists) return c.text("Reservation could not be found");

    const res = await deleteReservationService(id);
    return c.json({ msg: res }, 200);
  } catch (error) {
    return c.json("Invalid ID", 400);
  }
};