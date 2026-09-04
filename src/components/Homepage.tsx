import UtilityBar from "./UtilityBar";
import Navbar from "./Navbar";
import Hero from "./Hero";
import TrustBar from "./TrustBar";
import ShopByConcern from "./ShopByConcern";
import Bestsellers from "./Bestsellers";
import EditorialQuote from "./EditorialQuote";
import ShopTheRitual from "./ShopTheRitual";
import AsWornByYou from "./AsWornByYou";
import Journal from "./Journal";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

export default function Homepage() {
  return (
    <div className="bg-verae-lilac-bg flex flex-col items-start w-full">
      <UtilityBar />
      <Navbar />
      <Hero />
      <TrustBar />
      <ShopByConcern />
      <Bestsellers />
      <EditorialQuote />
      <ShopTheRitual />
      <AsWornByYou />
      <Journal />
      <Newsletter />
      <Footer />
    </div>
  );
}
