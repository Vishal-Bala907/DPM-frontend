import Crousel from "../components/common/Crousel";
import { CROUSEL } from "../data/crousel.data";
const HomePage = () => {
  return (
    <div>
      <Crousel CROUSEL={CROUSEL} />
      this is my homepage
    </div>
  );
};

export default HomePage;
