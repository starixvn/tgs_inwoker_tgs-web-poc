import CarouselArrow from "@/assets/t18/images/dialog/carousel-arrow.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

const NextArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 99;
  background: url(${CarouselArrow}) no-repeat center center;
  width: 22px;
  height: 44px;
`;

const PrevArrowContainer = styled(NextArrowContainer)`
  left: 0;
  right: auto;
  transform: translateY(-50%) rotate(180deg);
`;

function SampleNextArrow({ onClick }: { onClick: () => void }) {
  return <NextArrowContainer onClick={onClick} />;
}

function SamplePrevArrow({ onClick }: { onClick: () => void }) {
  return <PrevArrowContainer onClick={onClick} />;
}

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  speed: 500,
  autoplay: true,
  adaptiveHeight: true,
  nextArrow: (
    <SampleNextArrow
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  ),
  prevArrow: (
    <SamplePrevArrow
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  ),
};

const Carousel = ({ children }: { children: React.ReactNode }) => {
  return <Slider {...settings}>{children}</Slider>;
};

export default Carousel;
