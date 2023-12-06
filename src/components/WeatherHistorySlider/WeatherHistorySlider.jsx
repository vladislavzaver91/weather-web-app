import React from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import { useSliderArrows } from "hooks";
import { WeatherHistoryDataView } from "components/WeatherHistoryDataView";

export const WeatherHistorySlider = ({ weatherHistory, sliderRef }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...useSliderArrows(),
  };

  return (
    <Section>
      <SliderWrap ref={sliderRef} {...sliderSettings}>
        {weatherHistory.map((item, index) => (
          <div key={index}>
            <WeatherHistoryDataView weatherData={item.data} />
          </div>
        ))}
      </SliderWrap>
    </Section>
  );
};

const Section = styled.div`
margin: 0 auto;
padding: 32px;
@media screen and (min-width: 1200px) {
  padding-left: 0;
  padding-right: 0;
}
`;

const SliderWrap = styled(Slider)`
max-height: 400px;
  padding-top: 15px;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #AEB5B9;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  border-radius: 5px;
  .slick-prev,
  .slick-next {
    color: #000; /* Цвет стрелок */
    font-size: 14px; /* Размер иконок */
  }
  .slick-prev {
    left: 10px; /* Расстояние слева */
  }
  .slick-next {
    right: 10px; /* Расстояние справа */
  }
  /* Точки */
  .slick-dots {
    bottom: 5px;
  }
  .slick-dots li {
    margin: 0 4px;
  }
  .slick-dots li button:before {
    font-size: 6px;
    color: #ccc;
  }
  .slick-dots li.slick-active button:before {
    color: #00CED1;
    font-size: 8px;
  }
  @media screen and (min-width: 768px) {
    width: 300px;
    height: 300px;
  }
  @media screen and (min-width: 1200px) {
  width: 500px;
  padding-top: 20px;
  padding-bottom: 40px;
  .slick-prev,
  .slick-next {
    color: #000; /* Цвет стрелок */
    font-size: 24px; /* Размер иконок */
  }
  .slick-prev {
    left: 10px; /* Расстояние слева */
  }
  .slick-next {
    right: 10px; /* Расстояние справа */
  }
  /* Точки */
  .slick-dots {
    bottom: 8px;
  }
  .slick-dots li {
    margin: 0 4px;
  }
  .slick-dots li button:before {
    font-size: 6px;
    color: #ccc;
  }
  .slick-dots li.slick-active button:before {
    color: #00CED1;
    font-size: 10px;
  }
  }
  @media screen and (min-width: 1440px) {
  width: 700px;
  }
`;