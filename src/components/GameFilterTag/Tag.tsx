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

const TextTag = styled.div<{
  $isActive: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 4px;
  margin-right: 6px;
  white-space: nowrap;
  text-align: center;
  text-transform: uppercase;
  border-radius: 50px;
  box-sizing: border-box;
  border-radius: 50px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.primary : theme.tertiaryDark};
  user-select: none;
  width: auto;
  min-width: 60px;
  max-width: none;
`;

const Text = styled.div<{ $isActive: boolean }>`
 color: ${({ $isActive, theme }) =>
    $isActive ? theme.white : theme.tertiary};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 0.875rem;
`;

const IconTag = styled.div<{
  $text: string;
  $isActive: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 4px;
  margin-right: 6px;
  white-space: nowrap;
  text-align: center;
  text-transform: uppercase;
  border-radius: 50px;
  box-sizing: border-box;
  border-radius: 50px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.primary : theme.tertiaryDark};
  user-select: none;
  width: auto;
  min-width: 40px;
  max-width: none;

  & > img {
    width: 24px;
    height: 24px;
  }

  ${media.sm} {
    cursor: pointer;
    & :hover {
    color: ${({ theme }) => theme.white};
   }
    align-self: stretch;
  }
`;

const Tag = ({ text, isActive, isShowIcon, onClick }: Props) => {
  const { isDesktopSize } = useRwd();

  const transferIcon = () => {
    const tag = gameTagList.find((tag) => tag.text === text);
    return tag ? tag.iconUrl : "";
  };
  const imageUrl = transferIcon();

  return (
    <>
      {isShowIcon
        ? <IconTag
          $isActive={isActive}
          $text={text}
          onClick={onClick}
        >
          {imageUrl && <img src={imageUrl} alt={text} />}
          {isDesktopSize && <Text $isActive={isActive}>{text}</Text>}
        </IconTag>
        : <TextTag $isActive={isActive}>
          <Text $isActive={isActive}>{text}</Text>
        </TextTag>
      }
    </>
  );
};

export default Tag;
