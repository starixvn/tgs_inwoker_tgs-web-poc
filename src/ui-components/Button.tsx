import config from "@/config/config";
import styled, { css } from "styled-components";
import { themeList } from "../theme";

type ButtonProps = {
    text: string;
    theme: string;
};

const ButtonStyle = styled.button`
  cursor: pointer;
  display: inline-block;
  ${({ theme }) => css`
    color: ${themeList[theme].text};
    background-color: ${themeList[theme].primary};
    border: 1px solid ${themeList[theme].secondary};
    padding: 10px 20px;
    border-radius: 3em;
  `}
`;

const StyledButton = ({ text }: ButtonProps) => {
    return <ButtonStyle theme={config.theme}>{text}</ButtonStyle>;
};

export default StyledButton;
