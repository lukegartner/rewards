import { Route, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import ProfileSummary from "./ProfileSummary";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileSummary from "./UserProfileSummary";
import RewardsCarousel from "./RewardsCarousel";
import SingleReward from "./SingleReward";

const UserHome = () => {
  const dispatch = useDispatch();
  const { me, rewardsUser, adminRewards, adminCategories } = useSelector(
    (store) => store
  );
  console.log("test", adminRewards, adminCategories);
  const rewardsByCategory = adminCategories.map((category) =>
    adminRewards.filter((reward) => reward.category_id === category.id)
  );
  console.log("rewardsbycategory", rewardsByCategory);
  const rewardsReady =
    adminRewards.length > 0 && adminCategories.length > 0 && rewardsByCategory;
  const { user, isAuthenticated } = useAuth0();
  console.log("rewardsUser", rewardsUser);
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
              rewards={rewards}
              category={adminCategories[index]}
            />
          ))}

        {rewardsUser.admin && <h2>Admin</h2>}
      </Route>
      <Route path="/reward/:id">
        <SingleReward />
      </Route>
    </main>
  );
};

export default UserHome;
