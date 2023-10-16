import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import Slick from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

const SlickWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  background-size: cover;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const SlickImage = styled.img`
  display: block;
  max-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
`;

const settings = {
  dots: true,
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  speed: 500,
  arrows: false,
  autoplay: true,
};

type Props = {
  desktopurl: string,
  id: string,
  mobileurl: string,
  navurl: string,
  alt: string,
  title: string
}

const Slider = () => {
  const { general } = useGeneralStore();
  return (
    <SlickWrapper>
      <Slick {...settings}>
        {general.banner.map((item: Props) => (
          <a href={item.navurl} key={item.id} target="_blank">
            <SlickImage src={item.mobileurl} alt={item.alt}></SlickImage>
          </a>
        ))}
      </Slick>
    </SlickWrapper>
  );
};

export default Slider;