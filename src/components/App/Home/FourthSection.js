import React from "react";
import styled from "styled-components";
import Common from "../../../utils/Common";
import ScrollAnimation from "react-animate-on-scroll";
import { utility } from "../../../utils/utility";
const commonpath = "home/section";
const Background = styled.div`
  height: 580px;

  z-index: 3;
  background: url(${utility.imagePathGenerator(
      commonpath + "/section4-bg.jpg"
    )})
    center no-repeat;
  padding-top: 40px;
`;

const RightDesc = styled.img`
  position: absolute;
  right: 50%;
  top: 66px;
  margin-right: -347px;
`;
const FourthSection = (props) => {
  return (
    <Background>
      <ScrollAnimation
        animateIn="fadeInLeft"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible", position: "relative" }}
      >
        <RightDesc
          src={utility.imagePathGenerator(
            Common.getLanguagePrefixFolder() + "/section3-desc.png"
          )}
        ></RightDesc>
      </ScrollAnimation>
    </Background>
  );
};

export default FourthSection;
