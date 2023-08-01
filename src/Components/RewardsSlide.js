const RewardsSlide = ({ data }) => {
  const { title, price, image } = data;
  return (
    <div className="reward-slide">
      <img src={image} className="rewards-slider-img" />
      <p className="slide-info">{title}</p>
      <small className="slide-price">{price}</small>
    </div>
  );
};

export default RewardsSlide;
