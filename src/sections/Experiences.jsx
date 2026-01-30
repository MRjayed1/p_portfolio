import { Timeline } from "../components/Timeline";
import { usePortfolio } from "../context/PortfolioContext";

const Experiences = () => {
  const { experiences } = usePortfolio();
  return (
    <div className="w-full">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
