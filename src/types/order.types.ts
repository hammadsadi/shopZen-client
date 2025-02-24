export type TOrder = {
  products: TOrderProduct[];
  coupon?: string; 
  shippingAddress: string;
  paymentMethod: string;
};

export type TOrderProduct = {
  product: string; 
  color?: string; 
  quantity: number;
};
