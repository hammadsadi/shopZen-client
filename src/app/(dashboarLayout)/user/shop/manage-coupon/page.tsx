import CouponTable from "@/components/modules/shop/manage-coupon/CouponTable";
import CreateCouponModal from "@/components/modules/shop/manage-coupon/CreateCouponModal";
import { getAllCoupon } from "@/services/Coupon";

export default async function ManageCouponPage() {
    const {data:coupons, meta} = await getAllCoupon()
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Manage Coupon</h1>
        <CreateCouponModal />
      </div>
      <div>
        <CouponTable coupons={coupons} meta={meta} />
      </div>
    </div>
  );
}
