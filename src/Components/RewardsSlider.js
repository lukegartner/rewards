import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import RewardsSlide from "./RewardsSlide";

const RewardsSlider = ({ data, title }) => {
  return (
    // Slider Section
    <section className="rewards-slider-section">
      {/* Slider Header */}
      <div className="rewards-slider-header">
        <h2>{title}</h2>
        <div className="view-all">
          <p>view all</p>
          <AiOutlineArrowRight />
        </div>
      </div>
      {/* End Slider Header */}

      {/* Slider Container */}
      <div className="rewards-slider">
        {data.map((data) => {
          return <RewardsSlide key={data.id} data={data} />;
        })}

        <div className="reward-slide view-all-rewards">
          <div className="view-all">
            <p>view all</p>
            <AiOutlineArrowRight className="view-all-arrow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsSlider;
