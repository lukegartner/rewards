import { useEffect } from "react";
import ProfileSummary from "./ProfileSummary";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

const UserHome = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((store) => store);
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (!me.attributes) {
      dispatch({ type: "FETCH_ME", payload: user.sub });
    }
  }, []);
  return (
    <main>
      <ProfileSummary />
    </main>
  );
};

export default UserHome;
