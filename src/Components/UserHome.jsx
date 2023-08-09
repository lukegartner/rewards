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
  const {
    me,
    rewardsUser,
    adminRewards,
    adminCategories,
    userSchedule,
    userAwarded,
    userRedeemed,
  } = useSelector((store) => store);

  const rewardsByCategory = adminCategories.map((category) =>
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

  // Give rewards for new confirmed services
  // useEffect(() => {
  //   userSchedule.forEach((service) => {
  //     if (!userAwarded.some((award) => service.id === award.service_id)) {
  //       dispatch({
  //         type: "ADD_AWARD_ADMIN",
  //         payload: {
  //           user_id: rewardsUser.id,
  //           awarded_value: 20,
  //           service_id: service.id,
  //           award_description: `${service.attributes.service_type_name}, ${service.attributes.short_dates}, ${service.attributes.team_name}, ${service.attributes.team_position_name} `,
  //         },
  //       });
  //     }
  //   });
  // }, [userSchedule]);
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
