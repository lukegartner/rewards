import { Route, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import ProfileSummary from "./ProfileSummary";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileSummary from "./UserProfileSummary";
import RewardsCarousel from "./RewardsCarousel";
import SingleReward from "./SingleReward";
import UserHistory from "./UserHistory";

const UserHome = () => {
  const dispatch = useDispatch();
  const {
    me,
    rewardsUser,
    adminRewards,
    adminCategories,
    userSchedule,
    userAwarded,
    userRedeemed,
  } = useSelector((store) => store);

  const rewardsByCategory = adminCategories
    .filter(({ category_active }) => category_active)
    .map((category) =>
      adminRewards.filter((reward) => reward.category_id === category.id)
    );

  const rewardsReady =
    adminRewards.length > 0 && adminCategories.length > 0 && rewardsByCategory;
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!me.attributes) {
      dispatch({
        type: "FETCH_ME",
        payload: { pco_id: user.sub, username: user.nickname },
      });
      dispatch({ type: "FETCH_REWARDS_ADMIN" });
      dispatch({ type: "FETCH_CATEGORIES_ADMIN" });
    }
  }, []);
  return (
    <main>
      <Route path="/" exact>
        <UserProfileSummary />

        {rewardsReady &&
          rewardsByCategory.map((rewards, index) => (
            <RewardsCarousel
              rewards={rewards.filter(({ reward_active }) => reward_active)}
              category={adminCategories[index]}
            />
          ))}
      </Route>
      <Route path="/reward/:id">
        <SingleReward />
      </Route>
      <Route path="/history">
        <UserHistory />
      </Route>
    </main>
  );
};

export default UserHome;
