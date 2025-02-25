export type TCoupon = {
    _id?:string;
  code: string;
  discountType: "Percentage" | "Flat";
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  startDate: string;
  endDate: string;
};
