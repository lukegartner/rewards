import { pcoImg } from "../utils/images/index";

const Header = () => {
  return (
    <header>
      <div className="title">
        <img src={pcoImg} alt="logo" className="title-img" />
        <h1>Rewards</h1>
      </div>
      <p>327pts</p>
    </header>
  );
};

export default Header;
