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
  status: string;
}
