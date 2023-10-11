import { FC } from "react";
import styled from 'styled-components';

type Props = {
  imageUrl: string;
  text: string;
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Text = styled.div`
    color:#9DACD0;
    margin-left: 5px;
    font-size: 18px;
    font-weight: 700;
`;

const CategoryLabel: FC<Props> = ({ imageUrl, text }) => {
  return (
    <Wrapper>
      <img src={imageUrl} alt={text} />
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default CategoryLabel;
