import { pcoImg } from "../utils/images";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProfileSummary = () => {
  const { user, isAuthenticated } = useAuth0();
  const isUser = isAuthenticated && user;
  const me = useSelector((store) => store.me);

  useEffect(() => {}, []);
  return (
    <section className="profile-summary-section">
      <div className="profile-summary-info">
        <h2>{isUser ? user.nickname : "user"}</h2>
        <img
          className="avatar"
          src={me.attributes ? me.attributes.avatar : pcoImg}
          alt="avatar"
        />
        <p>327pts</p>
      </div>
      <div className="profile-summary-history-container">
        <div className="prev-history">
          <p>last earn</p>
          <h4>March 26, 2023</h4>
          <p>Shakopee Sunday</p>
          <p>100pts</p>
        </div>
        <div className="next-history">
          <p>next earn</p>
          <h4>April 26, 2023</h4>
          <p>Lakeville Sunday</p>
          <p>100pts</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileSummary;
