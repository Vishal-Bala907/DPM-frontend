import {
  CTAFooter,
  Features,
  HowItWorks,
  PlansAndTiers,
  PricingCTA,
  WhyChooseDPM,
} from "../components";
import { Footer, Navbar } from "../components/common";
import Crousel from "../components/common/Crousel";
import { CROUSEL } from "../data/crousel.data";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Crousel CROUSEL={CROUSEL} />
      <Features />
      <PlansAndTiers />
      <HowItWorks />
      <WhyChooseDPM />
      <PricingCTA />
      <CTAFooter />
      <Footer />
    </div>
  );
};

export default HomePage;
