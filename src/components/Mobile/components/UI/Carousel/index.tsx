import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselArrow from "@/assets/images/dialog/carousel-arrow.svg";
import styled from "styled-components";

const NextArrowContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 99;
`;

const PrevArrowContainer = styled(NextArrowContainer)`
  left: 0;
  right: auto;
  transform: translateY(-50%) rotate(180deg);
`;

const ContentContainer = styled.div`
  padding: 20px;
`

function SampleNextArrow({
  onClick
}: {
  onClick: () => void
}) {
  return (
    <NextArrowContainer onClick={onClick}>
      <img src={CarouselArrow}/>
    </NextArrowContainer>   
  );
}

function SamplePrevArrow({
  onClick
}: {
  onClick: () => void
}) {
  return (
    <PrevArrowContainer onClick={onClick}>
      <img src={CarouselArrow}/>
    </PrevArrowContainer>   
  );
}

const settings = {
  dots: true,
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "0",
  slidesToShow: 1,
  speed: 500,
  autoplay: true,
  nextArrow: <SampleNextArrow onClick={function (): void {
    throw new Error("Function not implemented.");
  } } />,
  prevArrow: <SamplePrevArrow onClick={function (): void {
    throw new Error("Function not implemented.");
  } } />
};

const Carousel = ({ children }: {
  children: React.ReactNode
}) => {

  return (
    <Slider {...settings}>
      {children}
    </Slider>
  )
}

export default Carousel