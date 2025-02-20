import CategorySection from "@/components/modules/home/CategorySection";
import FeaturesProducts from "@/components/modules/home/FeaturesProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import TopBrandsSection from "@/components/modules/home/topBrands";

const HomePage = () => {
  return (
    <div className="">
      <HeroSection />
      <CategorySection />
      <FeaturesProducts />
      <TopBrandsSection />
    </div>
  );
};

export default HomePage;
