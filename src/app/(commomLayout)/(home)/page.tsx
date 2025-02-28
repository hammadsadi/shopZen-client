import CategorySection from "@/components/modules/home/CategorySection";
import FeaturesProducts from "@/components/modules/home/FeaturesProducts";
import FlashSaleProducts from "@/components/modules/home/flashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import TopBrandsSection from "@/components/modules/home/topBrands";
import { getRefreshToken } from "@/services/AuthServices";

const HomePage = async () => {
  const res = await getRefreshToken();
  console.log(res);
  return (
    <div className="">
      <HeroSection />
      <CategorySection />
      <FeaturesProducts />
      <TopBrandsSection />
      <FlashSaleProducts />
    </div>
  );
};

export default HomePage;
