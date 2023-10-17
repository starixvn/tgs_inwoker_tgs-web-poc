import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 20px;
`;

const StepContainer = styled.div`
  width: 50%;
  float: left;
`;

const StepCircle = styled.div`
  color: ${(props: { active: boolean; theme: { primary: string } }) =>
    props.active ? props.theme.primary : "#c3c3c3"};
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border-radius: 50%;
  padding-top: 3px;
`;

const StepLine = styled.div`
  height: 8px;
  background-color: ${(props: {
    active: boolean;
    theme: { primary: string };
  }) => (props.active ? props.theme.primary : "#c3c3c3")};
  ${(props: { isfirst: boolean; islast: boolean }) =>
    props.isfirst ? `border-radius: 4px 0 0 4px;` : ""};
  ${(props: { isfirst: boolean; islast: boolean }) =>
    props.islast ? `border-radius: 0 4px 4px 0;` : ""};
  margin-top: 14px;
`;

type StepLabelProps = {
  $active: boolean;
};
const StepLabel = styled.div`
  font-size: 1rem;
  color: ${({ $active, theme }: StepLabelProps) =>
    $active ? theme.primary : "#c3c3c3"};
  text-align: center;
  margin-top: 8px;
  width: 100%;
  font-weight: 600;
`;

type Props = {
  steps: { label: string }[];
  currentStep: number;
};

const Step = ({ steps, currentStep }: Props) => {
  return (
    <Container>
      {steps.map((row, index) => {
        return (
          <StepContainer key={index}>
            <StepCircle $active={index + 1 <= currentStep}>
              STEP {index + 1}
            </StepCircle>

            <StepLine
              active={index + 1 <= currentStep}
              isfirst={index === 0}
              islast={index === steps.length - 1}
            />

            <StepLabel $active={index + 1 <= currentStep}>
              {row.label}
            </StepLabel>
          </StepContainer>
        );
      })}
    </Container>
  );
};

export default Step;
