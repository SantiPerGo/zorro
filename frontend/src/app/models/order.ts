import { Product } from "./product";

export interface Order {
    id: number;
    orderDate: Date;
    status: string;
    products?: Product[];
}