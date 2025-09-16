import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MenuCategories from "@/components/MenuCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MenuCategories />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
