import { useEffect } from "react";
import ProfileSummary from "./ProfileSummary";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileSummary from "./UserProfileSummary";

const UserHome = () => {
  const dispatch = useDispatch();
  const { me, rewardsUser } = useSelector((store) => store);
  const { user, isAuthenticated } = useAuth0();
  console.log("rewardsUser", rewardsUser);
  useEffect(() => {
    if (!me.attributes) {
      dispatch({
        type: "FETCH_ME",
        payload: { pco_id: user.sub, username: user.nickname },
      });
    }
  }, []);
  return (
    <main>
      <UserProfileSummary />
      {rewardsUser.admin && <h2>Admin</h2>}
    </main>
  );
};

export default UserHome;
