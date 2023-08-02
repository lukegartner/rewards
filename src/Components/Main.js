import RewardsSlider from "./RewardsSlider";
import ProfileSummary from "./ProfileSummary";
import { rewardsDataFood, rewardsDataActivity } from "../utils/data";

const Main = () => {
  return (
    <main>
      <ProfileSummary />
      <RewardsSlider data={rewardsDataFood} title="Food" />
      <RewardsSlider data={rewardsDataActivity} title="Activities" />
    </main>
  );
};

export default Main;
