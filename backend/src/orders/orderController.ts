import { Context } from "hono";
import {
  getOrderByIdServcice,
  deleteOrderService,
  updateOrderService,
  getAllOrdersService,
  createOrderService,
} from "./orderService";

export const getOrders = async (c: Context) => {
  const orders = await getAllOrdersService();
  return c.json(orders);
};

export const getOrder = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const order = await getOrderByIdServcice(id);
  if (!order) {
    return c.json({ error: "No such Order is availabale" }, 404);
  }

  return c.json(order, 200);
};

export const createOrder = async (c: Context) => {
  try {
    const order = await c.req.json();
    const createdOrder = await createOrderService(order);
    return c.json(createdOrder, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateOrder = async (c: Context) => {
  try {
    //get id of order to be update
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    // get updated order
    const Order = await c.req.json();
    //3 check if order by the given i exists
    const orderexists = await getOrderByIdServcice(id);
    if (!orderexists) return c.text("Sorry no such order exists", 404);

    //4 update the order
    const updatedOrder = await updateOrderService(id, Order);
    return c.json({ msg: updatedOrder });
  } catch (error: any) {
    return c.text(error.updatedOrder.message, 400);
  }
};

export const deleteOrder = async (c: Context) => {
  try {
    //get id first
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    //2 check if an order of that id exists
    const orderExists = await getOrderByIdServcice(id);
    if (orderExists === undefined) return c.text("Order could nt be found");

    //delete order
    const res = await deleteOrderService(id);
    if (!res) return c.text("Booking not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error) {
    return c.json("Invalid ID", 400);
  }
};
