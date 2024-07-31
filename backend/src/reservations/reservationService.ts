import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { reservations } from "../drizzle/schema";

export const getAllReservationsService = async () => {
  const reservationItems = await db.query.reservations.findMany();
  return reservationItems;
};

export const getReservationByIdService = async (id: number) => {
  const reservationItem = await db.query.reservations.findFirst({
    where: eq(reservations.id, id),
  });
  return reservationItem;
};

export const createReservationService = async (reservationItem: typeof reservations.$inferInsert) => {
  const newReservation = await db.insert(reservations).values(reservationItem);
  return newReservation;
};

export const updateReservationService = async (id: number, reservationItem: typeof reservations.$inferInsert) => {
  const updatedReservation = await db
    .update(reservations)
    .set(reservationItem)
    .where(eq(reservations.id, id));
  return updatedReservation;
};

export const deleteReservationService = async (id: number) => {
  await db.delete(reservations).where(eq(reservations.id, id));
  return "Reservation successfully deleted";
};