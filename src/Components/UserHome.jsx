import { Route, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileSummary from "./UserProfileSummary";
import RewardsCarousel from "./RewardsCarousel";
import SingleReward from "./SingleReward";
import UserHistory from "./UserHistory";
import UserFriends from "./UserFriends";
import UserRewards from "./UserRewards";
import FriendsSummary from "./FriendsSummary";

const UserHome = () => {
  const { path } = useRouteMatch();
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
    .filter(
      ({ category_active, id }) =>
        category_active &&
        adminRewards.some(
          (reward) => reward.category_id === id && reward.reward_active
        )
    )
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
      dispatch({ type: "FETCH_USERS_ADMIN" });
    }
  }, []);
  return (
    <>
      <Route path={path} exact>
        <UserProfileSummary />

        {rewardsReady && (
          <RewardsCarousel
            rewards={adminRewards.filter(({ reward_active }) => reward_active)}
          />
        )}
        <FriendsSummary />
      </Route>
      <Route path={`${path}reward/:id`}>
        <SingleReward />
      </Route>
      <Route path={`${path}history`}>
        <UserHistory />
      </Route>
      <Route path={`${path}friends`}>
        <UserFriends />
      </Route>
      <Route path={`${path}rewards`}>
        <UserRewards />
      </Route>
    </>
  );
};

export default UserHome;
