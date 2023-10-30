import { useRwd } from "@/hooks/useRwd";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";
import { gameTagList } from "../../constants/gameTag";

type Props = {
  text: string;
  isActive: boolean;
  isShowIcon: boolean;
  fontSize?: "small" | "smaller";
  onClick: () => void;
};

const Wrapper = styled.div<{
  $isActive: boolean;
  $isShowIcon: boolean;
}>`
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: auto;
  min-width: ${({ $isShowIcon }) =>
    $isShowIcon ? "40px" : "60px"};
  max-width: none;
  height: 40px;
  border-radius: 50px;
  padding: 4px 8px;
  margin-right: 6px;
  box-sizing: border-box;
  user-select: none;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.primaryLight};

  ${media.sm} {
    cursor: pointer;
    & :hover {
    color: ${({ theme }) => theme.white};
   }
  }
`;

const TagIcon = styled.img`
  width: 24px;
  height: 24px;

  ${media.sm} {
    margin-right: 5px;
  }
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
 color: ${({ $isActive, theme }) =>
    $isActive ? theme.white : theme.tertiary};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 0.875rem;
`;

const Tag = ({ text, isActive, isShowIcon, onClick }: Props) => {
  const { isMobileSize } = useRwd();

  const transferIcon = () => {
    const tag = gameTagList.find((tag) => tag.text === text);
    return tag ? tag.iconUrl : "";
  };
  const imageUrl = transferIcon();

  return (
    <Wrapper
      $isActive={isActive}
      $isShowIcon={isShowIcon}
      onClick={onClick}
    >
      {imageUrl && <TagIcon src={imageUrl} alt={text} />}
      {isMobileSize ? (imageUrl ? null : <Text $isActive={isActive}>{text}</Text>) : <Text $isActive={isActive}>{text}</Text>}
    </Wrapper>
  );
};

export default Tag;
