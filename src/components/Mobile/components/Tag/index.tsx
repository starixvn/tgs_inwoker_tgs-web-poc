import styled from 'styled-components';
import { gameTagList } from "../../constants/tag";

type Props = {
  text: string;
  isActive: boolean;
  isShowIcon: boolean;
  fontSize?: 'small' | 'smaller';
  onClick: () => void;
}

const Wrapper = styled.div<{ text: string, isActive: boolean, isShowIcon: boolean }>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width:  ${(props) => props.isShowIcon ? "40px" : "60px"};
    padding: 4px 8px;
    border-radius: 50px;
    background-color: ${(props) =>
    props.isActive ? props.theme.primary : props.theme.tertiaryDark};
    margin-right: 6px;
    cursor: pointer;
    user-select: none;
     & > img {
        width: 24px;
        height: 24px;
     }
`;

const Text = styled.div<{ isActive: boolean }>`
    color: ${(props) =>
    props.isActive ? props.theme.white : props.theme.tertiary};
    font-size: 0.875rem;
    font-weight: 700;   
    line-height: 0.875rem;
    padding: 5px 0;
`;

const Tag = ({ text, isActive, isShowIcon, onClick }: Props) => {

  const transferIcon = () => {
    const tag = gameTagList.find(tag => tag.text === text);
    return tag ? tag.iconUrl : '';
  };
  const imageUrl = transferIcon();

  return (
    <Wrapper isActive={isActive} text={text} onClick={onClick} isShowIcon={isShowIcon}>
      {imageUrl && <img src={imageUrl} alt={text} />}
      {imageUrl ? null : <Text isActive={isActive}>{text}</Text>}
    </Wrapper>
  );
};

export default Tag;