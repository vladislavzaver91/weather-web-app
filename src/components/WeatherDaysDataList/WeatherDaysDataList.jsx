import React from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import { useSliderArrows } from "hooks";
import { muiIcons } from "utils/icons";
import { format, fromUnixTime } from "date-fns";

export const WeatherDaysDataList = ({ weatherData }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    ...useSliderArrows(),
  };
    
  return (
    <Section>
      <SliderWrap {...sliderSettings}>
        {weatherData.map((item, index) => {
          const formatedTime = fromUnixTime(item.dt);

          return (
            <li key={index}>
              <TempItem>{Math.round(item.main.temp)}&#176;</TempItem>
              <ImgItem
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <DataItemWrapper>
                <muiIcons.AirIcon sx={{ fontSize: 20 }} />
                <p>{item.wind.speed}m/s</p>
              </DataItemWrapper>
              <DataItemWrapper>
                <muiIcons.ThunderstormIcon sx={{ fontSize: 20 }} />
                <p>{item.pop} %</p>
              </DataItemWrapper>
              <TextItem>{format(formatedTime, 'E, HH:mm')}</TextItem>
            </li>
          );
        })}
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

const TempItem = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 1.36;
  color: #ffffff;
  text-align: center;
  @media screen and (min-width: 1200px){
    font-size: 18px;
  margin-bottom: 5px;
  }
`;

const ImgItem = styled.img`
  margin: 0 auto;
  width: 50px;
  height: 50px;
  @media screen and (min-width: 1200px) {
  margin-bottom: 5px;
  width: 65px;
  height: 65px;
  }
`;

const DataItemWrapper = styled.div`
  margin-bottom: 10px;
  color: #ffffff;
  text-align: center;
  &:last-child {
    margin-bottom: 0;
  }
  & p {
    color: #00CED1;
    font-weight: 500;
    font-size: 10px;
    @media screen and (min-width: 1200px) {
      font-weight: 600;
      font-size: 16px;
    }
  }
`;

const TextItem = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 1.17;
  color: #ffffff;
  text-align: center;
    @media screen and (max-width: 439px) {
    width: 45px;
    }
  @media screen and (min-width: 768px) {
    font-size: 10px;
    }
  @media screen and (min-width: 1200px) {
    font-size: 16px;
  }
`;