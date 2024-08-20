export interface TUser {
  id: number;
  fullname: string;
  email: string;
  image: string;
  role: string;
  contactphone: string;
}

export interface TVouchers {
  id: number;
  code: string;
  validity: number;
  discount: number;
  status: string;
}
export interface TReservations {
  user_id: number;
  date: string;
  guests: number;
  drinks: string;
  special: boolean;
}

export interface TOrders {
  id: number;
  total_price: number;
  user_id: number;
  order_number: string;
  quantity: number;
  order_status: number;
  size: "medium" | "large" | "small";
  priority: boolean;
}

export interface TCode {
  code: string;
}
