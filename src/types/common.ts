import { userRoles } from "@/utils/roles";
import { IconType } from "react-icons";

export type TRoles = keyof typeof userRoles;

export interface SidbarItem {
  title: string;
  path: string;
  parentPath?: string;
  child?: SidbarItem[];
  icon?: IconType;
  children?: SidbarItem[];
}

export interface TUser {
  id: string;
  userName: string;
  role: string;
  status: string;
  email: string;
}

export interface Review {
  rating: string;
  comment: string;
}

export interface TLoginValues {
  email: string;
  password: string;
  newPassword: string;
  oldPassword: string;
  userName: string;
  fullName: string;
}

export interface THotel {
  id: string;
  mediaUrl: string;
  hotelName: string;
  cityName: string;
  salePrice: number;
  discount: number;
  averageRating: number;
  contact: string;
  revenue: number;
  email: string;
  bookingCount: number;
  phone: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: string;
  rooms: number;
  childrens: number;
  adults: number;
  hotel: { hotelName: string; mediaUrls: string[] };
  user: { fullName: string };
  room: {
    id: string;
    adults: number;
    bedDetail: string;
    roomSize: string;
    roomName: string;
    length: number;
    salePrice: number;
    price: number;
    discount: number;
  }[];
   
}

export interface TRoom {
  id: string;
  adults: number;
  bedDetail: string;
  roomSize: string;
  roomName: string;
  length: number;
  salePrice: number;
  price: number;
  discount: number;
}

export interface TReview {
  userName: string;
  id: string;
  comment: string;
  rating: number;
  createdAt: string;
}
export interface IFormInput {
  hotelName: string;
  cityId: string;
  hotelDescription: string;
  contact: string;
  price: number;
  discount: number;
  latitude: number;
  longitude: number;
  oldPassword: string;
  newPassword: string;
  confirm: string;
  email: string;
  roomSize: string;
  roomName: string;
  bedDetail: string;
  adults: number;
}
