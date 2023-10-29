import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useRwd } from "@/hooks/useRwd";
import Slick from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

const SlickWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
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
  const { isMobileSize } = useRwd();

  return (
    <SlickWrapper>
      <Slick {...settings}>
        {general.banner.map((item: Props) => (
          <a href={item.navurl} key={item.id} target="_blank">
            <SlickImage src={isMobileSize ? item.mobileurl : item.desktopurl} alt={item.alt}></SlickImage>
          </a>
        ))}
      </Slick>
    </SlickWrapper>
  );
};

export default Slider;