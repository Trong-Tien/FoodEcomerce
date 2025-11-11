export type Order {
  id: string;
  orderDate: string;
  shippingAddress: string;
  totalPrice: number;
  shippingFee: number;
  note?: string;
  statusId: number;
  paymentMenthodId: number;
  orderDetails?: string;
}